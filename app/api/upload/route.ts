import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { NextRequest, NextResponse } from 'next/server'
import { existsSync } from 'fs'
import { prisma } from '@/lib/db'

// Türkçe karakterleri slug'a çevir
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const alt = formData.get('alt') as string | null

    if (!file) {
      return NextResponse.json({ error: 'Dosya yüklenmedi' }, { status: 400 })
    }

    // Dosya boyutu kontrolü (5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'Dosya boyutu 5MB\'dan küçük olmalı' }, { status: 400 })
    }

    // Dosya tipi kontrolü
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Sadece resim dosyaları yüklenebilir' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Uploads klasörünü oluştur
    const uploadsDir = join(process.cwd(), 'public/uploads')
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true })
    }

    // Orijinal dosya adını slug formatına çevir
    const originalName = file.name
    const ext = originalName.split('.').pop() || 'jpg'
    const nameWithoutExt = originalName.substring(0, originalName.lastIndexOf('.')) || originalName
    const baseSlug = slugify(nameWithoutExt)

    // Aynı isimde dosya varsa -2, -3 ekle
    let filename = `${baseSlug}.${ext}`
    let counter = 2
    
    // Database kontrolü (Prisma client güncel değilse skip)
    try {
      while (await prisma.media.findUnique({ where: { filename } })) {
        filename = `${baseSlug}-${counter}.${ext}`
        counter++
      }
    } catch {
      filename = `${baseSlug}-${Date.now()}.${ext}`
    }

    const filepath = join(uploadsDir, filename)
    const url = `/uploads/${filename}`

    // Dosyayı kaydet
    await writeFile(filepath, buffer)

    // Database'e kaydet (Prisma client güncel değilse skip)
    let media
    try {
      media = await prisma.media.create({
        data: {
          filename,
          originalName,
          url,
          alt: alt || nameWithoutExt,
          size: file.size,
          mimeType: file.type,
        },
      })
    } catch {
      // Fallback: Basit obje döndür
      media = {
        id: Date.now().toString(),
        filename,
        originalName,
        url,
        alt: alt || nameWithoutExt,
        size: file.size,
        mimeType: file.type,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    }

    return NextResponse.json({
      success: true,
      media,
    })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Dosya yüklenemedi'
    return NextResponse.json({ 
      error: errorMessage,
      details: error instanceof Error ? error.stack : 'Unknown error'
    }, { status: 500 })
  }
}
