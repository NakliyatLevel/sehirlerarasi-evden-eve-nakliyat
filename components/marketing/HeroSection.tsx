'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Phone, Shield, Award, TrendingUp, ArrowRight, CheckCircle2, Star, Users, Truck } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function HeroSection() {
  const [mounted, setMounted] = useState(false)
  const [activeCity, setActiveCity] = useState(0)
  const [settings, setSettings] = useState<any>({})
  const [stats, setStats] = useState({
    customers: 0,
    years: 0,
    cities: 0,
    rating: 0
  })

  const cities = ['İstanbul', 'Ankara', 'İzmir', 'Bursa', 'Antalya']
  const features = [
    { icon: Shield, text: 'Sigortalı Taşıma', color: 'text-primary' },
    { icon: Award, text: '15+ Yıl Tecrübe', color: 'text-primary' },
    { icon: TrendingUp, text: 'Uygun Fiyat', color: 'text-primary' }
  ]

  useEffect(() => {
    setMounted(true)
    
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        setSettings(data)
      })
      .catch(() => {})
    
    const duration = 2000
    const steps = 60
    const interval = duration / steps

    let step = 0
    const timer = setInterval(() => {
      step++
      const progress = step / steps
      setStats({
        customers: Math.floor(10000 * progress),
        years: Math.floor(15 * progress),
        cities: Math.floor(81 * progress),
        rating: Math.min(4.9, 4.9 * progress)
      })
      if (step >= steps) clearInterval(timer)
    }, interval)

    const cityTimer = setInterval(() => {
      setActiveCity(prev => (prev + 1) % cities.length)
    }, 3000)

    return () => {
      clearInterval(timer)
      clearInterval(cityTimer)
    }
  }, [cities.length])

  if (!mounted) return null

  return (
    <section className="relative overflow-hidden bg-white">
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `
          linear-gradient(to right, #1e455f 1px, transparent 1px),
          linear-gradient(to bottom, #1e455f 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px'
      }}></div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          <div className="space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-muted px-4 py-2 rounded-lg shadow-sm border border-border">
              <div className="flex -space-x-2">
                {[
                  'https://i.pravatar.cc/32?img=11',
                  'https://i.pravatar.cc/32?img=25',
                  'https://i.pravatar.cc/32?img=47',
                  'https://i.pravatar.cc/32?img=58',
                ].map((src, i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden">
                    <Image src={src} alt="Müşteri" width={32} height={32} className="rounded-full object-cover" />
                  </div>
                ))}
              </div>
              <span className="text-sm font-medium text-foreground">10,000+ Mutlu Müşteri</span>
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl font-bold leading-tight text-foreground">
                Taşınmanın En Kolay Yolu
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
                Profesyonel ekibimiz ve modern araçlarımızla{' '}
                <span className="font-semibold text-primary">
                  {cities[activeCity]}
                </span>
                {' '}ve tüm Türkiye&apos;de güvenli nakliyat hizmeti sunuyoruz.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 bg-white p-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-border"
                >
                  <div className="p-2 rounded-lg bg-muted">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-medium text-foreground text-sm">{feature.text}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              {settings.whatsapp && (
                <a
                  href={`https://wa.me/${settings.whatsapp.replace(/\s/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="lg" className="w-full sm:w-auto bg-secondary hover:bg-secondary/90 text-white px-8 py-4 font-semibold">
                    WhatsApp Hattı
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </a>
              )}
              <Link href="tel:4446502">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-4 font-semibold">
                  <Phone className="mr-2 w-5 h-5" />
                  444 65 02
                </Button>
              </Link>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-6 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{stats.customers.toLocaleString()}+</div>
                <div className="text-sm text-muted-foreground">Müşteri</div>
              </div>
              <div className="w-px h-12 bg-border"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{stats.years}+</div>
                <div className="text-sm text-muted-foreground">Yıl Tecrübe</div>
              </div>
              <div className="w-px h-12 bg-border"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{stats.cities}</div>
                <div className="text-sm text-muted-foreground">Şehir</div>
              </div>
              <div className="w-px h-12 bg-border"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{stats.rating.toFixed(1)}</div>
                <div className="text-sm text-muted-foreground">Puan</div>
              </div>
            </div>
          </div>

          <div className="relative animate-fade-in-right">
            <div className="bg-white rounded-lg shadow-lg p-8 border border-border relative">
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <h3 className="text-2xl font-bold text-foreground">Hızlı Teklif Alın</h3>
                  <p className="text-muted-foreground">2 dakikada ücretsiz fiyat teklifi</p>
                </div>

                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Adınız Soyadınız</label>
                      <input
                        type="text"
                        placeholder="Örn: Ahmet Yılmaz"
                        className="w-full px-4 py-3 rounded-lg border border-input focus:border-primary focus:ring-2 focus:ring-ring/20 outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Telefon Numaranız</label>
                      <input
                        type="tel"
                        placeholder="0555 555 55 55"
                        className="w-full px-4 py-3 rounded-lg border border-input focus:border-primary focus:ring-2 focus:ring-ring/20 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Nereden</label>
                      <select className="w-full px-4 py-3 rounded-lg border border-input focus:border-primary focus:ring-2 focus:ring-ring/20 outline-none transition-all">
                        <option>İstanbul</option>
                        <option>Ankara</option>
                        <option>İzmir</option>
                        <option>Bursa</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Nereye</label>
                      <select className="w-full px-4 py-3 rounded-lg border border-input focus:border-primary focus:ring-2 focus:ring-ring/20 outline-none transition-all">
                        <option>Ankara</option>
                        <option>İstanbul</option>
                        <option>İzmir</option>
                        <option>Antalya</option>
                      </select>
                    </div>
                  </div>

                  <Button className="w-full bg-secondary hover:bg-secondary/90 text-white py-4 font-semibold">
                    Teklif Al
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </form>

                <div className="flex items-center justify-center gap-6 pt-4 border-t border-border">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span>Ücretsiz</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span>Hızlı Yanıt</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span>Güvenli</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -top-6 -left-6 bg-white rounded-lg shadow-lg p-4 animate-float border border-border">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-muted rounded-lg">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">Aktif Müşteri</div>
                  <div className="text-xs text-muted-foreground">Şu an 127 kişi online</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-right {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-fade-in-right {
          animation: fade-in-right 0.8s ease-out;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </section>
  )
}
