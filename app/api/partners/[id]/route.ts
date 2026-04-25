import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const partner = await prisma.partner.findUnique({
      where: { id },
    })

    if (!partner) {
      return NextResponse.json({ error: 'Referans bulunamadı' }, { status: 404 })
    }

    return NextResponse.json(partner)
  } catch (error) {
    return NextResponse.json({ error: 'Referans getirilemedi' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { name, logo, website, order, active } = body

    const partner = await prisma.partner.update({
      where: { id },
      data: {
        name,
        logo,
        website,
        order,
        active,
      },
    })

    return NextResponse.json(partner)
  } catch (error) {
    return NextResponse.json({ error: 'Referans güncellenemedi' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await prisma.partner.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Referans silinemedi' }, { status: 500 })
  }
}
