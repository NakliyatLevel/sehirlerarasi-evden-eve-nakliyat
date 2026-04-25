import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await request.json()

    const review = await prisma.review.update({
      where: { id },
      data: {
        approved: body.approved,
      },
    })

    return NextResponse.json(review)
  } catch (error) {
    return NextResponse.json({ error: 'Yorum durumu güncellenemedi' }, { status: 500 })
  }
}
