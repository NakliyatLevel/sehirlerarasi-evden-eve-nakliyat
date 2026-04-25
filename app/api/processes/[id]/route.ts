import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const process = await prisma.process.findUnique({
      where: { id },
    })

    if (!process) {
      return NextResponse.json({ error: 'Süreç bulunamadı' }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: process })
  } catch (error) {
    return NextResponse.json({ error: 'Süreç getirilemedi' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    const process = await prisma.process.update({
      where: { id },
      data: {
        title: body.title,
        description: body.description,
        icon: body.icon,
        step: body.step,
        active: body.active,
      },
    })

    return NextResponse.json({ success: true, data: process })
  } catch (error) {
    return NextResponse.json({ error: 'Süreç güncellenemedi' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await prisma.process.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Süreç silinemedi' }, { status: 500 })
  }
}
