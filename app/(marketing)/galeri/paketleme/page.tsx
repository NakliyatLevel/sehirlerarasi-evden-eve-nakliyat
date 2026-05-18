import { prisma } from '@/lib/db'
import { getSiteSettings } from '@/lib/settings'
import { Metadata } from 'next'
import { PageHeading } from '@/components/ui/page-heading'
import GalleryGrid from '@/components/gallery/GalleryGrid'

const fallbackPackagingGallery = [
  { id: 'fallback-packaging-1', title: 'Ofis Eşyası Ambalaj', image: '/uploads/ofis-esyasi-ambalaj.webp' },
  { id: 'fallback-packaging-2', title: 'Ofis Eşyası Paketleme', image: '/uploads/ofis-esyasi-paketleme.webp' },
  { id: 'fallback-packaging-3', title: 'Eşya Taşıma Paketleme', image: '/uploads/esya-tasima.webp' },
  { id: 'fallback-packaging-4', title: 'Eşya Paketleme', image: '/uploads/esya-paketleme.webp' },
  { id: 'fallback-packaging-5', title: 'Eşya Ambalaj', image: '/uploads/esya-ambalaj.webp' },
  { id: 'fallback-packaging-6', title: 'Profesyonel Paketleme', image: '/uploads/paketleme.webp' },
  { id: 'fallback-packaging-7', title: 'Şehirlerarası Eşya Paketleme', image: '/uploads/sehirlerarasi-esya-paketleme.webp' },
  { id: 'fallback-packaging-8', title: 'Ofis Nakliyat Paketleme', image: '/uploads/ofis-nakliyat-paketleme.webp' },
]

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
        category: 'packaging',
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

export default async function PaketlemePage() {
  const settings = await getSiteSettings()
  const gallery = await getPackagingGallery()

  return (
    <div className="min-h-screen">
      <PageHeading
        title="Paketleme"
        description="Profesyonel paketleme teknikleri ve malzemelerimiz"
        breadcrumbs={[
          { label: 'Galeri', href: '/galeri' },
          { label: 'Paketleme' }
        ]}
      />

      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <GalleryGrid items={gallery.length > 0 ? gallery : fallbackPackagingGallery} />
      </div>
    </div>
  )
}
