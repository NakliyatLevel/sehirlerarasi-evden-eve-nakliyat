import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const post = await prisma.post.findUnique({
      where: { id: params.id },
    })

    if (!post) {
      return NextResponse.json({ error: 'Blog yazısı bulunamadı' }, { status: 404 })
    }

    return NextResponse.json(post)
  } catch (error) {
    return NextResponse.json({ error: 'Blog yazısı getirilemedi' }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()

    // Slug değişmişse ve başka bir post'ta kullanılıyorsa hata ver
    const existingPost = await prisma.post.findUnique({
      where: { slug: body.slug },
    })

    if (existingPost && existingPost.id !== params.id) {
      return NextResponse.json({ error: 'Bu slug zaten kullanılıyor' }, { status: 400 })
    }

    const post = await prisma.post.update({
      where: { id: params.id },
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
    return NextResponse.json({ error: 'Blog yazısı güncellenemedi' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.post.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: 'Blog yazısı silindi' })
  } catch (error) {
    return NextResponse.json({ error: 'Blog yazısı silinemedi' }, { status: 500 })
  }
}
