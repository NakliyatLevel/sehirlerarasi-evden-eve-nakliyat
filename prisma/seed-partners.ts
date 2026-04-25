import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Eski referanslar siliniyor...')
  await prisma.partner.deleteMany()
  console.log('Silindi. Yeni referanslar ekleniyor...')

  const partners = [
    { name: 'Beymen',                                    logo: '/referanslar/Beymen.webp' },
    { name: 'Bilkom',                                    logo: '/referanslar/Bilkom.webp' },
    { name: 'Hitachi',                                   logo: '/referanslar/Hitachi.webp' },
    { name: 'Honeywell',                                 logo: '/referanslar/Honeywell.webp' },
    { name: 'Kığılı',                                    logo: '/referanslar/Kiğılı.webp' },
    { name: 'Lely',                                      logo: '/referanslar/Lely.webp' },
    { name: 'Baosteel',                                  logo: '/referanslar/baosteel.webp' },
    { name: 'BDDK',                                      logo: '/referanslar/bddk.webp' },
    { name: 'Borusan',                                   logo: '/referanslar/borusan.webp' },
    { name: 'Bunge',                                     logo: '/referanslar/bunge.webp' },
    { name: 'China Shipping',                            logo: '/referanslar/china-shipping.webp' },
    { name: 'Çırağan Palace Kempinski',                  logo: '/referanslar/ciragan-palace-kempinski.webp' },
    { name: 'COSCO Shipping',                            logo: '/referanslar/cosco-shipping.webp' },
    { name: 'Croda',                                     logo: '/referanslar/croda.webp' },
    { name: 'Damco',                                     logo: '/referanslar/damco.webp' },
    { name: 'Dedeman',                                   logo: '/referanslar/dedeman.webp' },
    { name: 'Diageo',                                    logo: '/referanslar/diageo.webp' },
    { name: 'Doğuş',                                     logo: '/referanslar/dogus.webp' },
    { name: 'Döhler',                                    logo: '/referanslar/dohler.webp' },
    { name: 'Enerjisa',                                  logo: '/referanslar/enerjisa.webp' },
    { name: 'Groupama',                                  logo: '/referanslar/groupama.webp' },
    { name: 'Haribo',                                    logo: '/referanslar/haribo.webp' },
    { name: 'Huawei',                                    logo: '/referanslar/huawei.webp' },
    { name: 'IBM',                                       logo: '/referanslar/ibm.webp' },
    { name: 'Ingenico',                                  logo: '/referanslar/ingenico.webp' },
    { name: 'ISS',                                       logo: '/referanslar/iss.webp' },
    { name: 'İstanbul Şehir Üniversitesi',               logo: '/referanslar/istanbul-sehir-universitesi.webp' },
    { name: 'Jungheinrich',                              logo: '/referanslar/jungheinrich.webp' },
    { name: 'Klépierre',                                 logo: '/referanslar/klepierre.webp' },
    { name: 'Maersk',                                    logo: '/referanslar/maersk.webp' },
    { name: 'Media Markt',                               logo: '/referanslar/media-markt.webp' },
    { name: 'Mercedes-Benz',                             logo: '/referanslar/mercedes-benz.webp' },
    { name: 'Mimar Sinan Güzel Sanatlar Üniversitesi',   logo: '/referanslar/mimar-sinan-güzel-sanatlar-universitesi.webp' },
    { name: 'NGN',                                       logo: '/referanslar/ngn.webp' },
    { name: 'Nobel',                                     logo: '/referanslar/nobel.webp' },
    { name: 'Novartis',                                  logo: '/referanslar/novartis.webp' },
    { name: 'Opet',                                      logo: '/referanslar/opet.webp' },
    { name: 'Parker',                                    logo: '/referanslar/parker.webp' },
    { name: 'Paycore',                                   logo: '/referanslar/paycore.webp' },
    { name: 'PwC',                                       logo: '/referanslar/pwc.webp' },
    { name: 'Qatar Airways',                             logo: '/referanslar/qatar.webp' },
    { name: 'Saat & Saat',                               logo: '/referanslar/saat-saat.webp' },
    { name: 'Sandoz',                                    logo: '/referanslar/sandoz.webp' },
    { name: 'Seba İnşaat',                               logo: '/referanslar/seba-insaat.webp' },
    { name: 'Skechers',                                  logo: '/referanslar/skechers.webp' },
    { name: 'Sodexo',                                    logo: '/referanslar/sodexo.webp' },
    { name: 'Tekfen',                                    logo: '/referanslar/tekfen.webp' },
    { name: 'Trendyol',                                  logo: '/referanslar/trendyol.webp' },
    { name: 'Trumpf',                                    logo: '/referanslar/trumpf.webp' },
    { name: 'Türev',                                     logo: '/referanslar/turev.webp' },
    { name: 'T.C. Cumhurbaşkanlığı',                    logo: '/referanslar/turkiye-cumhuriyeti-cumhurbaskanligi.webp' },
    { name: 'Türkiye Petrolleri',                        logo: '/referanslar/turkiye-petrolleri.webp' },
  ]

  for (let i = 0; i < partners.length; i++) {
    await prisma.partner.create({
      data: {
        name: partners[i].name,
        logo: partners[i].logo,
        website: null,
        order: i + 1,
        active: true,
      },
    })
    console.log(`✓ ${partners[i].name}`)
  }

  console.log(`\nToplam ${partners.length} referans eklendi!`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
