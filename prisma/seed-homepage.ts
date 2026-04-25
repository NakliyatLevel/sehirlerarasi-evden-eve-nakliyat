import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seedHomepage() {
  console.log('🌱 Ana sayfa örnek verileri ekleniyor...')

  // Features (Neden Biz?)
  const features = [
    {
      title: 'Profesyonel Ekip',
      description: 'Deneyimli ve eğitimli personelimizle güvenli taşımacılık',
      icon: 'Users',
      order: 1,
    },
    {
      title: 'Güvenli Taşıma',
      description: 'Eşyalarınız özel paketleme malzemeleriyle korunur',
      icon: 'Shield',
      order: 2,
    },
    {
      title: 'Uygun Fiyat',
      description: 'Rekabetçi fiyatlarla kaliteli hizmet',
      icon: 'DollarSign',
      order: 3,
    },
    {
      title: 'Sigortalı Hizmet',
      description: 'Tüm taşımalarımız sigorta kapsamındadır',
      icon: 'FileCheck',
      order: 4,
    },
    {
      title: '7/24 Destek',
      description: 'Her zaman yanınızdayız, kesintisiz iletişim',
      icon: 'Phone',
      order: 5,
    },
    {
      title: 'Zamanında Teslimat',
      description: 'Belirlenen tarih ve saatte teslimat garantisi',
      icon: 'Clock',
      order: 6,
    },
  ]

  for (const feature of features) {
    await prisma.feature.upsert({
      where: { id: `feature-${feature.order}` },
      update: feature,
      create: {
        id: `feature-${feature.order}`,
        ...feature,
      },
    })
  }
  console.log('✅ 6 özellik eklendi')

  // Statistics (İstatistikler)
  const statistics = [
    {
      title: 'Mutlu Müşteri',
      value: '5000+',
      icon: 'Users',
      order: 1,
    },
    {
      title: 'Tamamlanan Taşıma',
      value: '10000+',
      icon: 'Package',
      order: 2,
    },
    {
      title: 'Hizmet Verilen Şehir',
      value: '81',
      icon: 'MapPin',
      order: 3,
    },
    {
      title: 'Yıllık Tecrübe',
      value: '15+',
      icon: 'Award',
      order: 4,
    },
  ]

  for (const stat of statistics) {
    await prisma.statistic.upsert({
      where: { id: `stat-${stat.order}` },
      update: stat,
      create: {
        id: `stat-${stat.order}`,
        ...stat,
      },
    })
  }
  console.log('✅ 4 istatistik eklendi')

  // Process (Nasıl Çalışır?)
  const processes = [
    {
      title: 'Teklif Alın',
      description: 'Online form veya telefon ile ücretsiz fiyat teklifi alın',
      step: 1,
      icon: 'FileText',
    },
    {
      title: 'Keşif Yapılır',
      description: 'Uzman ekibimiz eşyalarınızı yerinde görüp değerlendirir',
      step: 2,
      icon: 'Search',
    },
    {
      title: 'Paketleme',
      description: 'Eşyalarınız profesyonel malzemelerle özenle paketlenir',
      step: 3,
      icon: 'Package',
    },
    {
      title: 'Taşıma',
      description: 'Güvenli araçlarımızla eşyalarınız taşınır',
      step: 4,
      icon: 'Truck',
    },
    {
      title: 'Teslimat',
      description: 'Eşyalarınız yeni adresinizde teslim edilir ve yerleştirilir',
      step: 5,
      icon: 'Home',
    },
  ]

  for (const process of processes) {
    await prisma.process.upsert({
      where: { id: `process-${process.step}` },
      update: process,
      create: {
        id: `process-${process.step}`,
        ...process,
      },
    })
  }
  console.log('✅ 5 süreç adımı eklendi')

  console.log('🎉 Ana sayfa örnek verileri başarıyla eklendi!')
}

seedHomepage()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
