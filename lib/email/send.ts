import { prisma } from '@/lib/db'
import { getTransporter } from './config'

export async function sendEmail({
  to,
  subject,
  html,
  text,
}: {
  to: string
  subject: string
  html: string
  text?: string
}) {
  try {
    const result = await getTransporter()
    if (!result) return { success: false, error: new Error('SMTP ayarları bulunamadı') }

    const smtpFromSetting = await prisma.siteSetting.findUnique({
      where: { key: 'smtp_from' },
      select: { value: true },
    })

    const fromAddress = smtpFromSetting?.value || result.smtpUser

    const info = await result.transporter.sendMail({
      from: fromAddress,
      to,
      subject,
      html,
      text: text || html.replace(/<[^>]*>/g, ''),
    })

    return { success: true, messageId: info.messageId }
  } catch (error) {
    return { success: false, error }
  }
}

export async function sendContactEmail(data: {
  name: string
  email: string
  phone?: string
  message: string
}) {
  const { render } = await import('@react-email/components')
  const ContactEmail = (await import('@/emails/ContactEmail')).default

  const html = await render(
    ContactEmail({
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message,
    })
  )

  return await sendEmail({
    to: (await prisma.siteSetting.findUnique({ where: { key: 'smtp_to' }, select: { value: true } }))?.value || process.env.SMTP_USER || '',
    subject: `Yeni İletişim Formu - ${data.name}`,
    html,
  })
}

export async function sendQuoteEmail(data: {
  name: string
  email: string
  phone?: string
  type: 'local' | 'international'
  details: any
  price?: number
}) {
  const { render } = await import('@react-email/components')
  const QuoteEmail = (await import('@/emails/QuoteEmail')).default

  const html = await render(
    QuoteEmail({
      name: data.name,
      email: data.email,
      phone: data.phone,
      type: data.type,
      details: data.details,
      price: data.price,
    })
  )

  return await sendEmail({
    to: (await prisma.siteSetting.findUnique({ where: { key: 'smtp_to' }, select: { value: true } }))?.value || process.env.SMTP_USER || '',
    subject: `Yeni Teklif Talebi - ${data.name}`,
    html,
  })
}

export async function sendHeroQuickQuoteEmail(data: {
  fullName: string
  phone: string
  fromCity: string
  toCity: string
  roomType: string
  priceMin?: number
  priceMax?: number
}) {
  const { render } = await import('@react-email/components')
  const HeroQuickQuoteEmail = (await import('@/emails/HeroQuickQuoteEmail')).default

  const html = await render(
    HeroQuickQuoteEmail({
      fullName: data.fullName,
      phone: data.phone,
      fromCity: data.fromCity,
      toCity: data.toCity,
      roomType: data.roomType,
      priceMin: data.priceMin,
      priceMax: data.priceMax,
    })
  )

  return await sendEmail({
    to: (await prisma.siteSetting.findUnique({ where: { key: 'smtp_to' }, select: { value: true } }))?.value || process.env.SMTP_USER || '',
    subject: `Hero Teklif Talebi - ${data.fullName}`,
    html,
  })
}
