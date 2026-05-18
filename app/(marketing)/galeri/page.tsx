import { prisma } from '@/lib/db'
import { getSiteSettings } from '@/lib/settings'
import Image from 'next/image'
import { PageHeading } from '@/components/ui/page-heading'

const fallbackGallery = [
  { id: 'fallback-vehicle-1', title: 'Nakliyat Aracı', image: '/uploads/nakliyat-araci.webp', description: '' },
  { id: 'fallback-vehicle-2', title: 'Araçlarımız', image: '/uploads/araclarimiz.webp', description: '' },
  { id: 'fallback-packaging-1', title: 'Ofis Eşyası Ambalaj', image: '/uploads/ofis-esyasi-ambalaj.webp', description: '' },
  { id: 'fallback-packaging-2', title: 'Ofis Eşyası Paketleme', image: '/uploads/ofis-esyasi-paketleme.webp', description: '' },
  { id: 'fallback-packaging-3', title: 'Eşya Taşıma', image: '/uploads/esya-tasima.webp', description: '' },
  { id: 'fallback-packaging-4', title: 'Eşya Paketleme', image: '/uploads/esya-paketleme.webp', description: '' },
  { id: 'fallback-packaging-5', title: 'Eşya Ambalaj', image: '/uploads/esya-ambalaj.webp', description: '' },
  { id: 'fallback-packaging-6', title: 'Profesyonel Paketleme', image: '/uploads/paketleme.webp', description: '' },
  { id: 'fallback-packaging-7', title: 'Şehirlerarası Eşya Paketleme', image: '/uploads/sehirlerarasi-esya-paketleme.webp', description: '' },
  { id: 'fallback-packaging-8', title: 'Ofis Nakliyat Paketleme', image: '/uploads/ofis-nakliyat-paketleme.webp', description: '' },
]

async function getGallery() {
  return await prisma.gallery.findMany({
    where: {
      active: true,
      image: {
        startsWith: '/uploads/'
      }
    },
    orderBy: { order: 'asc' },
  })
}

export default async function GalleryPage() {
  const [items, settings] = await Promise.all([getGallery(), getSiteSettings()])
  const galleryItems = items.length > 0 ? items : fallbackGallery

  return (
    <div className="min-h-screen">
      <PageHeading
        title="Galeri"
        description={settings.page_desc_galeri || 'Profesyonel nakliyat hizmetlerimizden görüntüler'}
        breadcrumbs={[{ label: 'Galeri' }]}
      />
      
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryItems.map((item) => (
            <div key={item.id} className="group relative h-64 rounded-lg overflow-hidden border border-gray-200">
              <Image
                src={item.image || '/placeholder-logo.svg'}
                alt={item.title}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                className="object-cover group-hover:scale-110 transition duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition">
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="font-semibold">{item.title}</h3>
                  {item.description && (
                    <p className="text-sm text-white/90">{item.description}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
