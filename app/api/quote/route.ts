import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Teklif talebini veritabanına kaydet
    const quote = await prisma.quote.create({
      data: {
        fullName: body.fullName,
        phone: body.phone,
        email: body.email,
        preferredDate: body.preferredDate ? new Date(body.preferredDate) : null,
        fromAddress: body.fromAddress,
        fromFloor: parseInt(body.fromFloor),
        fromElevator: body.fromElevator,
        toAddress: body.toAddress,
        toFloor: parseInt(body.toFloor),
        toElevator: body.toElevator,
        distance: body.distance ? parseFloat(body.distance) : null,
        propertyType: body.propertyType,
        rooms: parseInt(body.rooms),
        furnitureCount: parseInt(body.furnitureCount),
        hasFragileItems: body.hasFragileItems,
        hasPiano: body.hasPiano,
        hasAntiques: body.hasAntiques,
        specialItems: body.specialItems || null,
        needsPacking: body.needsPacking,
        needsDisassembly: body.needsDisassembly,
        needsStorage: body.needsStorage,
        needsInsurance: body.needsInsurance,
        additionalNotes: body.additionalNotes || null,
        status: 'pending',
      },
    })

    return NextResponse.json({ success: true, quote })
  } catch (error) {
    return NextResponse.json(
      { error: 'Teklif talebi oluşturulamadı' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const quotes = await prisma.quote.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(quotes)
  } catch (error) {
    return NextResponse.json(
      { error: 'Teklif talepleri getirilemedi' },
      { status: 500 }
    )
  }
}
