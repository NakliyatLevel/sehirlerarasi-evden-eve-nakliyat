import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Ülke bilgilerini al
    const country = await prisma.country.findFirst({
      where: { code: body.countryCode, active: true },
    })

    if (!country) {
      return NextResponse.json(
        { error: 'Ülke bulunamadı' },
        { status: 404 }
      )
    }

    // Fiyat hesaplama
    let totalPrice = 0
    
    // Ülke temel fiyatı
    totalPrice += country.basePrice

    // Mesafe ücreti
    if (body.distance) {
      totalPrice += body.distance * country.pricePerKm
    }

    // Hacim ücreti (m³)
    if (body.volume) {
      const volumePrice = 50 // €50 per m³
      totalPrice += body.volume * volumePrice
    }

    // Gümrük ücreti
    totalPrice += country.customsFee

    // Sigorta
    if (body.insurance) {
      totalPrice += totalPrice * (country.insuranceRate / 100)
    }

    // Paketleme
    if (body.packaging) {
      totalPrice += 300 // €300 for international packaging
    }

    // Evrak işlemleri
    if (body.documentation) {
      totalPrice += 150 // €150 for documentation
    }

    // Ek hizmetler
    if (body.storage) {
      totalPrice += 200 // €200 for storage
    }

    if (body.assembly) {
      totalPrice += 250 // €250 for furniture assembly
    }

    // İletişim kaydı oluştur
    await prisma.contactSubmission.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        subject: 'Uluslararası Nakliyat Teklifi',
        message: `Uluslararası nakliyat teklifi: ${body.fromAddress} -> ${country.nameTr}\nHesaplanan Fiyat: ${Math.round(totalPrice)} EUR`,
      },
    })

    return NextResponse.json({
      success: true,
      price: Math.round(totalPrice),
      currency: 'EUR',
      country: {
        code: country.code,
        name: country.nameTr,
      },
      breakdown: {
        basePrice: country.basePrice,
        distance: body.distance,
        volume: body.volume,
        customsFee: country.customsFee,
        insurance: body.insurance,
        packaging: body.packaging,
      },
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Fiyat hesaplanamadı' },
      { status: 500 }
    )
  }
}
