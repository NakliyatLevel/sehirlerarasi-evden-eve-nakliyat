import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const faq = await prisma.fAQ.findUnique({ where: { id: params.id } })
    if (!faq) return NextResponse.json({ error: 'SSS bulunamadı' }, { status: 404 })
    return NextResponse.json(faq)
  } catch (error) {
    return NextResponse.json({ error: 'SSS getirilemedi' }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const faq = await prisma.fAQ.update({
      where: { id: params.id },
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
    return NextResponse.json({ error: 'SSS güncellenemedi' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.fAQ.delete({ where: { id: params.id } })
    return NextResponse.json({ message: 'SSS silindi' })
  } catch (error) {
    return NextResponse.json({ error: 'SSS silinemedi' }, { status: 500 })
  }
}
