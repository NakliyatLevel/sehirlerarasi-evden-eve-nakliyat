import { getSiteSettings } from '@/lib/settings'
import { Metadata } from 'next'
import { PageHeading } from '@/components/ui/page-heading'
import Link from 'next/link'
import { Home, Building2, Package, Archive, Landmark, ArrowRight } from 'lucide-react'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  
  return {
    title: `Hizmetlerimiz | ${settings.site_title}`,
    description: 'Bireysel ve kurumsal taşımacılık hizmetlerimiz hakkında detaylı bilgi edinin.',
  }
}

const services = {
  bireysel: [
    { name: 'Ev Taşıma', slug: 'ev-tasima', icon: Home },
    { name: 'Villa Taşımacılığı', slug: 'villa-tasimaciligi', icon: Home },
    { name: 'Yalı Taşımacılığı', slug: 'yali-tasimaciligi', icon: Home },
    { name: 'Parça Eşya Taşımacılığı', slug: 'parca-esya-tasimaciligi', icon: Package },
    { name: 'Şehir içi Evden Eve Nakliyat', slug: 'sehir-ici-nakliyat', icon: Home },
    { name: 'Şehirler Arası Evden Eve Nakliyat', slug: 'sehirler-arasi-nakliyat', icon: Home },
  ],
  kurumsal: [
    { name: 'Ofis Taşımacılığı', slug: 'ofis-tasimaciligi', icon: Building2 },
    { name: 'Kurumsal Taşımacılık', slug: 'kurumsal-tasimaciligi', icon: Building2 },
    { name: 'Fabrika Taşımacılığı', slug: 'fabrika-tasimaciligi', icon: Building2 },
    { name: 'Banka Taşımacılığı', slug: 'banka-tasimaciligi', icon: Landmark },
    { name: 'Fuar Taşımacılığı', slug: 'fuar-tasimaciligi', icon: Building2 },
    { name: 'Hastane Taşımacılığı', slug: 'hastane-tasimaciligi', icon: Building2 },
    { name: 'Konsolosluk Taşımacılığı', slug: 'konsolosluk-tasimaciligi', icon: Building2 },
    { name: 'Üniversite Taşımacılığı', slug: 'universite-tasimaciligi', icon: Building2 },
  ],
  diger: [
    { name: 'Arşiv Taşımacılığı', slug: 'arsiv-tasimaciligi', icon: Archive },
    { name: 'Müze Taşımacılığı', slug: 'muze-tasimaciligi', icon: Archive },
    { name: 'Bankamatik Taşımacılığı', slug: 'bankamatik-tasimaciligi', icon: Landmark },
    { name: 'Para Kasası Taşımacılığı', slug: 'para-kasasi-tasimaciligi', icon: Landmark },
  ],
}

export default async function HizmetlerimizPage() {
  const settings = await getSiteSettings()

  return (
    <div className="min-h-screen">
      <PageHeading
        title="Hizmetlerimiz"
        description={settings.page_desc_hizmetlerimiz || 'Bireysel ve kurumsal taşımacılık ihtiyaçlarınız için profesyonel çözümler sunuyoruz.'}
        breadcrumbs={[{ label: 'Hizmetlerimiz' }]}
      />

      {/* Bireysel Taşımacılık */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-foreground">Bireysel Taşımacılık</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Ev, villa ve yalı taşımacılığından parça eşya taşımaya kadar tüm bireysel ihtiyaçlarınız için hizmetinizdeyiz.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.bireysel.map((service) => (
              <Link
                key={service.slug}
                href={`/hizmet/${service.slug}`}
                className="group bg-white border border-border rounded-lg p-6 hover:border-primary hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition">
                      {service.name}
                    </h3>
                    <div className="flex items-center text-primary text-sm font-medium">
                      <span>Detaylı Bilgi</span>
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Kurumsal Taşımacılık */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-foreground">Kurumsal Taşımacılık</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Ofis, fabrika, banka ve diğer kurumsal taşımacılık ihtiyaçlarınız için özel çözümler sunuyoruz.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.kurumsal.map((service) => (
              <Link
                key={service.slug}
                href={`/hizmet/${service.slug}`}
                className="group bg-white border border-border rounded-lg p-6 hover:border-primary hover:shadow-lg transition-all"
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition">
                    <service.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-base mb-2 group-hover:text-primary transition">
                    {service.name}
                  </h3>
                  <div className="flex items-center justify-center text-primary text-sm font-medium">
                    <span>Detaylı Bilgi</span>
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Diğer Hizmetler */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-foreground">Diğer Hizmetler</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Özel taşımacılık ihtiyaçlarınız için uzman ekibimiz ve özel ekipmanlarımız ile hizmetinizdeyiz.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.diger.map((service) => (
              <Link
                key={service.slug}
                href={`/hizmet/${service.slug}`}
                className="group bg-white border border-border rounded-lg p-6 hover:border-primary hover:shadow-lg transition-all"
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition">
                    <service.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-base mb-2 group-hover:text-primary transition">
                    {service.name}
                  </h3>
                  <div className="flex items-center justify-center text-primary text-sm font-medium">
                    <span>Detaylı Bilgi</span>
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <h2 className="text-3xl font-bold mb-4">Size Özel Çözümler Sunuyoruz</h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            İhtiyacınıza özel paket ve hizmetler için bizimle iletişime geçin. Uzman ekibimiz size en uygun çözümü sunmak için hazır.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/teklif-al"
              className="px-8 py-4 bg-secondary text-white rounded-lg font-semibold hover:bg-secondary/90 transition"
            >
              Ücretsiz Teklif Al
            </Link>
            <a
              href={`tel:${settings.phone}`}
              className="px-8 py-4 bg-white text-primary rounded-lg font-semibold hover:bg-white/90 transition"
            >
              {settings.phone || '444 65 02'}
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
