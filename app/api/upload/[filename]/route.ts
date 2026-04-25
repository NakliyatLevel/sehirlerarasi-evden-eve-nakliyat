import { NextRequest, NextResponse } from 'next/server'
import { del } from '@vercel/blob'
import { prisma } from '@/lib/db'

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  try {
    const { filename } = await params

    if (!filename) {
      return NextResponse.json({ error: 'Dosya adı gerekli' }, { status: 400 })
    }

    const media = await prisma.media.findUnique({
      where: { filename },
    })

    if (!media) {
      return NextResponse.json({ error: 'Medya bulunamadı' }, { status: 404 })
    }

    // Vercel Blob'dan sil
    if (media.url && media.url.startsWith('https://')) {
      await del(media.url)
    }

    await prisma.media.delete({
      where: { filename },
    })

    return NextResponse.json({ success: true, message: 'Medya silindi' })
  } catch (error) {
    return NextResponse.json({ error: 'Medya silinemedi' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  try {
    const { filename } = await params
    const body = await request.json()

    if (!filename) {
      return NextResponse.json({ error: 'Dosya adı gerekli' }, { status: 400 })
    }

    // Alt tag'i güncelle
    const media = await prisma.media.update({
      where: { filename },
      data: {
        alt: body.alt,
      },
    })

    return NextResponse.json({ success: true, media })
  } catch (error) {
    return NextResponse.json({ error: 'Medya güncellenemedi' }, { status: 500 })
  }
}
