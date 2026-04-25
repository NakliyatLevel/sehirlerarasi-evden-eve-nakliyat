import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validation
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: 'Ad, email ve mesaj gerekli' },
        { status: 400 }
      )
    }

    // İletişim kaydı oluştur
    const submission = await prisma.contactSubmission.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone || null,
        subject: body.subject || null,
        message: body.message,
      },
    })

    // Email gönder
    try {
      const { sendContactEmail } = await import('@/lib/email/send')
      await sendContactEmail({
        name: body.name,
        email: body.email,
        phone: body.phone,
        message: body.message,
      })
    } catch (emailError) {
      // Email hatası logla
      if (process.env.NODE_ENV === 'development') {
        console.log('Email send failed:', emailError)
      }
      // Email hatası olsa bile form kaydedildi
    }

    return NextResponse.json({
      success: true,
      message: 'Mesajınız başarıyla gönderildi',
      id: submission.id,
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Mesaj gönderilemedi' },
      { status: 500 }
    )
  }
}
