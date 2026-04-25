import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function cleanDuplicates() {
  console.log('🧹 Tekrarlayan veriler temizleniyor...')

  // Özellikler - sadece ilk 6 tanesini tut
  const features = await prisma.feature.findMany({
    orderBy: { createdAt: 'asc' },
  })
  
  if (features.length > 6) {
    const toDelete = features.slice(6)
    for (const feature of toDelete) {
      await prisma.feature.delete({ where: { id: feature.id } })
    }
    console.log(`✅ ${toDelete.length} tekrarlayan özellik silindi`)
  }

  // İstatistikler - sadece ilk 4 tanesini tut
  const statistics = await prisma.statistic.findMany({
    orderBy: { createdAt: 'asc' },
  })
  
  if (statistics.length > 4) {
    const toDelete = statistics.slice(4)
    for (const stat of toDelete) {
      await prisma.statistic.delete({ where: { id: stat.id } })
    }
    console.log(`✅ ${toDelete.length} tekrarlayan istatistik silindi`)
  }

  // Süreç - sadece ilk 5 tanesini tut
  const processes = await prisma.process.findMany({
    orderBy: { createdAt: 'asc' },
  })
  
  if (processes.length > 5) {
    const toDelete = processes.slice(5)
    for (const process of toDelete) {
      await prisma.process.delete({ where: { id: process.id } })
    }
    console.log(`✅ ${toDelete.length} tekrarlayan süreç silindi`)
  }

  // Yorumlar - sadece ilk 3 tanesini tut
  const reviews = await prisma.review.findMany({
    orderBy: { createdAt: 'asc' },
  })
  
  if (reviews.length > 3) {
    const toDelete = reviews.slice(3)
    for (const review of toDelete) {
      await prisma.review.delete({ where: { id: review.id } })
    }
    console.log(`✅ ${toDelete.length} tekrarlayan yorum silindi`)
  }

  // SSS - sadece ilk 5 tanesini tut
  const faqs = await prisma.fAQ.findMany({
    orderBy: { createdAt: 'asc' },
  })
  
  if (faqs.length > 5) {
    const toDelete = faqs.slice(5)
    for (const faq of toDelete) {
      await prisma.fAQ.delete({ where: { id: faq.id } })
    }
    console.log(`✅ ${toDelete.length} tekrarlayan SSS silindi`)
  }

  console.log('🎉 Temizlik tamamlandı!')
}

cleanDuplicates()
  .catch((e) => {
    console.error('❌ Hata:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
