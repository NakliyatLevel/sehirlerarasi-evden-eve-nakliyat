import { prisma } from '@/lib/db'
import { getSiteSettings } from '@/lib/settings'
import { PageHeading } from '@/components/ui/page-heading'
import Image from 'next/image'
import { Building2 } from 'lucide-react'

async function getPartners() {
  try {
    const partners = await prisma.partner.findMany({
      where: { active: true },
      orderBy: { order: 'asc' },
    })
    return partners
  } catch (error) {
    return []
  }
}

export const metadata = {
  title: 'Referanslarımız',
  description: 'Güvenle çalıştığımız kurumlar ve mutlu müşterilerimiz',
}

export default async function PartnersPage() {
  const [partners, settings] = await Promise.all([getPartners(), getSiteSettings()])

  return (
    <>
      <PageHeading
        title="Referanslarımız"
        description={settings.page_desc_referanslar || 'Yılların deneyimi ve güvenle çalıştığımız kurumlar'}
        breadcrumbs={[{ label: 'Referanslar' }]}
      />

      <div className="container mx-auto px-4 py-16 max-w-7xl">
        {partners.length === 0 ? (
          <div className="text-center py-16">
            <Building2 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Henüz referans eklenmemiş</p>
          </div>
        ) : (
          <>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Güvenle Çalıştığımız Kurumlar</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Birçok kurumsal firma ve bireysel müşterimiz bizimle çalışmayı tercih ediyor.
                Güven ve kalite odaklı hizmet anlayışımızla sektörde fark yaratıyoruz.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
              {partners.map((partner) => (
                <div
                  key={partner.id}
                  className="group bg-white rounded-lg border border-gray-200 p-6 hover:border-primary/30 hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative aspect-[4/3] flex items-center justify-center">
                    {partner.logo ? (
                      <div className="relative w-full h-full">
                        <Image
                          src={partner.logo}
                          alt={partner.name}
                          fill
                          className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                        />
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center text-center">
                        <Building2 className="w-12 h-12 text-muted-foreground mb-2" />
                        <span className="text-sm font-medium text-muted-foreground">
                          {partner.name}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* CTA Bölümü */}
        <div className="mt-16 bg-gradient-to-r from-primary to-primary/90 rounded-2xl p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">
            Siz de Referanslarımıza Katılın
          </h3>
          <p className="text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Profesyonel ekibimiz ve kaliteli hizmet anlayışımızla taşınma sürecinizi
            kolaylaştırıyoruz. Hemen teklif alın, farkı yaşayın.
          </p>
          <a
            href="/iletisim"
            className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-white/90 transition text-lg"
          >
            Ücretsiz Teklif Alın
          </a>
        </div>
      </div>
    </>
  )
}
