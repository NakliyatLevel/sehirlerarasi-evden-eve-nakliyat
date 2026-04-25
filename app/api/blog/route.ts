import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get('limit')
    
    const posts = await prisma.post.findMany({
      where: { published: true },
      orderBy: { publishedAt: 'desc' },
      take: limit ? parseInt(limit) : undefined,
    })
    return NextResponse.json({ posts })
  } catch (error) {
    return NextResponse.json({ error: 'Blog yazıları getirilemedi' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Slug zaten kullanılıyorsa hata ver
    const existingPost = await prisma.post.findUnique({
      where: { slug: body.slug },
    })

    if (existingPost) {
      return NextResponse.json({ error: 'Bu slug zaten kullanılıyor' }, { status: 400 })
    }

    const post = await prisma.post.create({
      data: {
        title: body.title,
        slug: body.slug,
        excerpt: body.excerpt || null,
        content: body.content,
        image: body.image || null,
        published: body.published || false,
        publishedAt: body.published ? new Date() : null,
        seoTitle: body.seoTitle || null,
        seoDesc: body.seoDesc || null,
        seoKeywords: body.seoKeywords || null,
      },
    })

    return NextResponse.json(post)
  } catch (error) {
    return NextResponse.json({ error: 'Blog yazısı oluşturulamadı' }, { status: 500 })
  }
}
