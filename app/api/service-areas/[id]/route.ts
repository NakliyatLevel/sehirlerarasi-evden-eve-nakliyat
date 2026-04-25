import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const area = await prisma.serviceArea.findUnique({
      where: { id: params.id },
    })

    if (!area) {
      return NextResponse.json({ error: 'Hizmet bölgesi bulunamadı' }, { status: 404 })
    }

    return NextResponse.json(area)
  } catch (error) {
    return NextResponse.json({ error: 'Hizmet bölgesi getirilemedi' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { city, slug, description, content, image, metaTitle, metaDescription, order, active } = body

    const area = await prisma.serviceArea.update({
      where: { id: params.id },
      data: {
        city,
        slug,
        description: description || null,
        content: content || null,
        image: image || null,
        metaTitle: metaTitle || null,
        metaDescription: metaDescription || null,
        order,
        active,
      },
    })

    return NextResponse.json(area)
  } catch (error) {
    return NextResponse.json({ error: 'Hizmet bölgesi güncellenemedi' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.serviceArea.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Hizmet bölgesi silinemedi' }, { status: 500 })
  }
}
