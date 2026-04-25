import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const setting = await prisma.pricingSetting.findUnique({ where: { id: params.id } })
    if (!setting) return NextResponse.json({ error: 'Ayar bulunamadı' }, { status: 404 })
    return NextResponse.json(setting)
  } catch (error) {
    return NextResponse.json({ error: 'Ayar getirilemedi' }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const setting = await prisma.pricingSetting.update({
      where: { id: params.id },
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

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.pricingSetting.delete({ where: { id: params.id } })
    return NextResponse.json({ message: 'Ayar silindi' })
  } catch (error) {
    return NextResponse.json({ error: 'Ayar silinemedi' }, { status: 500 })
  }
}
