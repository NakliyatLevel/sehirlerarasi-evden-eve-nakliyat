import { prisma } from '@/lib/db'
import { getSiteSettings } from '@/lib/settings'
import { Metadata } from 'next'
import { PageHeading } from '@/components/ui/page-heading'
import GalleryGrid from '@/components/gallery/GalleryGrid'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  
  return {
    title: `Paketleme | ${settings.site_title}`,
    description: 'Profesyonel paketleme hizmetlerimiz.',
  }
}

async function getPackagingGallery() {
  try {
    const gallery = await prisma.gallery.findMany({
      where: { 
        active: true,
        category: 'packaging'
      },
      orderBy: { order: 'asc' },
    })
    return gallery
  } catch (error) {
    return []
  }
}

export default async function PaketlemePage() {
  const settings = await getSiteSettings()
  const gallery = await getPackagingGallery()

  return (
    <div className="min-h-screen">
      <PageHeading
        title="Paketleme"
        description="Profesyonel paketleme teknikleri ve malzemelerimiz"
        breadcrumbs={[
          { label: 'Galeri', href: '/galeri/videolar' },
          { label: 'Paketleme' }
        ]}
      />

      <div className="container mx-auto px-4 py-16 max-w-7xl">
        {gallery.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Henüz paketleme görseli eklenmemiş</p>
          </div>
        ) : (
          <GalleryGrid items={gallery} />
        )}
      </div>
    </div>
  )
}
