import { prisma } from '@/lib/db'
import { cache } from 'react'

/**
 * Site ayarlarını veritabanından getirir
 * Tüm ayarlar key-value formatında döner
 */
export async function getSiteSettings() {
  const settings = await prisma.siteSetting.findMany({
    select: {
      key: true,
      value: true,
    },
  })

  return settings.reduce<Record<string, string>>(
    (acc, setting) => {
      acc[setting.key] = setting.value
      return acc
    },
    {}
  )
}

/**
 * Tek bir site ayarını getirir
 */
export async function getSiteSetting(key: string) {
  const setting = await prisma.siteSetting.findUnique({
    where: { key },
  })

  return setting?.value || null
}

/**
 * Site ayarını günceller veya oluşturur
 */
export async function updateSiteSetting(key: string, value: string) {
  return await prisma.siteSetting.upsert({
    where: { key },
    update: { value, updatedAt: new Date() },
    create: { key, value },
  })
}

/**
 * Çoklu site ayarlarını günceller
 */
export async function updateSiteSettings(settings: Record<string, string>) {
  const updates = Object.entries(settings).map(([key, value]) =>
    prisma.siteSetting.upsert({
      where: { key },
      update: { value, updatedAt: new Date() },
      create: { key, value },
    })
  )

  return await prisma.$transaction(updates)
}

/**
 * Site ayarını siler
 */
export async function deleteSiteSetting(key: string) {
  return await prisma.siteSetting.delete({
    where: { key },
  })
}

/**
 * Cache'li site ayarları (React cache)
 */
export const getCachedSettings = cache(async () => {
  return await getSiteSettings()
})
