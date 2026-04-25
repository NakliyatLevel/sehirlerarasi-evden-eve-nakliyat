import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const review = await prisma.review.findUnique({
      where: { id },
    })

    if (!review) {
      return NextResponse.json({ error: 'Yorum bulunamadı' }, { status: 404 })
    }

    return NextResponse.json(review)
  } catch (error) {
    return NextResponse.json({ error: 'Yorum getirilemedi' }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await request.json()

    const review = await prisma.review.update({
      where: { id },
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

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    await prisma.review.delete({
      where: { id },
    })

    return NextResponse.json({ message: 'Yorum silindi' })
  } catch (error) {
    return NextResponse.json({ error: 'Yorum silinemedi' }, { status: 500 })
  }
}
