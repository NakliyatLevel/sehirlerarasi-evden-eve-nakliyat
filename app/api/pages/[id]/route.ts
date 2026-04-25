import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const page = await prisma.page.findUnique({ where: { id: params.id } })
    if (!page) return NextResponse.json({ error: 'Sayfa bulunamadı' }, { status: 404 })
    return NextResponse.json(page)
  } catch (error) {
    return NextResponse.json({ error: 'Sayfa getirilemedi' }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const page = await prisma.page.update({
      where: { id: params.id },
      data: {
        slug: body.slug,
        title: body.title,
        content: body.content,
        seoTitle: body.seoTitle || null,
        seoDesc: body.seoDesc || null,
        seoKeywords: body.seoKeywords || null,
        published: body.published || false,
      },
    })
    return NextResponse.json(page)
  } catch (error) {
    return NextResponse.json({ error: 'Sayfa güncellenemedi' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.page.delete({ where: { id: params.id } })
    return NextResponse.json({ message: 'Sayfa silindi' })
  } catch (error) {
    return NextResponse.json({ error: 'Sayfa silinemedi' }, { status: 500 })
  }
}
