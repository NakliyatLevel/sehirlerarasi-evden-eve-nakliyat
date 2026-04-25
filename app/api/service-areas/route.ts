import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const areas = await prisma.serviceArea.findMany({
      where: { active: true },
      orderBy: { order: 'asc' },
    })
    return NextResponse.json(areas)
  } catch (error) {
    return NextResponse.json({ error: 'Hizmet bölgeleri getirilemedi' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { city, slug, description, content, image, metaTitle, metaDescription, order, active } = body

    if (!city || !slug) {
      return NextResponse.json({ error: 'Şehir adı ve slug gerekli' }, { status: 400 })
    }

    const area = await prisma.serviceArea.create({
      data: {
        city,
        slug,
        description: description || null,
        content: content || null,
        image: image || null,
        metaTitle: metaTitle || null,
        metaDescription: metaDescription || null,
        order: order || 0,
        active: active !== undefined ? active : true,
      },
    })

    return NextResponse.json(area)
  } catch (error) {
    return NextResponse.json({ error: 'Hizmet bölgesi oluşturulamadı' }, { status: 500 })
  }
}
