import { transporter } from './config'

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
    const info = await transporter.sendMail({
      from: process.env.SMTP_USER,
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
    to: process.env.SMTP_USER || '',
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
    to: process.env.SMTP_USER || '',
    subject: `Yeni Teklif Talebi - ${data.name}`,
    html,
  })
}
