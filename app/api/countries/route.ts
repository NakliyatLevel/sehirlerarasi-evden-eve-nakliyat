import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const countries = await prisma.country.findMany({
      orderBy: { order: 'asc' },
    })
    return NextResponse.json(countries)
  } catch (error) {
    return NextResponse.json({ error: 'Ülkeler getirilemedi' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const country = await prisma.country.create({
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
    return NextResponse.json({ error: 'Ülke oluşturulamadı' }, { status: 500 })
  }
}
