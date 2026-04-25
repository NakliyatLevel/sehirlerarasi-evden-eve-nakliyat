import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding service areas...')

  const areas = [
    {
      city: 'İstanbul',
      slug: 'istanbul',
      description: 'Avrupa ve Anadolu yakasında tüm ilçelere profesyonel evden eve nakliyat hizmeti sunuyoruz.',
      order: 1,
      active: true,
    },
    {
      city: 'Ankara',
      slug: 'ankara',
      description: 'Başkent Ankara\'nın tüm bölgelerine güvenli ve hızlı nakliyat hizmeti.',
      order: 2,
      active: true,
    },
    {
      city: 'İzmir',
      slug: 'izmir',
      description: 'İzmir ve çevre ilçelerde kaliteli evden eve taşımacılık hizmeti.',
      order: 3,
      active: true,
    },
    {
      city: 'Bursa',
      slug: 'bursa',
      description: 'Bursa genelinde sigortalı ve profesyonel nakliyat çözümleri.',
      order: 4,
      active: true,
    },
    {
      city: 'Antalya',
      slug: 'antalya',
      description: 'Antalya ve çevresinde deneyimli ekibimizle evden eve nakliyat.',
      order: 5,
      active: true,
    },
    {
      city: 'Kocaeli',
      slug: 'kocaeli',
      description: 'Kocaeli, Gebze ve İzmit bölgesinde hızlı ve güvenilir taşımacılık.',
      order: 6,
      active: true,
    },
  ]

  for (const area of areas) {
    await prisma.serviceArea.upsert({
      where: { slug: area.slug },
      update: area,
      create: area,
    })
    console.log(`✓ ${area.city} eklendi`)
  }

  console.log('Seeding completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
