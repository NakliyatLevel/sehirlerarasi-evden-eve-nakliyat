import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const settings = await prisma.siteSetting.findMany({
      orderBy: { key: 'asc' },
    })

    const settingsObject: Record<string, string> = {}
    settings.forEach((setting) => {
      settingsObject[setting.key] = setting.value
    })

    return NextResponse.json(settingsObject)
  } catch (error) {
    return NextResponse.json({ error: 'Ayarlar getirilemedi' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const updates = Object.entries(body).map(([key, value]) =>
      prisma.siteSetting.upsert({
        where: { key },
        update: { value: value as string, updatedAt: new Date() },
        create: { key, value: value as string },
      })
    )

    await prisma.$transaction(updates)

    return NextResponse.json({ message: 'Ayarlar kaydedildi' })
  } catch (error) {
    return NextResponse.json({ error: 'Ayarlar kaydedilemedi' }, { status: 500 })
  }
}
