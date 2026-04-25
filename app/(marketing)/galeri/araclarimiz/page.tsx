import { prisma } from '@/lib/db'
import { getSiteSettings } from '@/lib/settings'
import { Metadata } from 'next'
import { PageHeading } from '@/components/ui/page-heading'
import GalleryGrid from '@/components/gallery/GalleryGrid'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  
  return {
    title: `Araçlarımız | ${settings.site_title}`,
    description: 'Modern ve güvenli araç filomuz.',
  }
}

async function getVehicleGallery() {
  try {
    const gallery = await prisma.gallery.findMany({
      where: { 
        active: true,
        category: 'vehicles'
      },
      orderBy: { order: 'asc' },
    })
    return gallery
  } catch (error) {
    return []
  }
}

export default async function AraclarimizPage() {
  const settings = await getSiteSettings()
  const gallery = await getVehicleGallery()

  return (
    <div className="min-h-screen">
      <PageHeading
        title="Araçlarımız"
        description="Modern ve güvenli araç filomuz ile hizmetinizdeyiz"
        breadcrumbs={[
          { label: 'Galeri', href: '/galeri/videolar' },
          { label: 'Araçlarımız' }
        ]}
      />

      <div className="container mx-auto px-4 py-16 max-w-7xl">
        {gallery.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Henüz araç görseli eklenmemiş</p>
          </div>
        ) : (
          <GalleryGrid items={gallery} />
        )}
      </div>
    </div>
  )
}
