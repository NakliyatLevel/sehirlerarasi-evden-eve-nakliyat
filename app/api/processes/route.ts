import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const processes = await prisma.process.findMany({
      orderBy: { step: 'asc' },
    })

    return NextResponse.json({ success: true, data: processes })
  } catch (error) {
    return NextResponse.json({ error: 'Süreçler getirilemedi' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const process = await prisma.process.create({
      data: {
        title: body.title,
        description: body.description,
        icon: body.icon,
        step: body.step,
        active: body.active !== undefined ? body.active : true,
      },
    })

    return NextResponse.json({ success: true, data: process })
  } catch (error) {
    return NextResponse.json({ error: 'Süreç oluşturulamadı' }, { status: 500 })
  }
}
