import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const feature = await prisma.feature.findUnique({
      where: { id: params.id },
    })

    if (!feature) {
      return NextResponse.json({ error: 'Özellik bulunamadı' }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: feature })
  } catch (error) {
    return NextResponse.json({ error: 'Özellik getirilemedi' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()

    const feature = await prisma.feature.update({
      where: { id: params.id },
      data: {
        title: body.title,
        description: body.description,
        icon: body.icon,
        order: body.order,
        active: body.active,
      },
    })

    return NextResponse.json({ success: true, data: feature })
  } catch (error) {
    return NextResponse.json({ error: 'Özellik güncellenemedi' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.feature.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Özellik silinemedi' }, { status: 500 })
  }
}
