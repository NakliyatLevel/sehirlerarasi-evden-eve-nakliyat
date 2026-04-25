import { getSiteSettings } from '@/lib/settings'
import { ContactForm } from '@/components/forms/ContactForm'
import { PageHeading } from '@/components/ui/page-heading'
import { Phone, Mail, MapPin, MessageCircle, Facebook, Twitter, Instagram, Linkedin, Headset, PhoneCall, MessageSquare } from 'lucide-react'

export const metadata = {
  title: 'İletişim',
  description: 'Bizimle iletişime geçin. Ücretsiz keşif ve fiyat teklifi için hemen arayın.',
}

export default async function ContactPage() {
  const settings = await getSiteSettings()

  // Google Maps iframe'den src URL'ini parse et
  const getMapsSrc = (mapsData: string) => {
    if (!mapsData) return null
    // Eğer iframe tag'i varsa src'yi çıkar
    const srcMatch = mapsData.match(/src="([^"]*)"/)
    if (srcMatch) return srcMatch[1]
    // Eğer direkt URL ise olduğu gibi kullan
    if (mapsData.includes('google.com/maps')) return mapsData
    return null
  }

  const mapsSrc = getMapsSrc(settings.google_maps)

  return (
    <div className="min-h-screen bg-muted/30">
      <PageHeading
        title="İletişim"
        description={settings.page_desc_iletisim || 'Bizimle iletişime geçin, size yardımcı olmaktan mutluluk duyarız'}
        breadcrumbs={[{ label: 'İletişim' }]}
      />
      
      <div className="container mx-auto px-4 py-16 max-w-7xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div>
              <div className="bg-white p-8 rounded-lg border border-gray-200 h-full hover:border-primary/50 transition">
                <h2 className="text-2xl font-semibold mb-2">İletişim Bilgileri</h2>
                {settings.contact_info_description && (
                  <p className="text-muted-foreground text-sm mb-6">{settings.contact_info_description}</p>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {settings.phone && (
                    <div className="flex items-start gap-4 border border-gray-200 rounded-lg p-3 hover:border-primary/50 transition">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Headset className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex flex-col justify-center h-12">
                        <p className="font-semibold text-sm">Müşteri Hizmetleri</p>
                        <a href={`tel:${settings.phone}`} className="text-muted-foreground hover:text-primary transition text-sm">
                          {settings.phone}
                        </a>
                      </div>
                    </div>
                  )}

                  {settings.whatsapp && (
                    <div className="flex items-start gap-4 border border-gray-200 rounded-lg p-3 hover:border-primary/50 transition">
                      <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MessageCircle className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="flex flex-col justify-center h-12">
                        <p className="font-semibold text-sm">WhatsApp</p>
                        <a 
                          href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-green-600 transition text-sm"
                        >
                          {settings.whatsapp}
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  {settings.phone2 && (
                    <div className="flex items-start gap-4 border border-gray-200 rounded-lg p-3 hover:border-primary/50 transition">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <PhoneCall className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex flex-col justify-center h-12">
                        <p className="font-semibold text-sm">Avrupa Yakası</p>
                        <a href={`tel:${settings.phone2}`} className="text-muted-foreground hover:text-primary transition text-sm">
                          {settings.phone2}
                        </a>
                      </div>
                    </div>
                  )}

                  {settings.phone3 && (
                    <div className="flex items-start gap-4 border border-gray-200 rounded-lg p-3 hover:border-primary/50 transition">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <PhoneCall className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex flex-col justify-center h-12">
                        <p className="font-semibold text-sm">Anadolu Yakası</p>
                        <a href={`tel:${settings.phone3}`} className="text-muted-foreground hover:text-primary transition text-sm">
                          {settings.phone3}
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  {settings.email && (
                    <div className="flex items-start gap-4 border border-gray-200 rounded-lg p-3 hover:border-primary/50 transition">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Mail className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex flex-col justify-center h-12">
                        <p className="font-semibold text-sm">E-Posta</p>
                        <a href={`mailto:${settings.email}`} className="text-muted-foreground hover:text-primary transition break-all text-sm">
                          {settings.email}
                        </a>
                      </div>
                    </div>
                  )}

                  {settings.live_chat && (
                    <div className="flex items-start gap-4 border border-gray-200 rounded-lg p-3 hover:border-primary/50 transition">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MessageSquare className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex flex-col justify-center h-12">
                        <p className="font-semibold text-sm">Canlı Destek</p>
                        <a 
                          href={settings.live_chat}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition text-sm"
                        >
                          Sohbet Başlat
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-6 mt-6">
                  {settings.address && (
                    <div className="flex items-start gap-4 border border-gray-200 rounded-lg p-3 hover:border-primary/50 transition">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex flex-col justify-center h-12">
                        <p className="font-semibold text-sm">Adres</p>
                        <p className="text-muted-foreground text-sm">{settings.address}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div>
              <div className="bg-white p-8 rounded-lg border border-gray-200 hover:border-primary/50 transition">
                <h2 className="text-2xl font-semibold mb-2">İletişim Formu</h2>
                {settings.contact_form_description && (
                  <p className="text-muted-foreground text-sm mb-6">{settings.contact_form_description}</p>
                )}
                <ContactForm />
              </div>
            </div>
          </div>

          {mapsSrc && (
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="w-full h-[300px] md:h-[400px]">
                <iframe
                  src={mapsSrc}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Konum Haritası"
                />
              </div>
            </div>
          )}
      </div>
    </div>
  )
}
