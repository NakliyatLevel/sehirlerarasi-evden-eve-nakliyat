import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const setting = await prisma.pricingSetting.findUnique({ where: { id } })
    if (!setting) return NextResponse.json({ error: 'Ayar bulunamadı' }, { status: 404 })
    return NextResponse.json(setting)
  } catch (error) {
    return NextResponse.json({ error: 'Ayar getirilemedi' }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await request.json()
    const setting = await prisma.pricingSetting.update({
      where: { id },
      data: {
        type: body.type,
        key: body.key,
        value: body.value,
      },
    })
    return NextResponse.json(setting)
  } catch (error) {
    return NextResponse.json({ error: 'Ayar güncellenemedi' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    await prisma.pricingSetting.delete({ where: { id } })
    return NextResponse.json({ message: 'Ayar silindi' })
  } catch (error) {
    return NextResponse.json({ error: 'Ayar silinemedi' }, { status: 500 })
  }
}
