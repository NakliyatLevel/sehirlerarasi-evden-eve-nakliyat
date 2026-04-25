import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Admin kullanıcısı oluştur
  const hashedPassword = await bcrypt.hash('admin123', 10)
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin',
      password: hashedPassword,
      role: 'admin',
    },
  })

  console.log('✅ Admin kullanıcısı oluşturuldu:', admin.email)

  // Temel site ayarları
  const siteSettings = [
    { key: 'site_title', value: 'Evden Eve Nakliyat' },
    { key: 'company_name', value: 'Çolak Nakliyat' },
    { key: 'domain', value: 'localhost:3000' },
    { key: 'phone', value: '+90 555 123 4567' },
    { key: 'email', value: 'info@example.com' },
    { key: 'address', value: 'İstanbul, Türkiye' },
    { key: 'seo_title', value: 'Evden Eve Nakliyat - Profesyonel Taşımacılık' },
    { key: 'seo_description', value: 'Profesyonel evden eve nakliyat hizmetleri' },
  ]

  for (const setting of siteSettings) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting,
    })
  }

  console.log('✅ Site ayarları oluşturuldu')

  // Özellikler - upsert ile tekrar oluşturulmaz
  const features = [
    { id: 'feature-1', title: 'Profesyonel Ekip', description: 'Deneyimli ve eğitimli personelimiz ile güvenli taşımacılık', icon: 'users', order: 1, active: true },
    { id: 'feature-2', title: 'Sigortalı Taşımacılık', description: 'Tüm eşyalarınız tam kapsamlı sigorta altında', icon: 'shield', order: 2, active: true },
    { id: 'feature-3', title: 'Modern Araç Filosu', description: 'Yeni model, bakımlı ve güvenli araçlarımız', icon: 'truck', order: 3, active: true },
    { id: 'feature-4', title: 'Uygun Fiyat', description: 'Kaliteli hizmet, uygun fiyat garantisi', icon: 'tag', order: 4, active: true },
    { id: 'feature-5', title: '7/24 Müşteri Desteği', description: 'Her zaman yanınızdayız, kesintisiz destek', icon: 'headphones', order: 5, active: true },
    { id: 'feature-6', title: 'Zamanında Teslimat', description: 'Belirlenen tarih ve saatte teslimat garantisi', icon: 'clock', order: 6, active: true },
  ]

  for (const feature of features) {
    await prisma.feature.upsert({
      where: { id: feature.id },
      update: feature,
      create: feature,
    })
  }

  console.log('✅ Özellikler oluşturuldu/güncellendi')

  // İstatistikler - upsert ile tekrar oluşturulmaz
  const statistics = [
    { id: 'stat-1', title: 'Mutlu Müşteri', value: '10,000+', icon: 'users', order: 1, active: true },
    { id: 'stat-2', title: 'Yıllık Deneyim', value: '15+', icon: 'calendar', order: 2, active: true },
    { id: 'stat-3', title: 'Şehir', value: '81', icon: 'map-pin', order: 3, active: true },
    { id: 'stat-4', title: 'Araç Filosu', value: '50+', icon: 'truck', order: 4, active: true },
  ]

  for (const stat of statistics) {
    await prisma.statistic.upsert({
      where: { id: stat.id },
      update: stat,
      create: stat,
    })
  }

  console.log('✅ İstatistikler oluşturuldu/güncellendi')

  // Süreç - upsert ile tekrar oluşturulmaz
  const processes = [
    { id: 'process-1', step: 1, title: 'Teklif Alın', description: 'Ücretsiz fiyat teklifi için bizimle iletişime geçin', icon: 'phone', active: true },
    { id: 'process-2', step: 2, title: 'Keşif', description: 'Uzman ekibimiz yerinde keşif yapar', icon: 'search', active: true },
    { id: 'process-3', step: 3, title: 'Paketleme', description: 'Eşyalarınız profesyonelce paketlenir', icon: 'package', active: true },
    { id: 'process-4', step: 4, title: 'Taşıma', description: 'Güvenli ve hızlı şekilde taşınır', icon: 'truck', active: true },
    { id: 'process-5', step: 5, title: 'Teslimat', description: 'Yeni adresinizde yerleştirilir', icon: 'check', active: true },
  ]

  for (const process of processes) {
    await prisma.process.upsert({
      where: { id: process.id },
      update: process,
      create: process,
    })
  }

  console.log('✅ Süreç oluşturuldu/güncellendi')

  // Yorumlar - upsert ile tekrar oluşturulmaz
  const reviews = [
    { id: 'review-1', name: 'Ahmet Yılmaz', location: 'İstanbul', rating: 5, comment: 'Çok profesyonel bir ekip. Eşyalarımıza çok özen gösterdiler. Kesinlikle tavsiye ederim.', approved: true },
    { id: 'review-2', name: 'Ayşe Demir', location: 'Ankara', rating: 5, comment: 'Fiyat performans açısından harika. Zamanında teslimat yaptılar, hiçbir sorun yaşamadık.', approved: true },
    { id: 'review-3', name: 'Mehmet Kaya', location: 'İzmir', rating: 5, comment: 'İkinci kez çalıştığımız firma. Her seferinde aynı kaliteli hizmet. Teşekkürler.', approved: true },
  ]

  for (const review of reviews) {
    await prisma.review.upsert({
      where: { id: review.id },
      update: review,
      create: review,
    })
  }

  console.log('✅ Yorumlar oluşturuldu/güncellendi')

  // Galeri - upsert ile tekrar oluşturulmaz
  const gallery = [
    { id: 'gallery-1', title: 'Araç Filosu 1', image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800', category: 'vehicles', order: 1, active: true },
    { id: 'gallery-2', title: 'Araç Filosu 2', image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800', category: 'vehicles', order: 2, active: true },
    { id: 'gallery-3', title: 'Paketleme 1', image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800', category: 'packaging', order: 3, active: true },
    { id: 'gallery-4', title: 'Paketleme 2', image: 'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=800', category: 'packaging', order: 4, active: true },
  ]

  for (const item of gallery) {
    await prisma.gallery.upsert({
      where: { id: item.id },
      update: item,
      create: item,
    })
  }

  console.log('✅ Galeri oluşturuldu/güncellendi')

  // SSS - upsert ile tekrar oluşturulmaz
  const faqs = [
    { id: 'faq-1', question: 'Nakliyat hizmeti nasıl alınır?', answer: 'Teklif formumuzu doldurarak veya bizi arayarak ücretsiz fiyat teklifi alabilirsiniz. Uzman ekibimiz size en uygun çözümü sunar.', category: 'genel', order: 1, active: true },
    { id: 'faq-2', question: 'Eşyalarım sigortalı mı?', answer: 'Evet, tüm eşyalarınız tam kapsamlı nakliyat sigortası altındadır. Herhangi bir hasar durumunda sigorta kapsamında karşılanır.', category: 'genel', order: 2, active: true },
    { id: 'faq-3', question: 'Paketleme malzemelerini siz mi sağlıyorsunuz?', answer: 'Evet, tüm paketleme malzemeleri (koli, streç, balon nylon vb.) tarafımızca sağlanır ve fiyata dahildir.', category: 'hizmet', order: 3, active: true },
    { id: 'faq-4', question: 'Hangi şehirlere hizmet veriyorsunuz?', answer: 'Türkiye\'nin 81 iline profesyonel nakliyat hizmeti sunuyoruz. Şehirlerarası ve şehir içi taşımacılık yapıyoruz.', category: 'genel', order: 4, active: true },
    { id: 'faq-5', question: 'Ödeme nasıl yapılır?', answer: 'Nakit, kredi kartı veya havale ile ödeme yapabilirsiniz. Ödeme koşulları hakkında detaylı bilgi için bizimle iletişime geçebilirsiniz.', category: 'fiyat', order: 5, active: true },
  ]

  for (const faq of faqs) {
    await prisma.fAQ.upsert({
      where: { id: faq.id },
      update: faq,
      create: faq,
    })
  }

  console.log('✅ SSS oluşturuldu/güncellendi')

  console.log('🎉 Seed tamamlandı!')
}

main()
  .catch((e) => {
    console.error('❌ Seed hatası:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
