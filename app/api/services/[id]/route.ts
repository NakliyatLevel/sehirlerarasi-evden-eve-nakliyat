import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const service = await prisma.service.findUnique({
      where: { id },
    })

    if (!service) {
      return NextResponse.json({ error: 'Hizmet bulunamadı' }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: service })
  } catch (error) {
    return NextResponse.json({ error: 'Hizmet getirilemedi' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    const service = await prisma.service.update({
      where: { id },
      data: {
        name: body.name,
        slug: body.slug,
        description: body.description || null,
        content: body.content || null,
        image: body.image || null,
        icon: body.icon || null,
        benefits: body.benefits || null,
        metaTitle: body.metaTitle || null,
        metaDescription: body.metaDescription || null,
        order: body.order,
        active: body.active,
        showOnHomepage: body.showOnHomepage !== undefined ? body.showOnHomepage : true,
      },
    })

    return NextResponse.json({ success: true, data: service })
  } catch (error) {
    return NextResponse.json({ error: 'Hizmet güncellenemedi' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await prisma.service.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Hizmet silinemedi' }, { status: 500 })
  }
}
