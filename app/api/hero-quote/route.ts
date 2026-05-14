import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { sendHeroQuickQuoteEmail } from '@/lib/email/send'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    if (!body.fullName || !body.phone || !body.fromCity || !body.toCity || !body.roomType) {
      return NextResponse.json({ error: 'Eksik alanlar' }, { status: 400 })
    }

    const submission = await prisma.contactSubmission.create({
      data: {
        name: body.fullName,
        email: body.email || 'hero@local',
        phone: body.phone,
        subject: 'Hero Hızlı Teklif',
        message: `Hero hızlı teklif talebi: ${body.fromCity} -> ${body.toCity} | Ev: ${body.roomType} | Tahmini: ${body.priceMin || ''}-${body.priceMax || ''}`,
      },
    })

    const emailResult = await sendHeroQuickQuoteEmail({
      fullName: body.fullName,
      phone: body.phone,
      fromCity: body.fromCity,
      toCity: body.toCity,
      roomType: body.roomType,
      priceMin: body.priceMin,
      priceMax: body.priceMax,
    })

    if (!emailResult.success) {
      return NextResponse.json({ success: false, error: 'Email gönderilemedi', id: submission.id }, { status: 500 })
    }

    return NextResponse.json({ success: true, id: submission.id })
  } catch {
    return NextResponse.json({ error: 'Teklif talebi gönderilemedi' }, { status: 500 })
  }
}
