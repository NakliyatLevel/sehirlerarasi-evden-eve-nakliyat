import { prisma } from '@/lib/db'
import fs from 'fs'
import path from 'path'

async function main() {
  console.log('HTML dosyaları veritabanına aktarılıyor...')

  const hbDir = path.join(process.cwd(), 'hb')
  const files = fs.readdirSync(hbDir).filter((f) => f.endsWith('.html'))

  let count = 0

  for (const file of files) {
    const filePath = path.join(hbDir, file)
    const htmlContent = fs.readFileSync(filePath, 'utf-8')

    // HTML'den başlık ve açıklamayı çıkar
    const titleMatch = htmlContent.match(/<h1[^>]*>([^<]+)<\/h1>/)
    const title = titleMatch ? titleMatch[1].trim() : file.replace('.html', '')

    // Slug oluştur (dosya adından)
    const slug = file
      .replace('.html', '')
      .replace(/İ/g, 'i')
      .replace(/I/g, 'i')
      .replace(/Ğ/g, 'g')
      .replace(/Ü/g, 'u')
      .replace(/Ş/g, 's')
      .replace(/Ö/g, 'o')
      .replace(/Ç/g, 'c')
      .toLowerCase()
      .replace(/i̇/g, 'i')
      .replace(/ı/g, 'i')
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ş/g, 's')
      .replace(/ö/g, 'o')
      .replace(/ç/g, 'c')
      .replace(/[^a-z0-9-]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')

    // Meta açıklamayı çıkar
    const metaMatch = htmlContent.match(/<meta name="description" content="([^"]+)"/)
    const metaDescription = metaMatch ? metaMatch[1] : ''

    // İçeriği çıkar (body içeriği)
    let bodyMatch = htmlContent.match(/<body[^>]*>([\s\S]*?)<\/body>/)
    let content = bodyMatch ? bodyMatch[1].trim() : htmlContent

    // Meta bilgilerini (Odak Anahtar Kelime / Meta Açıklama) kaldır
    content = content.replace(/<div class="meta">[\s\S]*?<\/div>/gi, '')

    // İçerik içindeki ilk H1'i kaldır (sayfa başlığında zaten gösteriliyor)
    content = content.replace(/<h1[^>]*>[\s\S]*?<\/h1>/i, '')
    
    // H1 başlığında tekrarı kaldır (örn: "Evden Eve Nakliyat Evden Eve Nakliyat" → "Evden Eve Nakliyat")
    content = content.replace(
      /<h1[^>]*>([^<]*?)Evden Eve Nakliyat\s+Evden Eve Nakliyat<\/h1>/g,
      '<h1>$1Evden Eve Nakliyat</h1>'
    )

    try {
      await prisma.serviceArea.upsert({
        where: { slug },
        update: {
          city: title,
          description: metaDescription.substring(0, 200),
          content,
          metaDescription,
        },
        create: {
          city: title,
          slug,
          description: metaDescription.substring(0, 200),
          content,
          metaDescription,
          active: true,
          order: count,
        },
      })

      console.log(`✓ ${title} (${slug}) eklendi`)
      count++
    } catch (error) {
      console.error(`✗ ${file} işlenirken hata:`, error)
    }
  }

  console.log(`\n✓ Toplam ${count} hizmet bölgesi eklendi`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
