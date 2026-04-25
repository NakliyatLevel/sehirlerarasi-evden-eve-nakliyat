import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const solution = await prisma.solution.findUnique({ where: { id } })
    if (!solution) return NextResponse.json({ error: 'Çözüm bulunamadı' }, { status: 404 })
    return NextResponse.json({ success: true, data: solution })
  } catch {
    return NextResponse.json({ error: 'Çözüm getirilemedi' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    const solution = await prisma.solution.update({
      where: { id },
      data: {
        slug: body.slug,
        title: body.title,
        description: body.description || null,
        content: body.content || null,
        image: body.image || null,
        icon: body.icon || null,
        metaTitle: body.metaTitle || null,
        metaDescription: body.metaDescription || null,
        order: body.order,
        active: body.active,
      },
    })

    return NextResponse.json({ success: true, data: solution })
  } catch {
    return NextResponse.json({ error: 'Çözüm güncellenemedi' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await prisma.solution.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Çözüm silinemedi' }, { status: 500 })
  }
}
