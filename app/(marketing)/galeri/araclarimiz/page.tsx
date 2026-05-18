import { prisma } from '@/lib/db'
import { getSiteSettings } from '@/lib/settings'
import { Metadata } from 'next'
import { PageHeading } from '@/components/ui/page-heading'
import GalleryGrid from '@/components/gallery/GalleryGrid'

const fallbackVehicleGallery = [
  { id: 'fallback-vehicle-1', title: 'Nakliyat Aracı', image: '/uploads/nakliyat-araci.webp' },
  { id: 'fallback-vehicle-2', title: 'Araçlarımız', image: '/uploads/araclarimiz.webp' },
]

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
        category: 'vehicles',
        image: {
          startsWith: '/uploads/'
        }
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
          { label: 'Galeri', href: '/galeri' },
          { label: 'Araçlarımız' }
        ]}
      />

      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <GalleryGrid items={gallery.length > 0 ? gallery : fallbackVehicleGallery} />
      </div>
    </div>
  )
}
