import { getSiteSettings } from '@/lib/settings'
import { Metadata } from 'next'
import { PageHeading } from '@/components/ui/page-heading'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  
  return {
    title: `Videolar | ${settings.site_title}`,
    description: 'Nakliyat hizmetlerimizle ilgili videolarımızı izleyin.',
  }
}

// Örnek video URL'leri - Admin panelden yönetilebilir hale getirilebilir
const videos = [
  {
    id: '1',
    title: 'Profesyonel Ev Taşıma Hizmeti',
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    description: 'Ev taşıma sürecimizi detaylı olarak izleyin'
  },
  {
    id: '2',
    title: 'Ofis Taşımacılığı',
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    description: 'Kurumsal taşımacılık hizmetlerimiz'
  },
  {
    id: '3',
    title: 'Paketleme Teknikleri',
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    description: 'Eşyalarınızı nasıl paketliyoruz?'
  },
]

export default async function VideolarPage() {
  const settings = await getSiteSettings()

  return (
    <div className="min-h-screen">
      <PageHeading
        title="Videolar"
        description="Nakliyat hizmetlerimizle ilgili videolarımızı izleyin"
        breadcrumbs={[
          { label: 'Galeri', href: '/galeri/videolar' },
          { label: 'Videolar' }
        ]}
      />

      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video) => (
            <div key={video.id} className="bg-white rounded-lg border border-border overflow-hidden hover:shadow-lg transition">
              <div className="relative aspect-video">
                <iframe
                  src={video.url}
                  title={video.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{video.title}</h3>
                <p className="text-muted-foreground text-sm">{video.description}</p>
              </div>
            </div>
          ))}
        </div>

        {videos.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Henüz video eklenmemiş</p>
          </div>
        )}
      </div>
    </div>
  )
}
