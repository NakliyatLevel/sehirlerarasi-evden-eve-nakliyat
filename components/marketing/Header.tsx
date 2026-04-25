'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, Menu, ChevronDown, Facebook, Instagram, Twitter, Linkedin, Youtube } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MobileMenu } from './MobileMenu'
import { useState, useEffect } from 'react'

export default function Header() {
  const [settings, setSettings] = useState<any>({})
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        setSettings(data)
      })
      .catch(() => {})
  }, [])

  return (
    <>
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top Bar - Mobilde gizli */}
      <div className="bg-primary text-white py-2 hidden md:block">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              {settings.phone && (
                <a href={`tel:${settings.phone}`} className="flex items-center gap-2 hover:text-white/80">
                  <Phone className="w-4 h-4" />
                  {settings.phone}
                </a>
              )}
              {settings.email && (
                <a href={`mailto:${settings.email}`} className="flex items-center gap-2 hover:text-white/80">
                  <Mail className="w-4 h-4" />
                  {settings.email}
                </a>
              )}
            </div>
            <div className="flex items-center gap-4">
              {settings.facebook && (
                <a
                  href={settings.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white/80"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {settings.instagram && (
                <a
                  href={settings.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white/80"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {settings.twitter && (
                <a
                  href={settings.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white/80"
                  aria-label="Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              )}
              {settings.linkedin && (
                <a
                  href={settings.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white/80"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {settings.youtube && (
                <a
                  href={settings.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white/80"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.webp"
              alt={settings.site_title || 'Evden Eve Nakliyat'}
              width={207}
              height={69}
              priority
              className="h-[55px] w-auto"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/hakkimizda" className="hover:text-primary transition">
              Hakkımızda
            </Link>

            <div className="relative group">
              <button className="flex items-center gap-1 hover:text-primary transition">
                Çözümlerimiz
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <Link href="/cozum/ucretsiz-ekspertiz" className="block px-4 py-3 hover:bg-muted transition text-sm">
                  Ücretsiz Ekspertiz
                </Link>
                <Link href="/cozum/sozlesmeli-nakliyat" className="block px-4 py-3 hover:bg-muted transition text-sm">
                  Sözleşmeli Evden Eve Nakliyat
                </Link>
                <Link href="/cozum/sigortali-nakliyat" className="block px-4 py-3 hover:bg-muted transition text-sm">
                  Sigortalı Evden Eve Nakliyat
                </Link>
                <Link href="/cozum/asansorlu-nakliyat" className="block px-4 py-3 hover:bg-muted transition text-sm">
                  Asansörlü Evden Eve Nakliyat
                </Link>
                <Link href="/cozum/ambalaj-paketleme" className="block px-4 py-3 hover:bg-muted transition text-sm">
                  Ambalaj ve Paketleme
                </Link>
              </div>
            </div>

            <div className="relative group">
              <Link href="/hizmetlerimiz" className="flex items-center gap-1 hover:text-primary transition">
                Hizmetlerimiz
                <ChevronDown className="w-4 h-4" />
              </Link>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[800px] bg-white border border-gray-200 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 p-6">
                <div className="grid grid-cols-3 gap-6">
                  {/* Bireysel Taşımacılık */}
                  <div>
                    <h3 className="font-bold text-primary mb-3 pb-2 border-b border-border">
                      Bireysel Taşımacılık
                    </h3>
                    <ul className="space-y-2">
                      <li>
                        <Link href="/hizmet/ev-tasima" className="block py-1 hover:text-primary transition text-sm">
                          Ev Taşıma
                        </Link>
                      </li>
                      <li>
                        <Link href="/hizmet/villa-tasimaciligi" className="block py-1 hover:text-primary transition text-sm">
                          Villa Taşımacılığı
                        </Link>
                      </li>
                      <li>
                        <Link href="/hizmet/yali-tasimaciligi" className="block py-1 hover:text-primary transition text-sm">
                          Yalı Taşımacılığı
                        </Link>
                      </li>
                      <li>
                        <Link href="/hizmet/parca-esya-tasimaciligi" className="block py-1 hover:text-primary transition text-sm">
                          Parça Eşya Taşımacılığı
                        </Link>
                      </li>
                      <li>
                        <Link href="/hizmet/sehir-ici-nakliyat" className="block py-1 hover:text-primary transition text-sm">
                          Şehir içi Nakliyat
                        </Link>
                      </li>
                      <li>
                        <Link href="/hizmet/sehirler-arasi-nakliyat" className="block py-1 hover:text-primary transition text-sm">
                          Şehirler Arası Nakliyat
                        </Link>
                      </li>
                    </ul>
                  </div>

                  {/* Kurumsal Taşımacılık */}
                  <div>
                    <h3 className="font-bold text-primary mb-3 pb-2 border-b border-border">
                      Kurumsal Taşımacılık
                    </h3>
                    <ul className="space-y-2">
                      <li>
                        <Link href="/hizmet/ofis-tasimaciligi" className="block py-1 hover:text-primary transition text-sm">
                          Ofis Taşımacılığı
                        </Link>
                      </li>
                      <li>
                        <Link href="/hizmet/kurumsal-tasimaciligi" className="block py-1 hover:text-primary transition text-sm">
                          Kurumsal Taşımacılık
                        </Link>
                      </li>
                      <li>
                        <Link href="/hizmet/fabrika-tasimaciligi" className="block py-1 hover:text-primary transition text-sm">
                          Fabrika Taşımacılığı
                        </Link>
                      </li>
                      <li>
                        <Link href="/hizmet/banka-tasimaciligi" className="block py-1 hover:text-primary transition text-sm">
                          Banka Taşımacılığı
                        </Link>
                      </li>
                      <li>
                        <Link href="/hizmet/fuar-tasimaciligi" className="block py-1 hover:text-primary transition text-sm">
                          Fuar Taşımacılığı
                        </Link>
                      </li>
                      <li>
                        <Link href="/hizmet/hastane-tasimaciligi" className="block py-1 hover:text-primary transition text-sm">
                          Hastane Taşımacılığı
                        </Link>
                      </li>
                      <li>
                        <Link href="/hizmet/konsolosluk-tasimaciligi" className="block py-1 hover:text-primary transition text-sm">
                          Konsolosluk Taşımacılığı
                        </Link>
                      </li>
                      <li>
                        <Link href="/hizmet/universite-tasimaciligi" className="block py-1 hover:text-primary transition text-sm">
                          Üniversite Taşımacılığı
                        </Link>
                      </li>
                    </ul>
                  </div>

                  {/* Diğer Hizmetler */}
                  <div>
                    <h3 className="font-bold text-primary mb-3 pb-2 border-b border-border">
                      Diğer Hizmetler
                    </h3>
                    <ul className="space-y-2">
                      <li>
                        <Link href="/hizmet/arsiv-tasimaciligi" className="block py-1 hover:text-primary transition text-sm">
                          Arşiv Taşımacılığı
                        </Link>
                      </li>
                      <li>
                        <Link href="/hizmet/muze-tasimaciligi" className="block py-1 hover:text-primary transition text-sm">
                          Müze Taşımacılığı
                        </Link>
                      </li>
                      <li>
                        <Link href="/hizmet/bankamatik-tasimaciligi" className="block py-1 hover:text-primary transition text-sm">
                          Bankamatik Taşımacılığı
                        </Link>
                      </li>
                      <li>
                        <Link href="/hizmet/para-kasasi-tasimaciligi" className="block py-1 hover:text-primary transition text-sm">
                          Para Kasası Taşımacılığı
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <Link href="/referanslar" className="hover:text-primary transition">
              Referanslar
            </Link>
            <div className="relative group">
              <button className="flex items-center gap-1 hover:text-primary transition">
                Galeri
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <Link href="/galeri/videolar" className="block px-4 py-3 hover:bg-muted transition text-sm">
                  Videolar
                </Link>
                <Link href="/galeri/araclarimiz" className="block px-4 py-3 hover:bg-muted transition text-sm">
                  Araçlarımız
                </Link>
                <Link href="/galeri/paketleme" className="block px-4 py-3 hover:bg-muted transition text-sm">
                  Paketleme
                </Link>
              </div>
            </div>
            <Link href="/hizmet-bolgeleri" className="hover:text-primary transition">
              Hizmet Bölgeleri
            </Link>
            <Link href="/blog" className="hover:text-primary transition">
              Blog
            </Link>
            <Link href="/iletisim" className="hover:text-primary transition">
              İletişim
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/teklif-al">
              <Button className="bg-secondary hover:bg-secondary/90">
                Teklif Al
              </Button>
            </Link>
            <button 
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
    <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  )
}
