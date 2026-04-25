import { prisma } from '@/lib/db'
import { notFound } from 'next/navigation'
import { PageHeading } from '@/components/ui/page-heading'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

async function getServiceArea(slug: string) {
  try {
    const area = await prisma.serviceArea.findFirst({
      where: { 
        slug,
        active: true 
      },
    })
    return area
  } catch (error) {
    return null
  }
}

async function getOtherAreas(currentSlug: string) {
  try {
    return await prisma.serviceArea.findMany({
      where: { active: true, NOT: { slug: currentSlug } },
      orderBy: { order: 'asc' },
      take: 7,
      select: { city: true, slug: true },
    })
  } catch {
    return []
  }
}

async function getSettings() {
  try {
    const settings = await prisma.siteSetting.findMany()
    return settings.reduce((acc, setting) => {
      acc[setting.key] = setting.value
      return acc
    }, {} as Record<string, string>)
  } catch (error) {
    return {}
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const area = await getServiceArea(slug)
  
  if (!area) {
    return {
      title: 'Bölge Bulunamadı',
    }
  }

  return {
    title: area.metaTitle || `${area.city} Evden Eve Nakliyat`,
    description: area.metaDescription || area.description || `${area.city} ve çevresinde profesyonel evden eve nakliyat hizmeti`,
  }
}

export default async function ServiceAreaDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const [area, settings, otherAreas] = await Promise.all([
    getServiceArea(slug),
    getSettings(),
    getOtherAreas(slug),
  ])

  if (!area) {
    notFound()
  }

  return (
    <>
      <PageHeading
        title={`${area.city} Evden Eve Nakliyat`}
        description={area.description || `${area.city} ve çevresinde profesyonel evden eve nakliyat hizmeti sunuyoruz`}
        breadcrumbs={[
          { label: 'Hizmet Bölgeleri', href: '/hizmet-bolgeleri' },
          { label: area.city },
        ]}
      />

      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Ana İçerik */}
          <div className="lg:col-span-2 space-y-8">
            {/* Görsel */}
            {area.image && (
              <div className="relative h-96 rounded-lg overflow-hidden">
                <Image
                  src={area.image}
                  alt={area.city}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <div className="bg-white rounded-lg border border-gray-200 p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-2">{area.city} Bölgesinde Hizmetlerimiz</h2>
                  {area.description && (
                    <p className="text-muted-foreground">
                      {area.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Dinamik İçerik */}
              {area.content ? (
                <div className="prose prose-lg max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: area.content }} />
                </div>
              ) : (
                <div className="prose max-w-none">
                  <h3>Neden Bizi Tercih Etmelisiniz?</h3>
                  <ul>
                    <li>Profesyonel ve deneyimli ekip</li>
                    <li>Sigortalı taşımacılık hizmeti</li>
                    <li>Modern araç filosu</li>
                    <li>Uygun fiyat garantisi</li>
                    <li>7/24 müşteri desteği</li>
                    <li>Zamanında teslimat</li>
                  </ul>

                  <h3>Hizmet Alanlarımız</h3>
                  <p>
                    {area.city} merkez ve tüm ilçelerinde evden eve nakliyat, ofis taşımacılığı, 
                    eşya depolama ve paketleme hizmetleri sunuyoruz. Deneyimli ekibimiz ve modern 
                    araç filomuz ile eşyalarınızı güvenle taşıyoruz.
                  </p>

                  <h3>Ücretsiz Keşif ve Fiyat Teklifi</h3>
                  <p>
                    {area.city} bölgesinde taşınma planınız için ücretsiz keşif hizmeti sunuyoruz. 
                    Uzman ekibimiz eşyalarınızı yerinde inceleyerek size en uygun fiyat teklifini 
                    hazırlıyor. Hemen bizimle iletişime geçin!
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* İletişim Kartı */}
            <div className="bg-primary text-white rounded-lg p-6 sticky top-6">
              <h3 className="text-xl font-bold mb-4">Hemen Teklif Alın</h3>
              <p className="text-primary-foreground/90 mb-6 text-sm">
                {area.city} bölgesinde taşınma planınız için ücretsiz fiyat teklifi alın
              </p>

              <div className="space-y-4">
                {settings.phone && (
                  <a
                    href={`tel:${settings.phone}`}
                    className="flex items-center gap-3 p-3 bg-white/10 rounded-lg hover:bg-white/20 transition"
                  >
                    <Phone className="w-5 h-5" />
                    <div>
                      <div className="text-xs text-primary-foreground/70">Telefon</div>
                      <div className="font-medium">{settings.phone}</div>
                    </div>
                  </a>
                )}

                {settings.email && (
                  <a
                    href={`mailto:${settings.email}`}
                    className="flex items-center gap-3 p-3 bg-white/10 rounded-lg hover:bg-white/20 transition"
                  >
                    <Mail className="w-5 h-5" />
                    <div>
                      <div className="text-xs text-primary-foreground/70">E-posta</div>
                      <div className="font-medium">{settings.email}</div>
                    </div>
                  </a>
                )}

                <div className="flex items-center gap-3 p-3 bg-white/10 rounded-lg">
                  <Clock className="w-5 h-5" />
                  <div>
                    <div className="text-xs text-primary-foreground/70">Çalışma Saatleri</div>
                    <div className="font-medium">7/24 Hizmet</div>
                  </div>
                </div>
              </div>

              <Link
                href="/iletisim"
                className="block w-full mt-6 bg-white text-primary text-center py-3 rounded-lg font-medium hover:bg-white/90 transition"
              >
                İletişim Formu
              </Link>
            </div>

            {/* Diğer Bölgeler */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-bold mb-4">Diğer Hizmet Bölgeleri</h3>
              {otherAreas.length > 0 && (
                <ul className="space-y-2 mb-4">
                  {otherAreas.map((other) => (
                    <li key={other.slug}>
                      <Link
                        href={`/bolge/${other.slug}`}
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition"
                      >
                        <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                        {other.city} Evden Eve Nakliyat
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
              <Link
                href="/hizmet-bolgeleri"
                className="text-primary hover:underline text-sm"
              >
                Tüm bölgeleri görüntüle →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
