import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const country = await prisma.country.findUnique({ where: { id: params.id } })
    if (!country) return NextResponse.json({ error: 'Ülke bulunamadı' }, { status: 404 })
    return NextResponse.json(country)
  } catch (error) {
    return NextResponse.json({ error: 'Ülke getirilemedi' }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const country = await prisma.country.update({
      where: { id: params.id },
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

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.country.delete({ where: { id: params.id } })
    return NextResponse.json({ message: 'Ülke silindi' })
  } catch (error) {
    return NextResponse.json({ error: 'Ülke silinemedi' }, { status: 500 })
  }
}
