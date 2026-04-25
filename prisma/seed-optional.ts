import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seedOptionalSections() {
  console.log('🌱 Opsiyonel section verileri ekleniyor...')

  // Service Areas (Hizmet Bölgeleri)
  const serviceAreas = [
    { city: 'İstanbul', description: 'Avrupa ve Anadolu yakası tüm ilçeler', order: 1 },
    { city: 'Ankara', description: 'Tüm merkez ilçeler', order: 2 },
    { city: 'İzmir', description: 'Karşıyaka, Bornova, Konak ve çevre ilçeler', order: 3 },
    { city: 'Bursa', description: 'Nilüfer, Osmangazi, Yıldırım', order: 4 },
    { city: 'Antalya', description: 'Merkez ve Kemer, Alanya bölgeleri', order: 5 },
    { city: 'Adana', description: 'Seyhan, Çukurova ve çevre', order: 6 },
    { city: 'Konya', description: 'Selçuklu, Meram, Karatay', order: 7 },
    { city: 'Gaziantep', description: 'Şahinbey, Şehitkamil', order: 8 },
    { city: 'Kocaeli', description: 'İzmit, Gebze, Darıca', order: 9 },
    { city: 'Eskişehir', description: 'Odunpazarı, Tepebaşı', order: 10 },
  ]

  for (const area of serviceAreas) {
    const slug = area.city.toLowerCase().replace(/ş/g, 's').replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ö/g, 'o').replace(/ç/g, 'c').replace(/ı/g, 'i')
    await prisma.serviceArea.upsert({
      where: { slug },
      update: area,
      create: {
        id: `area-${area.order}`,
        slug,
        ...area,
      },
    })
  }
  console.log('✅ 10 hizmet bölgesi eklendi')

  // Partners (Referanslar)
  const partners = [
    { name: 'Koç Holding', website: 'https://koc.com.tr', order: 1 },
    { name: 'Sabancı Holding', website: 'https://sabanci.com', order: 2 },
    { name: 'Eczacıbaşı', website: 'https://eczacibasi.com.tr', order: 3 },
    { name: 'Doğuş Grubu', website: 'https://dogusgrubu.com.tr', order: 4 },
    { name: 'Zorlu Holding', website: 'https://zorluholding.com', order: 5 },
    { name: 'Anadolu Grubu', website: 'https://anadolugrubu.com.tr', order: 6 },
  ]

  for (const partner of partners) {
    await prisma.partner.upsert({
      where: { id: `partner-${partner.order}` },
      update: partner,
      create: {
        id: `partner-${partner.order}`,
        ...partner,
      },
    })
  }
  console.log('✅ 6 referans firma eklendi')

  // Team Members (Ekip)
  const teamMembers = [
    {
      name: 'Ahmet Yılmaz',
      position: 'Genel Müdür',
      bio: '15 yıllık nakliyat sektörü deneyimi. Müşteri memnuniyeti odaklı hizmet anlayışı.',
      order: 1,
    },
    {
      name: 'Mehmet Demir',
      position: 'Operasyon Müdürü',
      bio: 'Lojistik ve operasyon yönetiminde 12 yıllık tecrübe. Verimli süreç yönetimi uzmanı.',
      order: 2,
    },
    {
      name: 'Ayşe Kaya',
      position: 'Müşteri İlişkileri Müdürü',
      bio: 'Müşteri memnuniyeti ve iletişim konusunda 10 yıllık deneyim.',
      order: 3,
    },
    {
      name: 'Fatma Şahin',
      position: 'Kalite Kontrol Sorumlusu',
      bio: 'Hizmet kalitesi ve standartları konusunda uzman. 8 yıllık saha tecrübesi.',
      order: 4,
    },
  ]

  for (const member of teamMembers) {
    await prisma.teamMember.upsert({
      where: { id: `team-${member.order}` },
      update: member,
      create: {
        id: `team-${member.order}`,
        ...member,
      },
    })
  }
  console.log('✅ 4 ekip üyesi eklendi')

  console.log('🎉 Opsiyonel section verileri başarıyla eklendi!')
}

seedOptionalSections()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
