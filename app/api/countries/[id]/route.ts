import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const country = await prisma.country.findUnique({ where: { id } })
    if (!country) return NextResponse.json({ error: 'Ülke bulunamadı' }, { status: 404 })
    return NextResponse.json(country)
  } catch (error) {
    return NextResponse.json({ error: 'Ülke getirilemedi' }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await request.json()
    const country = await prisma.country.update({
      where: { id },
      data: {
        code: body.code,
        name: body.name,
        nameTr: body.nameTr,
        basePrice: body.basePrice || 0,
        pricePerKm: body.pricePerKm || 0,
        customsFee: body.customsFee || 0,
        insuranceRate: body.insuranceRate || 0,
        active: body.active ?? true,
        order: body.order || 0,
      },
    })
    return NextResponse.json(country)
  } catch (error) {
    return NextResponse.json({ error: 'Ülke güncellenemedi' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    await prisma.country.delete({ where: { id } })
    return NextResponse.json({ message: 'Ülke silindi' })
  } catch (error) {
    return NextResponse.json({ error: 'Ülke silinemedi' }, { status: 500 })
  }
}
