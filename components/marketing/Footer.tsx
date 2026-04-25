import Link from 'next/link'
import { getSiteSettings } from '@/lib/settings'
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, MessageCircle } from 'lucide-react'

export default async function Footer() {
  const settings = await getSiteSettings()

  return (
    <footer className="bg-foreground text-white">
      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">

          {/* Marka kolonu - 2 kolon genişlik */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold mb-3 text-white">
              {settings.company_name || settings.site_title || 'Evden Eve Nakliyat'}
            </h3>
            <p className="text-white/70 mb-5 text-sm leading-relaxed">
              {settings.footer_description || settings.seo_description || 'Profesyonel evden eve nakliyat hizmetleri'}
            </p>
            <div className="flex items-center gap-3">
              {settings.facebook && (
                <a href={settings.facebook} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 hover:bg-secondary flex items-center justify-center transition">
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {settings.instagram && (
                <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 hover:bg-secondary flex items-center justify-center transition">
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {settings.twitter && (
                <a href={settings.twitter} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 hover:bg-secondary flex items-center justify-center transition">
                  <Twitter className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Kurumsal */}
          <div>
            <h4 className="font-semibold mb-4 text-white text-sm uppercase tracking-wider">Kurumsal</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Hakkımızda', href: '/hakkimizda' },
                { label: 'Hizmet Bölgeleri', href: '/hizmet-bolgeleri' },
                { label: 'Referanslarımız', href: '/referanslar' },
                { label: 'Blog', href: '/blog' },
                { label: 'İletişim', href: '/iletisim' },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-white/70 hover:text-white text-sm transition">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hizmetlerimiz */}
          <div>
            <h4 className="font-semibold mb-4 text-white text-sm uppercase tracking-wider">Hizmetlerimiz</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Ev Taşıma', href: '/hizmet/ev-tasima' },
                { label: 'Villa Taşımacılığı', href: '/hizmet/villa-tasimaciligi' },
                { label: 'Parça Eşya Taşımacılığı', href: '/hizmet/parca-esya-tasimaciligi' },
                { label: 'Şehir içi Nakliyat', href: '/hizmet/sehir-ici-nakliyat' },
                { label: 'Şehirler Arası Nakliyat', href: '/hizmet/sehirlerarasi-nakliyat' },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-white/70 hover:text-white text-sm transition">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Çözümlerimiz */}
          <div>
            <h4 className="font-semibold mb-4 text-white text-sm uppercase tracking-wider">Çözümlerimiz</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Ücretsiz Ekspertiz', href: '/cozum/ucretsiz-ekspertiz' },
                { label: 'Sözleşmeli Nakliyat', href: '/cozum/sozlesmeli-nakliyat' },
                { label: 'Sigortalı Nakliyat', href: '/cozum/sigortali-nakliyat' },
                { label: 'Asansörlü Nakliyat', href: '/cozum/asansorlu-nakliyat' },
                { label: 'Ambalaj ve Paketleme', href: '/cozum/ambalaj-paketleme' },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-white/70 hover:text-white text-sm transition">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* İletişim */}
          <div>
            <h4 className="font-semibold mb-4 text-white text-sm uppercase tracking-wider">İletişim</h4>
            <ul className="space-y-3">
              {settings.phone && (
                <li>
                  <a href={`tel:${settings.phone}`} className="flex items-center gap-2 text-white/70 hover:text-white text-sm transition">
                    <Phone className="w-4 h-4 flex-shrink-0" />
                    {settings.phone}
                  </a>
                </li>
              )}
              {settings.whatsapp && (
                <li>
                  <a href={`https://wa.me/${settings.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/70 hover:text-white text-sm transition">
                    <MessageCircle className="w-4 h-4 flex-shrink-0" />
                    WhatsApp: Konuşma Başlat
                  </a>
                </li>
              )}
              {settings.email && (
                <li>
                  <a href={`mailto:${settings.email}`} className="flex items-center gap-2 text-white/70 hover:text-white text-sm transition">
                    <Mail className="w-4 h-4 flex-shrink-0" />
                    {settings.email}
                  </a>
                </li>
              )}
              {settings.address && (
                <li className="flex items-start gap-2 text-white/70 text-sm">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>{settings.address}</span>
                </li>
              )}
              {settings.live_chat && (
                <li>
                  <a href={settings.live_chat} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/70 hover:text-white text-sm transition">
                    <MessageCircle className="w-4 h-4 flex-shrink-0" />
                    Canlı Destek: Sohbet Başlat
                  </a>
                </li>
              )}
            </ul>
          </div>

        </div>

        <div className="border-t border-white/10 mt-10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/50 text-sm">
              © {new Date().getFullYear()} {settings.company_name || settings.site_title}. Tüm hakları saklıdır.
            </p>
            <div className="flex items-center gap-4 text-white/50 text-sm">
              <Link href="/gizlilik-politikasi" className="hover:text-white transition">Gizlilik Politikası</Link>
              <Link href="/kullanim-kosullari" className="hover:text-white transition">Kullanım Koşulları</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
