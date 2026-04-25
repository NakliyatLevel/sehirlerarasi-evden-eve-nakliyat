import { NextRequest, NextResponse } from 'next/server'
import { put } from '@vercel/blob'
import { prisma } from '@/lib/db'

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

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'Dosya boyutu 5MB\'dan küçük olmalı' }, { status: 400 })
    }

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Sadece resim dosyaları yüklenebilir' }, { status: 400 })
    }

    const originalName = file.name
    const ext = originalName.split('.').pop() || 'jpg'
    const nameWithoutExt = originalName.substring(0, originalName.lastIndexOf('.')) || originalName
    const baseSlug = slugify(nameWithoutExt)
    const filename = `${baseSlug}-${Date.now()}.${ext}`

    // Vercel Blob'a yükle
    const blob = await put(`uploads/${filename}`, file, {
      access: 'public',
    })

    const url = blob.url

    const media = await prisma.media.create({
      data: {
        filename,
        originalName,
        url,
        alt: alt || nameWithoutExt,
        size: file.size,
        mimeType: file.type,
      },
    })

    return NextResponse.json({ success: true, media })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Dosya yüklenemedi'
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
