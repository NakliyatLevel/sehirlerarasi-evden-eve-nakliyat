import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const review = await prisma.review.findUnique({
      where: { id: params.id },
    })

    if (!review) {
      return NextResponse.json({ error: 'Yorum bulunamadı' }, { status: 404 })
    }

    return NextResponse.json(review)
  } catch (error) {
    return NextResponse.json({ error: 'Yorum getirilemedi' }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()

    const review = await prisma.review.update({
      where: { id: params.id },
      data: {
        name: body.name,
        comment: body.comment,
        rating: body.rating || 5,
        location: body.location || null,
        approved: body.approved || false,
      },
    })

    return NextResponse.json(review)
  } catch (error) {
    return NextResponse.json({ error: 'Yorum güncellenemedi' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.review.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: 'Yorum silindi' })
  } catch (error) {
    return NextResponse.json({ error: 'Yorum silinemedi' }, { status: 500 })
  }
}
