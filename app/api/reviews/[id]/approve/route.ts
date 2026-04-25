import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()

    const review = await prisma.review.update({
      where: { id: params.id },
      data: {
        approved: body.approved,
      },
    })

    return NextResponse.json(review)
  } catch (error) {
    return NextResponse.json({ error: 'Yorum durumu güncellenemedi' }, { status: 500 })
  }
}
