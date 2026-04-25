import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function addServiceAreas() {
  console.log('🌍 Hizmet bölgeleri ekleniyor...')

  const serviceAreas = [
    { id: 'area-istanbul-izmir', city: 'İstanbul İzmir', slug: 'istanbul-izmir', description: 'İstanbul İzmir arası evden eve nakliyat hizmeti', order: 1, active: true },
    { id: 'area-istanbul-aydin', city: 'İstanbul Aydın', slug: 'istanbul-aydin', description: 'İstanbul Aydın arası evden eve nakliyat hizmeti', order: 2, active: true },
    { id: 'area-istanbul-ankara', city: 'İstanbul Ankara', slug: 'istanbul-ankara', description: 'İstanbul Ankara arası evden eve nakliyat hizmeti', order: 3, active: true },
    { id: 'area-istanbul-antalya', city: 'İstanbul Antalya', slug: 'istanbul-antalya', description: 'İstanbul Antalya arası evden eve nakliyat hizmeti', order: 4, active: true },
    { id: 'area-istanbul-balikesir', city: 'İstanbul Balıkesir', slug: 'istanbul-balikesir', description: 'İstanbul Balıkesir arası evden eve nakliyat hizmeti', order: 5, active: true },
    { id: 'area-istanbul-bursa', city: 'İstanbul Bursa', slug: 'istanbul-bursa', description: 'İstanbul Bursa arası evden eve nakliyat hizmeti', order: 6, active: true },
    { id: 'area-istanbul-mugla', city: 'İstanbul Muğla', slug: 'istanbul-mugla', description: 'İstanbul Muğla arası evden eve nakliyat hizmeti', order: 7, active: true },
    { id: 'area-istanbul-adana', city: 'İstanbul Adana', slug: 'istanbul-adana', description: 'İstanbul Adana arası evden eve nakliyat hizmeti', order: 8, active: true },
    { id: 'area-istanbul-denizli', city: 'İstanbul Denizli', slug: 'istanbul-denizli', description: 'İstanbul Denizli arası evden eve nakliyat hizmeti', order: 9, active: true },
    { id: 'area-istanbul-eskisehir', city: 'İstanbul Eskişehir', slug: 'istanbul-eskisehir', description: 'İstanbul Eskişehir arası evden eve nakliyat hizmeti', order: 10, active: true },
    { id: 'area-istanbul-rize', city: 'İstanbul Rize', slug: 'istanbul-rize', description: 'İstanbul Rize arası evden eve nakliyat hizmeti', order: 11, active: true },
    { id: 'area-istanbul-sinop', city: 'İstanbul Sinop', slug: 'istanbul-sinop', description: 'İstanbul Sinop arası evden eve nakliyat hizmeti', order: 12, active: true },
    { id: 'area-istanbul-diyarbakir', city: 'İstanbul Diyarbakır', slug: 'istanbul-diyarbakir', description: 'İstanbul Diyarbakır arası evden eve nakliyat hizmeti', order: 13, active: true },
    { id: 'area-istanbul-edirne', city: 'İstanbul Edirne', slug: 'istanbul-edirne', description: 'İstanbul Edirne arası evden eve nakliyat hizmeti', order: 14, active: true },
    { id: 'area-istanbul-erzincan', city: 'İstanbul Erzincan', slug: 'istanbul-erzincan', description: 'İstanbul Erzincan arası evden eve nakliyat hizmeti', order: 15, active: true },
    { id: 'area-istanbul-giresun', city: 'İstanbul Giresun', slug: 'istanbul-giresun', description: 'İstanbul Giresun arası evden eve nakliyat hizmeti', order: 16, active: true },
    { id: 'area-istanbul-kars', city: 'İstanbul Kars', slug: 'istanbul-kars', description: 'İstanbul Kars arası evden eve nakliyat hizmeti', order: 17, active: true },
    { id: 'area-istanbul-kayseri', city: 'İstanbul Kayseri', slug: 'istanbul-kayseri', description: 'İstanbul Kayseri arası evden eve nakliyat hizmeti', order: 18, active: true },
    { id: 'area-istanbul-konya', city: 'İstanbul Konya', slug: 'istanbul-konya', description: 'İstanbul Konya arası evden eve nakliyat hizmeti', order: 19, active: true },
    { id: 'area-istanbul-manisa', city: 'İstanbul Manisa', slug: 'istanbul-manisa', description: 'İstanbul Manisa arası evden eve nakliyat hizmeti', order: 20, active: true },
    { id: 'area-istanbul-mus', city: 'İstanbul Muş', slug: 'istanbul-mus', description: 'İstanbul Muş arası evden eve nakliyat hizmeti', order: 21, active: true },
    { id: 'area-istanbul-ordu', city: 'İstanbul Ordu', slug: 'istanbul-ordu', description: 'İstanbul Ordu arası evden eve nakliyat hizmeti', order: 22, active: true },
    { id: 'area-istanbul-sivas', city: 'İstanbul Sivas', slug: 'istanbul-sivas', description: 'İstanbul Sivas arası evden eve nakliyat hizmeti', order: 23, active: true },
    { id: 'area-istanbul-trabzon', city: 'İstanbul Trabzon', slug: 'istanbul-trabzon', description: 'İstanbul Trabzon arası evden eve nakliyat hizmeti', order: 24, active: true },
    { id: 'area-istanbul-van', city: 'İstanbul Van', slug: 'istanbul-van', description: 'İstanbul Van arası evden eve nakliyat hizmeti', order: 25, active: true },
    { id: 'area-istanbul-amasya', city: 'İstanbul Amasya', slug: 'istanbul-amasya', description: 'İstanbul Amasya arası evden eve nakliyat hizmeti', order: 26, active: true },
    { id: 'area-istanbul-batman', city: 'İstanbul Batman', slug: 'istanbul-batman', description: 'İstanbul Batman arası evden eve nakliyat hizmeti', order: 27, active: true },
    { id: 'area-istanbul-gaziantep', city: 'İstanbul Gaziantep', slug: 'istanbul-gaziantep', description: 'İstanbul Gaziantep arası evden eve nakliyat hizmeti', order: 28, active: true },
    { id: 'area-istanbul-hakkari', city: 'İstanbul Hakkari', slug: 'istanbul-hakkari', description: 'İstanbul Hakkari arası evden eve nakliyat hizmeti', order: 29, active: true },
    { id: 'area-istanbul-canakkale', city: 'İstanbul Çanakkale', slug: 'istanbul-canakkale', description: 'İstanbul Çanakkale arası evden eve nakliyat hizmeti', order: 30, active: true },
  ]

  for (const area of serviceAreas) {
    await prisma.serviceArea.upsert({
      where: { id: area.id },
      update: area,
      create: area,
    })
  }

  console.log(`✅ ${serviceAreas.length} hizmet bölgesi eklendi/güncellendi`)
  console.log('🎉 Tamamlandı!')
}

addServiceAreas()
  .catch((e) => {
    console.error('❌ Hata:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
