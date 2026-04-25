import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Temel fiyatlandırma ayarlarını al
    const pricingSettings = await prisma.pricingSetting.findMany({
      where: { type: 'lokal' },
    })

    const settings: Record<string, any> = {}
    pricingSettings.forEach((s) => {
      settings[s.key] = s.value
    })

    // Fiyat hesaplama
    let totalPrice = 0
    
    // Temel fiyat
    const basePrice = parseFloat(settings.base_price || 500)
    totalPrice += basePrice

    // Mesafe ücreti (km başı)
    if (body.distance) {
      const pricePerKm = parseFloat(settings.price_per_km || 2)
      totalPrice += body.distance * pricePerKm
    }

    // Ev büyüklüğü
    if (body.homeSize) {
      const sizeMultipliers: Record<string, number> = {
        '1+1': 1,
        '2+1': 1.3,
        '3+1': 1.6,
        '4+1': 2,
        '5+1': 2.5,
      }
      totalPrice *= sizeMultipliers[body.homeSize] || 1
    }

    // Kat sayısı (asansör yoksa)
    if (body.floor && !body.hasElevator) {
      const floorPrice = parseFloat(settings.floor_price || 50)
      totalPrice += body.floor * floorPrice
    }

    // Eşya miktarı
    if (body.itemCount) {
      const itemPrice = parseFloat(settings.item_price || 10)
      totalPrice += body.itemCount * itemPrice
    }

    // Sigorta
    if (body.insurance) {
      const insuranceRate = parseFloat(settings.insurance_rate || 0.02)
      totalPrice += totalPrice * insuranceRate
    }

    // Paketleme
    if (body.packaging) {
      const packagingPrice = parseFloat(settings.packaging_price || 200)
      totalPrice += packagingPrice
    }

    // Hafta sonu çarpanı
    if (body.isWeekend) {
      totalPrice *= 1.2
    }

    // İletişim kaydı oluştur
    await prisma.contactSubmission.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        subject: 'Lokal Nakliyat Teklifi',
        message: `Lokal nakliyat teklifi: ${body.fromAddress} -> ${body.toAddress}\nHesaplanan Fiyat: ${Math.round(totalPrice)} TL`,
      },
    })

    // Email gönder
    try {
      const { sendQuoteEmail } = await import('@/lib/email/send')
      await sendQuoteEmail({
        name: body.name,
        email: body.email,
        phone: body.phone,
        type: 'local',
        details: body,
        price: Math.round(totalPrice),
      })
    } catch (emailError) {
      if (process.env.NODE_ENV === 'development') {
        console.log('Email send failed:', emailError)
      }
    }

    return NextResponse.json({
      success: true,
      price: Math.round(totalPrice),
      breakdown: {
        basePrice,
        distance: body.distance,
        homeSize: body.homeSize,
        floor: body.floor,
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
