import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const solutions = await prisma.solution.findMany({
      where: { active: true },
      orderBy: { order: 'asc' },
    })
    return NextResponse.json(solutions)
  } catch {
    return NextResponse.json({ error: 'Çözümler getirilemedi' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { slug, title, description, content, image, icon, metaTitle, metaDescription, order, active } = body

    if (!slug || !title) {
      return NextResponse.json({ error: 'Slug ve başlık gerekli' }, { status: 400 })
    }

    const solution = await prisma.solution.create({
      data: {
        slug,
        title,
        description: description || null,
        content: content || null,
        image: image || null,
        icon: icon || null,
        metaTitle: metaTitle || null,
        metaDescription: metaDescription || null,
        order: order || 0,
        active: active !== undefined ? active : true,
      },
    })

    return NextResponse.json({ success: true, data: solution })
  } catch {
    return NextResponse.json({ error: 'Çözüm oluşturulamadı' }, { status: 500 })
  }
}
