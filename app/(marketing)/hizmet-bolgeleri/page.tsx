import { prisma } from '@/lib/db'
import { getSiteSettings } from '@/lib/settings'
import { PageHeading } from '@/components/ui/page-heading'
import { MapPin, CheckCircle } from 'lucide-react'

async function getServiceAreas() {
  try {
    const areas = await prisma.serviceArea.findMany({
      where: { active: true },
      orderBy: { order: 'asc' },
    })
    return areas
  } catch (error) {
    return []
  }
}

export const metadata = {
  title: 'Hizmet Bölgeleri',
  description: 'Evden eve nakliyat hizmeti verdiğimiz şehirler ve bölgeler',
}

export default async function ServiceAreasPage() {
  const [areas, settings] = await Promise.all([getServiceAreas(), getSiteSettings()])

  return (
    <>
      <PageHeading
        title="Hizmet Bölgeleri"
        description={settings.page_desc_hizmet_bolgeleri || "Türkiye'nin birçok şehrinde profesyonel evden eve nakliyat hizmeti sunuyoruz"}
        breadcrumbs={[{ label: 'Hizmet Bölgeleri' }]}
      />

      <div className="container mx-auto px-4 py-16 max-w-7xl">
        {areas.length === 0 ? (
          <p className="text-center text-muted-foreground py-12">
            Henüz hizmet bölgesi eklenmemiş
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {areas.map((area) => (
              <a
                key={area.id}
                href={`/bolge/${area.slug}`}
                className="bg-white rounded-lg border border-gray-200 p-6 hover:border-primary/50 hover:shadow-xl transition group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold flex items-center gap-2 group-hover:text-primary transition">
                      {area.city}
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </h3>
                    <span className="text-primary text-sm inline-block group-hover:underline">
                      Detayları Gör →
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}

        <div className="mt-12 bg-primary/5 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-semibold mb-4">
            Listelenmemiş bir bölgeye mi taşınıyorsunuz?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Hizmet verdiğimiz bölgeler sürekli genişlemektedir. Bölgeniz listede yoksa,
            bizimle iletişime geçin ve size özel çözümler sunalım.
          </p>
          <a
            href="/iletisim"
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition"
          >
            Bize Ulaşın
          </a>
        </div>
      </div>
    </>
  )
}
