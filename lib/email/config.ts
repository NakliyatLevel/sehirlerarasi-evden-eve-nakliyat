import nodemailer from 'nodemailer'
import { prisma } from '@/lib/db'

async function getSmtpOptions() {
  try {
    const settings = await prisma.siteSetting.findMany({
      where: {
        key: {
          in: ['smtp_host', 'smtp_port', 'smtp_user', 'smtp_pass', 'smtp_secure'],
        },
      },
      select: { key: true, value: true },
    })

    const map = settings.reduce<Record<string, string>>((acc, s) => {
      acc[s.key] = s.value
      return acc
    }, {})

    const host = map.smtp_host || process.env.SMTP_HOST
    const portRaw = map.smtp_port || process.env.SMTP_PORT || '587'
    const user = map.smtp_user || process.env.SMTP_USER
    const pass = map.smtp_pass || process.env.SMTP_PASS
    const secure = (map.smtp_secure || '').toString().toLowerCase() === 'true' || portRaw === '465'

    if (!host || !user || !pass) return null

    return {
      host,
      port: parseInt(portRaw, 10),
      secure,
      auth: {
        user,
        pass,
      },
      settingsUser: user,
    }
  } catch {
    const host = process.env.SMTP_HOST
    const portRaw = process.env.SMTP_PORT || '587'
    const user = process.env.SMTP_USER
    const pass = process.env.SMTP_PASS
    if (!host || !user || !pass) return null
    return {
      host,
      port: parseInt(portRaw, 10),
      secure: portRaw === '465',
      auth: {
        user,
        pass,
      },
      settingsUser: user,
    }
  }
}

export async function getTransporter() {
  const options = await getSmtpOptions()
  if (!options) return null
  const { settingsUser, ...nodemailerOptions } = options
  return {
    transporter: nodemailer.createTransport(nodemailerOptions),
    smtpUser: settingsUser,
  }
}

export async function verifyEmailConnection() {
  try {
    const result = await getTransporter()
    if (!result) return false
    await result.transporter.verify()
    return true
  } catch (error) {
    return false
  }
}
