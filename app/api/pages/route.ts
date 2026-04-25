import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const pages = await prisma.page.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json({ success: true, data: pages })
  } catch (error) {
    return NextResponse.json({ error: 'Sayfalar getirilemedi' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const page = await prisma.page.create({
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
    return NextResponse.json({ error: 'Sayfa oluşturulamadı' }, { status: 500 })
  }
}
