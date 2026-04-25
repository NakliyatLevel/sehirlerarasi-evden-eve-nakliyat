import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const faqs = await prisma.fAQ.findMany({
      orderBy: { order: 'asc' },
    })
    return NextResponse.json({ success: true, data: faqs })
  } catch (error) {
    return NextResponse.json({ error: 'SSS getirilemedi' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const faq = await prisma.fAQ.create({
      data: {
        question: body.question,
        answer: body.answer,
        category: body.category || null,
        order: body.order || 0,
        active: body.active ?? true,
      },
    })
    return NextResponse.json(faq)
  } catch (error) {
    return NextResponse.json({ error: 'SSS oluşturulamadı' }, { status: 500 })
  }
}
