import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seedAllSections() {
  console.log('Tum sectionlar icin ornek veriler ekleniyor...')

  // Services (Hizmetler)
  const services = [
    {
      name: 'Evden Eve Nakliyat',
      slug: 'evden-eve-nakliyat',
      description: 'Şehir içi ve şehirler arası profesyonel ev taşıma hizmeti',
      icon: 'Home',
      order: 1,
    },
    {
      name: 'Ofis Taşıma',
      slug: 'ofis-tasima',
      description: 'Kurumsal ofis taşıma ve yerleşim hizmetleri',
      icon: 'Building',
      order: 2,
    },
    {
      name: 'Uluslararası Nakliyat',
      slug: 'uluslararasi-nakliyat',
      description: 'Avrupa genelinde güvenli ve hızlı taşımacılık',
      icon: 'Globe',
      order: 3,
    },
  ]

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: service,
      create: service,
    })
  }
  console.log('3 services added')

  // Reviews (Müşteri Yorumları)
  const reviews = [
    {
      name: 'Ahmet Yılmaz',
      rating: 5,
      comment: 'Çok profesyonel bir ekip. Eşyalarımız tek bir çizik bile almadan taşındı. Kesinlikle tavsiye ederim.',
      location: 'İstanbul',
      approved: true,
    },
    {
      name: 'Ayşe Demir',
      rating: 5,
      comment: 'Zamanında teslimat, güler yüzlü personel. Fiyat performans olarak çok memnun kaldık.',
      location: 'Ankara',
      approved: true,
    },
    {
      name: 'Mehmet Kaya',
      rating: 4,
      comment: 'Genel olarak iyi bir hizmet aldık. Paketleme konusunda çok özenli davrandılar.',
      location: 'İzmir',
      approved: true,
    },
    {
      name: 'Fatma Şahin',
      rating: 5,
      comment: 'Uluslararası taşımamızda hiçbir sorun yaşamadık. Almanya\'ya kadar sorunsuz teslimat.',
      location: 'Bursa',
      approved: true,
    },
    {
      name: 'Ali Özkan',
      rating: 5,
      comment: 'Ofis taşımamızda çok yardımcı oldular. Tüm ekipmanlarımız güvenle taşındı.',
      location: 'Antalya',
      approved: true,
    },
    {
      name: 'Zeynep Arslan',
      rating: 4,
      comment: 'Fiyatlar uygun, hizmet kalitesi yüksek. Tekrar tercih edeceğim.',
      location: 'Adana',
      approved: true,
    },
  ]

  for (const review of reviews) {
    await prisma.review.create({
      data: review,
    })
  }
  console.log('6 reviews added')

  // Gallery (Galeri)
  const gallery = [
    {
      title: 'Evden Eve Nakliyat - İstanbul',
      image: '/images/gallery/nakliyat-1.jpg',
      category: 'Evden Eve',
      order: 1,
    },
    {
      title: 'Ofis Taşıma - Ankara',
      image: '/images/gallery/ofis-1.jpg',
      category: 'Ofis',
      order: 2,
    },
    {
      title: 'Paketleme Hizmeti',
      image: '/images/gallery/paketleme-1.jpg',
      category: 'Paketleme',
      order: 3,
    },
    {
      title: 'Uluslararası Nakliyat',
      image: '/images/gallery/uluslararasi-1.jpg',
      category: 'Uluslararası',
      order: 4,
    },
    {
      title: 'Eşya Taşıma',
      image: '/images/gallery/esya-1.jpg',
      category: 'Evden Eve',
      order: 5,
    },
    {
      title: 'Araç Filosu',
      image: '/images/gallery/arac-1.jpg',
      category: 'Araçlar',
      order: 6,
    },
    {
      title: 'Güvenli Taşıma',
      image: '/images/gallery/guvenli-1.jpg',
      category: 'Evden Eve',
      order: 7,
    },
    {
      title: 'Profesyonel Ekip',
      image: '/images/gallery/ekip-1.jpg',
      category: 'Ekip',
      order: 8,
    },
  ]

  for (const item of gallery) {
    await prisma.gallery.create({
      data: item,
    })
  }
  console.log('8 gallery items added')

  // FAQs (SSS)
  const faqs = [
    {
      question: 'Nakliyat hizmeti nasıl fiyatlandırılır?',
      answer: 'Fiyatlandırma; taşınacak eşya miktarı, mesafe, kat sayısı, asansör durumu ve özel hizmetler (paketleme, sigorta) gibi faktörlere göre belirlenir. Ücretsiz keşif hizmeti ile size özel fiyat teklifi sunuyoruz.',
      category: 'Fiyatlandırma',
      order: 1,
    },
    {
      question: 'Eşyalarım sigortalı mı taşınır?',
      answer: 'Evet, tüm taşımalarımız sigorta kapsamındadır. Ek olarak tam kapsamlı sigorta seçeneği de sunuyoruz. Eşyalarınızın güvenliği bizim önceliğimizdir.',
      category: 'Sigorta',
      order: 2,
    },
    {
      question: 'Paketleme hizmeti veriyor musunuz?',
      answer: 'Evet, profesyonel paketleme hizmeti sunuyoruz. Özel paketleme malzemeleri ile eşyalarınızı güvenle paketliyoruz. İsterseniz sadece kırılabilir eşyalar için de paketleme hizmeti alabilirsiniz.',
      category: 'Hizmetler',
      order: 3,
    },
    {
      question: 'Ne kadar önceden randevu almalıyım?',
      answer: 'Yoğun sezonlarda (Haziran-Eylül) en az 1-2 hafta önceden, diğer dönemlerde 3-5 gün önceden randevu almanızı öneriyoruz. Acil durumlar için aynı gün hizmet de verebiliyoruz.',
      category: 'Randevu',
      order: 4,
    },
    {
      question: 'Hangi şehirlere hizmet veriyorsunuz?',
      answer: 'Türkiye\'nin 81 iline hizmet veriyoruz. Ayrıca Avrupa\'nın birçok ülkesine uluslararası nakliyat hizmeti sunuyoruz.',
      category: 'Hizmet Bölgeleri',
      order: 5,
    },
    {
      question: 'Ödeme nasıl yapılır?',
      answer: 'Nakit, kredi kartı ve havale ile ödeme kabul ediyoruz. Ödemenin %50\'si taşıma öncesi, %50\'si teslimat sonrası yapılır. Kurumsal müşterilerimize fatura ve çek ödeme seçenekleri sunuyoruz.',
      category: 'Ödeme',
      order: 6,
    },
  ]

  for (const faq of faqs) {
    await prisma.fAQ.create({
      data: faq,
    })
  }
  console.log('6 FAQs added')

  // Blog Posts
  const posts = [
    {
      title: 'Evden Eve Nakliyat İçin 10 Altın Kural',
      slug: 'evden-eve-nakliyat-10-altin-kural',
      excerpt: 'Taşınma sürecinizi kolaylaştıracak ve stressiz hale getirecek pratik öneriler.',
      content: '<h2>Evden Eve Nakliyat İçin 10 Altın Kural</h2><p>Taşınma süreci stresli olabilir, ancak doğru planlama ile bu süreci çok daha kolay hale getirebilirsiniz...</p>',
      image: '/images/blog/nakliyat-kurallari.jpg',
      published: true,
      publishedAt: new Date('2024-03-01'),
    },
    {
      title: 'Kırılgan Eşyalar Nasıl Paketlenir?',
      slug: 'kirilgan-esyalar-nasil-paketlenir',
      excerpt: 'Cam, porselen ve değerli eşyalarınızı güvenle paketleme teknikleri.',
      content: '<h2>Kırılgan Eşyalar Nasıl Paketlenir?</h2><p>Kırılgan eşyalarınızın güvenli taşınması için profesyonel paketleme teknikleri...</p>',
      image: '/images/blog/paketleme.jpg',
      published: true,
      publishedAt: new Date('2024-03-05'),
    },
    {
      title: 'Uluslararası Nakliyatta Dikkat Edilmesi Gerekenler',
      slug: 'uluslararasi-nakliyat-dikkat-edilmesi-gerekenler',
      excerpt: 'Yurtdışına taşınırken bilmeniz gereken önemli detaylar ve gümrük işlemleri.',
      content: '<h2>Uluslararası Nakliyatta Dikkat Edilmesi Gerekenler</h2><p>Yurtdışına taşınma kararı aldıysanız, dikkat etmeniz gereken birçok detay var...</p>',
      image: '/images/blog/uluslararasi.jpg',
      published: true,
      publishedAt: new Date('2024-03-10'),
    },
  ]

  for (const post of posts) {
    await prisma.post.create({
      data: post,
    })
  }
  console.log('3 blog posts added')

  console.log('Tum sectionlar icin ornek veriler basariyla eklendi!')
}

seedAllSections()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
