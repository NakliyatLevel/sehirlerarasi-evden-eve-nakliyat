import { prisma } from '@/lib/db'

async function main() {
  console.log('Tüm hizmet bölgeleri siliniyor...')

  const deleted = await prisma.serviceArea.deleteMany({})
  
  console.log(`✓ ${deleted.count} hizmet bölgesi silindi`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
