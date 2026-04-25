import { prisma } from '@/lib/db'
import { getSiteSettings } from '@/lib/settings'
import { generateLocalBusinessSchema, generateReviewSchema } from '@/lib/seo/schema'
import Link from 'next/link'
import Image from 'next/image'
import { Star, MapPin, Phone, Mail } from 'lucide-react'
import HeroSection from '@/components/marketing/HeroSection'
import TrustBar from '@/components/marketing/TrustBar'
import LogoMarquee from '@/components/marketing/LogoMarquee'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  return {
    title: settings.seo_title || settings.site_title || 'Evden Eve Nakliyat',
    description: settings.seo_description || 'Profesyonel evden eve nakliyat hizmetleri',
    keywords: settings.seo_keywords || undefined,
    openGraph: {
      title: settings.seo_title || settings.site_title || 'Evden Eve Nakliyat',
      description: settings.seo_description || 'Profesyonel evden eve nakliyat hizmetleri',
      type: 'website',
    },
  }
}

async function getHomeData() {
  const [reviews, gallery, services, features, statistics, processes, faqs, posts, serviceAreas, partners, allPartners, teamMembers, settings] = await Promise.all([
    prisma.review.findMany({
      where: { approved: true },
      orderBy: { createdAt: 'desc' },
      take: 6,
    }),
    prisma.gallery.findMany({
      where: { active: true },
      orderBy: { order: 'asc' },
      take: 8,
    }),
    prisma.service.findMany({
      where: { active: true, showOnHomepage: true },
      orderBy: { order: 'asc' },
    }),
    prisma.feature.findMany({
      where: { active: true },
      orderBy: { order: 'asc' },
    }),
    prisma.statistic.findMany({
      where: { active: true },
      orderBy: { order: 'asc' },
    }),
    prisma.process.findMany({
      where: { active: true },
      orderBy: { step: 'asc' },
    }),
    prisma.fAQ.findMany({
      where: { active: true },
      orderBy: { order: 'asc' },
      take: 6,
    }),
    prisma.post.findMany({
      where: { published: true },
      orderBy: { publishedAt: 'desc' },
      take: 3,
    }),
    prisma.serviceArea.findMany({
      where: { active: true },
      orderBy: { order: 'asc' },
    }),
    prisma.partner.findMany({
      where: { active: true },
      orderBy: { order: 'asc' },
      take: 6,
    }),
    prisma.partner.findMany({
      where: { active: true },
      orderBy: { order: 'asc' },
    }),
    prisma.teamMember.findMany({
      where: { active: true },
      orderBy: { order: 'asc' },
    }),
    getSiteSettings(),
  ])

  return { reviews, gallery, services, features, statistics, processes, faqs, posts, serviceAreas, partners, allPartners, teamMembers, settings }
}

export default async function HomePage() {
  const { reviews, gallery, services, features, statistics, processes, faqs, posts, serviceAreas, partners, allPartners, teamMembers, settings } = await getHomeData()
  
  const businessSchema = await generateLocalBusinessSchema()
  const reviewSchema = reviews.length > 0 ? generateReviewSchema(reviews) : null

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
      />
      {reviewSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
        />
      )}
      <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Logo Marquee - Referanslar (TrustBar Üstünde) */}
      <LogoMarquee
        partners={allPartners}
        title="Türkiye'nin önde gelen markaları bizi tercih etti."
      />

      {/* Trust Bar */}
      <TrustBar />

      {/* Services Section - Dinamik */}
      {services.length > 0 && (
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 max-w-7xl">
            <h2 className="text-3xl font-bold text-center mb-4">Hizmetlerimiz</h2>
            {settings.services_description && (
              <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                {settings.services_description}
              </p>
            )}
            {!settings.services_description && <div className="mb-12"></div>}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((service) => (
                <Link key={service.id} href={`/hizmet/${service.slug}`} className="group bg-white p-8 rounded-lg border border-gray-200 text-center hover:border-primary/50 hover:shadow-md transition block">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition">
                    <MapPin className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition">{service.name}</h3>
                  {service.description && (
                    <p className="text-muted-foreground text-sm">{service.description}</p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features Section - Neden Biz? */}
      {features.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-7xl">
            <h2 className="text-3xl font-bold text-center mb-4">Neden Bizi Tercih Etmelisiniz?</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              {settings.features_description || 'Profesyonel ekibimiz ve kaliteli hizmet anlayışımızla yanınızdayız'}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature) => (
                <div key={feature.id} className="bg-white p-6 rounded-lg border border-gray-200 hover:border-primary/50 transition">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Statistics Section - İstatistikler */}
      {statistics.length > 0 && (
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {statistics.map((stat) => (
                <div key={stat.id} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
                  <div className="text-white/80">{stat.title}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Process Section - Nasıl Çalışır? */}
      {processes.length > 0 && (
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 max-w-7xl">
            <h2 className="text-3xl font-bold text-center mb-4">Nasıl Çalışır?</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              {settings.process_description || 'Taşınma süreciniz 5 basit adımda tamamlanır'}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {processes.map((process) => (
                <div key={process.id} className="text-center">
                  <div className="relative">
                    <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                      {process.step}
                    </div>
                    {process.step < processes.length && (
                      <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-primary/20" />
                    )}
                  </div>
                  <h3 className="font-semibold mb-2">{process.title}</h3>
                  <p className="text-sm text-muted-foreground">{process.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Reviews Section */}
      {reviews.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-7xl">
            <h2 className="text-3xl font-bold text-center mb-12">Müşteri Yorumları</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {reviews.map((review) => (
                <div key={review.id} className="bg-white p-6 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">{review.comment}</p>
                  <div>
                    <p className="font-semibold">{review.name}</p>
                    {review.location && (
                      <p className="text-sm text-muted-foreground">{review.location}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gallery Section */}
      {gallery.length > 0 && (
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 max-w-7xl">
            <h2 className="text-3xl font-bold text-center mb-12">Galeri</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {gallery.map((item) => (
                <div key={item.id} className="relative h-48 rounded-lg overflow-hidden">
                  <Image
                    src={item.image || '/placeholder-logo.svg'}
                    alt={item.title}
                    fill
                    className="object-cover hover:scale-110 transition"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section - SSS */}
      {faqs.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-7xl">
            <h2 className="text-3xl font-bold text-center mb-4">Sık Sorulan Sorular</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              {settings.faq_description || 'Merak ettiğiniz soruların cevapları'}
            </p>
            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq) => (
                <details key={faq.id} className="bg-white p-6 rounded-lg border border-gray-200">
                  <summary className="font-semibold cursor-pointer hover:text-primary transition">
                    {faq.question}
                  </summary>
                  <p className="mt-4 text-muted-foreground">{faq.answer}</p>
                </details>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/sss"
                className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
              >
                Tüm Soruları Gör
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Service Areas Section - Hizmet Bölgeleri */}
      {serviceAreas.length > 0 && (
        <section className="py-16" style={{backgroundColor: 'rgb(243 244 246 / 0.3)'}}>
          <div className="container mx-auto px-4 max-w-7xl">
            <h2 className="text-3xl font-bold text-center mb-4">Hizmet Verdiğimiz Bölgeler</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              {settings.areas_description || 'Türkiye genelinde profesyonel nakliyat hizmeti'}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {serviceAreas.slice(0, 10).map((area) => (
                <Link key={area.id} href={`/bolge/${area.slug}`} className="bg-white p-4 rounded-lg border border-gray-200 text-center hover:border-primary/50 hover:shadow-md transition block">
                  <MapPin className="w-8 h-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold">{area.city}</h3>
                  {area.description && (
                    <p className="text-xs text-muted-foreground mt-1">{area.description}</p>
                  )}
                </Link>
              ))}
            </div>
            {serviceAreas.length > 10 && (
              <div className="text-center mt-8">
                <Link
                  href="/hizmet-bolgeleri"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition"
                >
                  Tümünü Görüntüle
                </Link>
              </div>
            )}
          </div>
        </section>
      )}

      {/* CTA Banner */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-8">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-2">
              <div className="text-sm opacity-90">Türkiye&apos;nin Her Yerinden</div>
              <div className="text-3xl font-bold">Güvenli Nakliyat Hizmeti</div>
              <div className="flex items-center gap-4 pt-2">
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <path d="M20 6 9 17l-5-5"/>
                  </svg>
                  <span className="text-sm">Sigortalı</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <path d="M20 6 9 17l-5-5"/>
                  </svg>
                  <span className="text-sm">7/24 Destek</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <path d="M20 6 9 17l-5-5"/>
                  </svg>
                  <span className="text-sm">Uygun Fiyat</span>
                </div>
              </div>
            </div>

            <div className="text-center md:text-right">
              <div className="text-sm opacity-90 mb-2">Hemen Arayın</div>
              <a href="tel:4446502" className="text-5xl font-bold hover:opacity-80 transition block">
                444 65 02
              </a>
              <div className="text-sm opacity-90 mt-2">Ücretsiz Keşif & Fiyat Teklifi</div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section - Referanslar */}
      {partners.length > 0 && (
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 max-w-7xl">
            <h2 className="text-3xl font-bold text-center mb-4">Çalıştığımız Firmalar</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              {settings.partners_description || 'Güvenilir iş ortaklarımız'}
            </p>
            <div className="grid grid-cols-6 gap-6">
              {partners.map((partner) => (
                <div key={partner.id} className="bg-white p-6 rounded-lg border border-gray-200 flex items-center justify-center hover:border-primary/50 transition h-24">
                  {partner.logo ? (
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      width={120}
                      height={60}
                      className="object-contain max-h-16"
                    />
                  ) : (
                    <div className="text-center">
                      <p className="font-semibold text-sm">{partner.name}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Team Section - Ekibimiz */}
      {teamMembers.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-7xl">
            <h2 className="text-3xl font-bold text-center mb-4">Ekibimiz</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Profesyonel ve deneyimli kadromuz
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member) => (
                <div key={member.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:border-primary/50 transition">
                  <div className="h-48 bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                      <span className="text-3xl font-bold text-primary">
                        {member.name.charAt(0)}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                    <p className="text-primary font-medium mb-3">{member.position}</p>
                    {member.bio && (
                      <p className="text-sm text-muted-foreground">{member.bio}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Quick Quote Section - Hızlı Teklif */}
      <section className="py-16 bg-gradient-to-br from-primary to-primary/80 text-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">{settings.quote_title || 'Hızlı Fiyat Teklifi Alın'}</h2>
            <p className="text-white/90 mb-8">
              {settings.quote_description || 'Bilgilerinizi bırakın, size en kısa sürede dönüş yapalım'}
            </p>
            <div className="bg-white rounded-lg p-8 text-left">
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Adınız Soyadınız"
                    className="px-4 py-3 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-gray-900"
                  />
                  <input
                    type="tel"
                    placeholder="Telefon Numaranız"
                    className="px-4 py-3 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-gray-900"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Nereden"
                    className="px-4 py-3 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-gray-900"
                  />
                  <input
                    type="text"
                    placeholder="Nereye"
                    className="px-4 py-3 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-gray-900"
                  />
                </div>
                <Link
                  href="/teklif-al"
                  className="block w-full py-3 bg-secondary text-white text-center rounded-md font-semibold hover:bg-secondary/90 transition"
                >
                  Detaylı Teklif Al
                </Link>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      {posts.length > 0 && (
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 max-w-7xl">
            <h2 className="text-3xl font-bold text-center mb-4">Son Blog Yazıları</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              {settings.blog_description || 'Nakliyat hakkında faydalı bilgiler'}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="group">
                  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:border-primary/50 transition">
                    {post.image && (
                      <div className="relative h-48">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition">
                        {post.title}
                      </h3>
                      {post.excerpt && (
                        <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                          {post.excerpt}
                        </p>
                      )}
                      {post.publishedAt && (
                        <p className="text-xs text-muted-foreground">
                          {new Date(post.publishedAt).toLocaleDateString('tr-TR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition"
              >
                Tüm Yazılar
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section className="py-16" style={{backgroundColor: 'rgba(243, 244, 246, 0.3)'}}>
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <h2 className="text-3xl font-bold mb-6 text-foreground">Hemen İletişime Geçin</h2>
          <p className="text-xl mb-8 text-muted-foreground">Ücretsiz fiyat teklifi almak için bize ulaşın</p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            {settings.phone && (
              <a href={`tel:${settings.phone}`} className="flex items-center gap-2 text-lg text-foreground hover:text-primary transition">
                <Phone className="w-5 h-5" />
                {settings.phone}
              </a>
            )}
            {settings.email && (
              <a href={`mailto:${settings.email}`} className="flex items-center gap-2 text-lg text-foreground hover:text-primary transition">
                <Mail className="w-5 h-5" />
                {settings.email}
              </a>
            )}
          </div>
        </div>
      </section>
    </div>
    </>
  )
}
