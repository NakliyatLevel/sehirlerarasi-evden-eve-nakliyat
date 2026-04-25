import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const item = await prisma.gallery.findUnique({
      where: { id: params.id },
    })

    if (!item) {
      return NextResponse.json({ error: 'Galeri öğesi bulunamadı' }, { status: 404 })
    }

    return NextResponse.json(item)
  } catch (error) {
    return NextResponse.json({ error: 'Galeri öğesi getirilemedi' }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()

    const item = await prisma.gallery.update({
      where: { id: params.id },
      data: {
        title: body.title,
        description: body.description || null,
        image: body.image,
        category: body.category || null,
        order: body.order || 0,
        active: body.active ?? true,
      },
    })

    return NextResponse.json(item)
  } catch (error) {
    return NextResponse.json({ error: 'Galeri öğesi güncellenemedi' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.gallery.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: 'Galeri öğesi silindi' })
  } catch (error) {
    return NextResponse.json({ error: 'Galeri öğesi silinemedi' }, { status: 500 })
  }
}
