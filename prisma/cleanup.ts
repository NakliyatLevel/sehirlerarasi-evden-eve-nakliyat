import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  console.log('=== Veritabanı Temizliği Başlıyor ===\n')

  // 1. Eski tek-şehir ServiceArea kayıtlarını sil
  const oldSlugs = ['istanbul', 'ankara', 'izmir', 'bursa', 'antalya', 'kocaeli']
  const deleted = await prisma.serviceArea.deleteMany({
    where: { slug: { in: oldSlugs } },
  })
  console.log(`✓ ${deleted.count} eski ServiceArea kaydı silindi (${oldSlugs.join(', ')})`)

  // 2. İçeriksiz 3 eski servis kaydını deaktif et
  const oldServiceSlugs = ['evden-eve-nakliyat', 'ofis-tasima', 'uluslararasi-nakliyat']
  const deactivated = await prisma.service.updateMany({
    where: {
      slug: { in: oldServiceSlugs },
      content: null,
    },
    data: { active: false, showOnHomepage: false },
  })
  console.log(`✓ ${deactivated.count} içeriksiz servis deaktif edildi`)

  // 3. Duplicate Review kontrolü - sadece unique name+comment bırak
  const allReviews = await prisma.review.findMany({ orderBy: { createdAt: 'asc' } })
  const seen = new Set<string>()
  const toDelete: string[] = []
  for (const r of allReviews) {
    const key = `${r.name}-${r.comment.substring(0, 30)}`
    if (seen.has(key)) {
      toDelete.push(r.id)
    } else {
      seen.add(key)
    }
  }
  if (toDelete.length > 0) {
    await prisma.review.deleteMany({ where: { id: { in: toDelete } } })
    console.log(`✓ ${toDelete.length} duplicate yorum silindi`)
  } else {
    console.log('✓ Duplicate yorum yok')
  }

  // 4. Duplicate FAQ kontrolü
  const allFaqs = await prisma.fAQ.findMany({ orderBy: { createdAt: 'asc' } })
  const seenFaq = new Set<string>()
  const faqToDelete: string[] = []
  for (const f of allFaqs) {
    const key = f.question.substring(0, 40)
    if (seenFaq.has(key)) {
      faqToDelete.push(f.id)
    } else {
      seenFaq.add(key)
    }
  }
  if (faqToDelete.length > 0) {
    await prisma.fAQ.deleteMany({ where: { id: { in: faqToDelete } } })
    console.log(`✓ ${faqToDelete.length} duplicate SSS silindi`)
  } else {
    console.log('✓ Duplicate SSS yok')
  }

  // 5. Duplicate Gallery kontrolü
  const allGallery = await prisma.gallery.findMany({ orderBy: { createdAt: 'asc' } })
  const seenGallery = new Set<string>()
  const galleryToDelete: string[] = []
  for (const g of allGallery) {
    if (seenGallery.has(g.image)) {
      galleryToDelete.push(g.id)
    } else {
      seenGallery.add(g.image)
    }
  }
  if (galleryToDelete.length > 0) {
    await prisma.gallery.deleteMany({ where: { id: { in: galleryToDelete } } })
    console.log(`✓ ${galleryToDelete.length} duplicate galeri kaydı silindi`)
  } else {
    console.log('✓ Duplicate galeri yok')
  }

  // 6. Son durum raporu
  console.log('\n=== Veritabanı Son Durum ===')
  const counts = await Promise.all([
    prisma.service.count({ where: { active: true } }),
    prisma.solution.count({ where: { active: true } }),
    prisma.serviceArea.count({ where: { active: true } }),
    prisma.review.count({ where: { approved: true } }),
    prisma.fAQ.count({ where: { active: true } }),
    prisma.feature.count({ where: { active: true } }),
    prisma.statistic.count({ where: { active: true } }),
    prisma.process.count({ where: { active: true } }),
    prisma.post.count({ where: { published: true } }),
    prisma.gallery.count({ where: { active: true } }),
    prisma.partner.count({ where: { active: true } }),
    prisma.user.count(),
    prisma.siteSetting.count(),
  ])

  const labels = [
    'Aktif Hizmet',
    'Aktif Çözüm',
    'Aktif Bölge',
    'Onaylı Yorum',
    'Aktif SSS',
    'Aktif Özellik',
    'Aktif İstatistik',
    'Aktif Süreç',
    'Yayınlanan Blog',
    'Aktif Galeri',
    'Aktif Partner',
    'Admin Kullanıcı',
    'Site Ayarı',
  ]

  counts.forEach((count, i) => {
    const icon = count === 0 ? '⚠️' : '✅'
    console.log(`${icon} ${labels[i]}: ${count}`)
  })

  console.log('\n✅ Temizlik tamamlandı!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
