import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const partners = await prisma.partner.findMany({
      where: { active: true },
      orderBy: { order: 'asc' },
    })
    return NextResponse.json(partners)
  } catch (error) {
    return NextResponse.json({ error: 'Referanslar getirilemedi' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, logo, website, order, active } = body

    if (!name) {
      return NextResponse.json({ error: 'Firma adı gerekli' }, { status: 400 })
    }

    const partner = await prisma.partner.create({
      data: {
        name,
        logo,
        website,
        order: order || 0,
        active: active !== undefined ? active : true,
      },
    })

    return NextResponse.json(partner)
  } catch (error) {
    return NextResponse.json({ error: 'Referans oluşturulamadı' }, { status: 500 })
  }
}
