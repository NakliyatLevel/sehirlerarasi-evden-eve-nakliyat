import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const statistic = await prisma.statistic.findUnique({
      where: { id },
    })

    if (!statistic) {
      return NextResponse.json({ error: 'İstatistik bulunamadı' }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: statistic })
  } catch (error) {
    return NextResponse.json({ error: 'İstatistik getirilemedi' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    const statistic = await prisma.statistic.update({
      where: { id },
      data: {
        title: body.title,
        value: body.value,
        order: body.order,
        active: body.active,
      },
    })

    return NextResponse.json({ success: true, data: statistic })
  } catch (error) {
    return NextResponse.json({ error: 'İstatistik güncellenemedi' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await prisma.statistic.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'İstatistik silinemedi' }, { status: 500 })
  }
}
