import { prisma } from '@/lib/db'
import { getSiteSettings } from '@/lib/settings'
import Image from 'next/image'
import { PageHeading } from '@/components/ui/page-heading'

async function getGallery() {
  return await prisma.gallery.findMany({
    where: { active: true },
    orderBy: { order: 'asc' },
  })
}

export default async function GalleryPage() {
  const [items, settings] = await Promise.all([getGallery(), getSiteSettings()])

  return (
    <div className="min-h-screen">
      <PageHeading
        title="Galeri"
        description={settings.page_desc_galeri || 'Profesyonel nakliyat hizmetlerimizden görüntüler'}
        breadcrumbs={[{ label: 'Galeri' }]}
      />
      
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        
        {items.length === 0 ? (
          <p className="text-muted-foreground text-center py-12">Henüz galeri görseli yok</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map((item) => (
              <div key={item.id} className="group relative h-64 rounded-lg overflow-hidden border border-gray-200">
                <Image
                  src={item.image || '/placeholder-logo.svg'}
                  alt={item.title}
                  fill
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
        )}
      </div>
    </div>
  )
}
