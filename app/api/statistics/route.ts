import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const statistics = await prisma.statistic.findMany({
      orderBy: { order: 'asc' },
    })

    return NextResponse.json({ success: true, data: statistics })
  } catch (error) {
    return NextResponse.json({ error: 'İstatistikler getirilemedi' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const statistic = await prisma.statistic.create({
      data: {
        title: body.title,
        value: body.value,
        order: body.order || 0,
        active: body.active !== undefined ? body.active : true,
      },
    })

    return NextResponse.json({ success: true, data: statistic })
  } catch (error) {
    return NextResponse.json({ error: 'İstatistik oluşturulamadı' }, { status: 500 })
  }
}
