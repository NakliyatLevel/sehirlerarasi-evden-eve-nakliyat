import { prisma } from '@/lib/db'
import { getSiteSettings } from '@/lib/settings'
import { notFound } from 'next/navigation'
import { PageHeading } from '@/components/ui/page-heading'
import { CheckCircle, Phone, Mail, Clock, ArrowRight, Home, Building2, Package, ClipboardList, Plane, Truck } from 'lucide-react'
import Link from 'next/link'

const iconMap: Record<string, any> = {
  'evden-eve-nakliyat': Home,
  'ofis-tasimaciligi': Building2,
  'esya-depolama': Package,
  'paketleme-hizmeti': ClipboardList,
  'uluslararasi-nakliyat': Plane,
  'parca-esya-tasima': Truck,
}

async function getService(slug: string) {
  try {
    const service = await prisma.service.findFirst({
      where: { 
        slug,
        active: true 
      },
    })
    return service
  } catch (error) {
    return null
  }
}

async function getAllServices() {
  try {
    const services = await prisma.service.findMany({
      where: { active: true },
      orderBy: { order: 'asc' },
      take: 6,
    })
    return services
  } catch (error) {
    return []
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = await getService(slug)
  
  if (!service) {
    return {
      title: 'Hizmet Bulunamadı',
    }
  }

  return {
    title: `${service.name} | Hizmetlerimiz`,
    description: service.description || `${service.name} hizmeti hakkında detaylı bilgi`,
  }
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const service = await getService(slug)
  const settings = await getSiteSettings()
  const allServices = await getAllServices()

  if (!service) {
    notFound()
  }

  const defaultBenefits = [
    'Profesyonel ve deneyimli ekip',
    'Sigortalı taşımacılık hizmeti',
    'Modern araç filosu',
    'Uygun fiyat garantisi',
    '7/24 müşteri desteği',
    'Zamanında teslimat',
  ]
  const benefits = service.benefits
    ? service.benefits.split('\n').map(b => b.trim()).filter(Boolean)
    : defaultBenefits

  return (
    <>
      <PageHeading
        title={service.name}
        description={service.description || ''}
        breadcrumbs={[
          { label: 'Hizmetlerimiz', href: '/hizmetlerimiz' },
          { label: service.name },
        ]}
      />

      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Ana İçerik */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hizmet Kartı */}
            <div className="bg-white rounded-lg border border-gray-200 p-8">
              <div className="flex items-start gap-6 mb-8">
                <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                  {(() => {
                    const Icon = iconMap[service.slug] || Home
                    return <Icon className="w-10 h-10 text-primary" />
                  })()}
                </div>
                <div>
                  <h2 className="text-3xl font-bold mb-3">{service.name}</h2>
                  <p className="text-muted-foreground text-lg">
                    {service.description}
                  </p>
                </div>
              </div>

              {service.content ? (
                <div
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: service.content }}
                />
              ) : (
                <div className="prose max-w-none">
                  <h3>Hizmet Detayları</h3>
                  <p>
                    {service.name} hizmetimiz, taşınma sürecinizde ihtiyacınız olan tüm
                    profesyonel desteği sağlar. Deneyimli ekibimiz ve modern ekipmanlarımızla
                    eşyalarınızı güvenle taşıyoruz.
                  </p>
                  <h3>Hizmet Kapsamı</h3>
                  <ul>
                    <li>Ücretsiz keşif ve fiyat teklifi</li>
                    <li>Profesyonel paketleme hizmeti</li>
                    <li>Güvenli taşıma ve yükleme</li>
                    <li>Sigortalı nakliyat</li>
                    <li>Montaj ve yerleştirme</li>
                    <li>Temizlik hizmeti (opsiyonel)</li>
                  </ul>
                  <h3>Neden Bu Hizmeti Seçmelisiniz?</h3>
                  <p>
                    Yılların deneyimi ve binlerce başarılı taşınma ile kazandığımız uzmanlık,
                    size en kaliteli hizmeti sunmamızı sağlıyor. Müşteri memnuniyeti odaklı
                    çalışma prensibimizle her zaman yanınızdayız.
                  </p>
                </div>
              )}
            </div>

            {/* Avantajlar */}
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6">Hizmet Avantajları</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* İletişim Kartı */}
            <div className="bg-primary text-white rounded-2xl p-6 sticky top-6">
              <h3 className="text-xl font-bold mb-4">Hemen Teklif Alın</h3>
              <p className="text-primary-foreground/90 mb-6 text-sm">
                {service.name} hizmeti için ücretsiz fiyat teklifi alın
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

            {/* Diğer Hizmetler */}
            {allServices.length > 1 && (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-bold mb-4">Diğer Hizmetlerimiz</h3>
                <div className="space-y-3">
                  {allServices
                    .filter((s) => s.slug !== service.slug)
                    .slice(0, 5)
                    .map((s) => (
                      <Link
                        key={s.id}
                        href={`/hizmet/${s.slug}`}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition group"
                      >
                        <span className="text-sm font-medium">{s.name}</span>
                        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                      </Link>
                    ))}
                </div>
                <Link
                  href="/hizmetlerimiz"
                  className="block text-center text-sm text-primary hover:underline mt-4"
                >
                  Tüm hizmetleri görüntüle →
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
