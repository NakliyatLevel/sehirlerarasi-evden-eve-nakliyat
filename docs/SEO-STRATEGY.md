# SEO Stratejisi

Bu doküman, projenin SEO optimizasyonu ve Schema.org stratejisini detaylı olarak açıklar.

## Hedefler

- **PageSpeed Insights:** %100 (Mobil + Desktop)
- **SERP Görünümü:** Yıldızlı, zengin snippet'ler
- **Organik Trafik:** Hedef anahtar kelimeler için ilk sayfa
- **Yerel SEO:** Google Maps entegrasyonu

---

## Teknik SEO

### 1. Meta Tags

Her sayfa için dinamik meta tags:

```typescript
// app/layout.tsx veya page.tsx
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  
  return {
    title: settings.seo_title || settings.site_title,
    description: settings.seo_description,
    keywords: settings.seo_keywords,
    metadataBase: new URL(settings.domain || 'http://localhost:3000'),
    
    // Open Graph
    openGraph: {
      title: settings.seo_title,
      description: settings.seo_description,
      url: settings.domain,
      siteName: settings.company_name,
      images: [
        {
          url: settings.og_image || '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: settings.company_name,
        },
      ],
      locale: 'tr_TR',
      type: 'website',
    },
    
    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title: settings.seo_title,
      description: settings.seo_description,
      images: [settings.og_image || '/og-image.jpg'],
    },
    
    // Robots
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    
    // Verification
    verification: {
      google: settings.google_verification,
      yandex: settings.yandex_verification,
    },
  }
}
```

### 2. Canonical URLs

```typescript
// Her sayfada
export const metadata: Metadata = {
  alternates: {
    canonical: 'https://yourdomain.com/current-page',
  },
}
```

### 3. Sitemap

**Otomatik sitemap oluşturma:**

```typescript
// app/sitemap.ts
import { MetadataRoute } from 'next'
import { prisma } from '@/lib/db'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  
  // Static pages
  const staticPages = [
    '',
    '/hakkimizda',
    '/iletisim',
    '/teklif-al',
    '/referanslar',
    '/galeri',
    '/sss',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }))
  
  // Service pages
  const services = [
    '/hizmetlerimiz/ev-tasima',
    '/hizmetlerimiz/ofis-tasima',
    '/hizmetlerimiz/uluslararasi-nakliyat',
    '/hizmetlerimiz/parca-esya',
    '/hizmetlerimiz/asansorlu-tasima',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }))
  
  // Blog posts
  const posts = await prisma.post.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true },
  })
  
  const blogPages = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))
  
  return [...staticPages, ...services, ...blogPages]
}
```

### 4. Robots.txt

```typescript
// app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/karakar/', '/api/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
```

---

## Schema.org & JSON-LD

### 1. LocalBusiness Schema

```typescript
// components/schema/LocalBusinessSchema.tsx
import { getSiteSettings } from '@/lib/settings'

export async function LocalBusinessSchema() {
  const settings = await getSiteSettings()
  
  const schema = {
    "@context": "https://schema.org",
    "@type": "MovingCompany",
    "@id": `${settings.domain}#organization`,
    "name": settings.company_name,
    "url": settings.domain,
    "logo": `${settings.domain}${settings.logo_url}`,
    "image": `${settings.domain}${settings.logo_url}`,
    "description": settings.seo_description,
    "telephone": settings.phone,
    "email": settings.email,
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "TR",
      "addressLocality": settings.city || "İstanbul",
      "streetAddress": settings.address
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": settings.latitude,
      "longitude": settings.longitude
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "09:00",
        "closes": "14:00"
      }
    ],
    "priceRange": "₺₺",
    "sameAs": [
      settings.facebook_url,
      settings.instagram_url,
      settings.twitter_url,
    ].filter(Boolean)
  }
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
```

### 2. AggregateRating Schema (Yıldızlı SERP)

```typescript
// components/schema/AggregateRatingSchema.tsx
import { prisma } from '@/lib/db'

export async function AggregateRatingSchema() {
  const reviews = await prisma.review.findMany({
    where: { approved: true },
    select: { rating: true }
  })
  
  const totalReviews = reviews.length
  const averageRating = totalReviews > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
    : 0
  
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": averageRating.toFixed(1),
      "reviewCount": totalReviews,
      "bestRating": "5",
      "worstRating": "1"
    }
  }
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
```

### 3. Service Schema

```typescript
// components/schema/ServiceSchema.tsx
export function ServiceSchema({ service }: { service: any }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": service.name,
    "provider": {
      "@type": "MovingCompany",
      "name": "Çolak Nakliyat"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Türkiye"
    },
    "description": service.description,
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "priceCurrency": "TRY",
      "priceRange": "₺₺"
    }
  }
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
```

### 4. Review Schema

```typescript
// components/schema/ReviewSchema.tsx
export function ReviewSchema({ review }: { review: any }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Review",
    "itemReviewed": {
      "@type": "MovingCompany",
      "name": "Çolak Nakliyat"
    },
    "author": {
      "@type": "Person",
      "name": review.name
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": review.rating,
      "bestRating": "5",
      "worstRating": "1"
    },
    "reviewBody": review.comment,
    "datePublished": review.createdAt
  }
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
```

### 5. FAQPage Schema

```typescript
// components/schema/FAQSchema.tsx
export async function FAQSchema() {
  const faqs = await prisma.fAQ.findMany({
    where: { active: true },
    orderBy: { order: 'asc' }
  })
  
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
```

### 6. BreadcrumbList Schema

```typescript
// components/schema/BreadcrumbSchema.tsx
export function BreadcrumbSchema({ items }: { items: Array<{ name: string; url: string }> }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  }
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
```

### 7. BlogPosting Schema

```typescript
// components/schema/BlogPostingSchema.tsx
export function BlogPostingSchema({ post }: { post: any }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.image,
    "datePublished": post.publishedAt,
    "dateModified": post.updatedAt,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Çolak Nakliyat",
      "logo": {
        "@type": "ImageObject",
        "url": "/logo.png"
      }
    }
  }
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
```

---

## Anahtar Kelime Stratejisi

### Ana Anahtar Kelimeler

**Lokal (Türkiye):**
- evden eve nakliyat
- istanbul nakliyat
- ankara nakliyat
- ofis taşıma
- ev taşıma fiyatları
- nakliyat şirketi
- asansörlü taşıma
- parça eşya taşıma
- şehirler arası nakliyat

**Uluslararası:**
- almanya nakliyat
- avrupa nakliyat
- yurtdışı taşımacılık
- uluslararası evden eve nakliyat

### Long-tail Keywords

- istanbul anadolu yakası nakliyat
- ankara çankaya evden eve nakliyat
- uygun fiyatlı nakliyat şirketi
- sigortalı ev taşıma
- profesyonel ofis taşıma
- almanya'ya ev eşyası gönderme

### Sayfa Bazlı Keywords

**Ana Sayfa:**
- evden eve nakliyat
- nakliyat şirketi
- ev taşıma

**Hizmet Sayfaları:**
- ev taşıma hizmeti
- ofis taşıma hizmeti
- uluslararası nakliyat

**Blog:**
- taşınma ipuçları
- ev taşıma rehberi
- nakliyat önerileri

---

## On-Page SEO

### 1. Başlık Yapısı

```html
<h1>Ana Başlık (Sayfa başına 1 adet)</h1>
<h2>Alt Başlık</h2>
<h3>Detay Başlık</h3>
```

**Örnek:**
```html
<h1>Evden Eve Nakliyat - Profesyonel Taşımacılık Hizmeti</h1>
<h2>Neden Bizi Seçmelisiniz?</h2>
<h3>Sigortalı Taşıma</h3>
<h3>Profesyonel Ekip</h3>
<h2>Hizmetlerimiz</h2>
```

### 2. Alt Text (Görseller)

```typescript
<Image
  src="/uploads/ev-tasima.jpg"
  alt="İstanbul evden eve nakliyat hizmeti - Profesyonel ekip ile güvenli taşıma"
  width={1200}
  height={800}
/>
```

### 3. Internal Linking

```typescript
// Her sayfada ilgili sayfalara linkler
<Link href="/hizmetlerimiz/ev-tasima">Ev Taşıma Hizmetimiz</Link>
<Link href="/blog/tasima-ipuclari">Taşıma İpuçları</Link>
<Link href="/teklif-al">Ücretsiz Teklif Alın</Link>
```

### 4. URL Yapısı

**İyi:**
- `/hizmetlerimiz/ev-tasima`
- `/blog/tasima-oncesi-hazirlik`
- `/istanbul-nakliyat`

**Kötü:**
- `/page?id=123`
- `/hizmet1`
- `/p/12345`

---

## Performance Optimization

### 1. Image Optimization

```typescript
// next.config.js
module.exports = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
}
```

### 2. Font Optimization

```typescript
// app/layout.tsx
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
})
```

### 3. Code Splitting

```typescript
// Dynamic imports
import dynamic from 'next/dynamic'

const PriceCalculator = dynamic(() => import('@/components/PriceCalculator'), {
  loading: () => <LoadingSkeleton />,
  ssr: false
})
```

### 4. Lazy Loading

```typescript
<Image
  src="/image.jpg"
  alt="..."
  loading="lazy"
  placeholder="blur"
/>
```

---

## Yerel SEO

### 1. Google My Business

**Optimizasyon:**
- Şirket adı, adres, telefon (NAP) tutarlılığı
- Kategoriler: Nakliyat Şirketi, Evden Eve Nakliyat
- Çalışma saatleri
- Fotoğraflar (ofis, ekip, araçlar)
- Müşteri yorumları

### 2. Yerel Anahtar Kelimeler

```
[Şehir] + evden eve nakliyat
[İlçe] + nakliyat şirketi
[Şehir] + ofis taşıma
```

**Örnek:**
- İstanbul evden eve nakliyat
- Kadıköy nakliyat şirketi
- Ankara ofis taşıma

### 3. Yerel İçerik

Her şehir için ayrı sayfa:
- `/istanbul-nakliyat`
- `/ankara-nakliyat`
- `/izmir-nakliyat`

---

## Content Strategy

### 1. Blog İçerikleri

**Kategoriler:**
- Taşınma İpuçları
- Nakliyat Rehberi
- Müşteri Hikayeleri
- Sektör Haberleri

**Örnek Başlıklar:**
- "Taşınma Öncesi Yapılması Gereken 10 Şey"
- "Ev Eşyalarını Paketleme Rehberi"
- "Kırılabilir Eşyalar Nasıl Taşınır?"
- "Uluslararası Nakliyatta Gümrük İşlemleri"

### 2. İçerik Uzunluğu

- **Ana Sayfa:** 500-800 kelime
- **Hizmet Sayfaları:** 800-1200 kelime
- **Blog Yazıları:** 1000-2000 kelime
- **SSS:** Her soru için 100-200 kelime

### 3. İçerik Güncelliği

- Blog: Haftalık yeni yazı
- Hizmet sayfaları: Aylık güncelleme
- Ana sayfa: 3 ayda bir güncelleme

---

## Link Building

### 1. Internal Links

Her sayfada en az 3-5 internal link.

### 2. External Links

Güvenilir kaynaklara linkler:
- Resmi kurumlar
- Sektör dernekleri
- İstatistik kaynakları

### 3. Backlinks

**Stratejiler:**
- Yerel dizinlere kayıt
- Sektör bloglarında misafir yazılar
- Basın bültenleri
- Sosyal medya paylaşımları

---

## Mobile SEO

### 1. Responsive Design

Tüm sayfalar mobil uyumlu.

### 2. Touch Targets

Butonlar minimum 48x48px.

### 3. Font Sizes

Minimum 16px (mobilde okunabilir).

### 4. Viewport

```html
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

---

## Analytics & Tracking

### 1. Google Analytics 4

```typescript
// app/layout.tsx
import { GoogleAnalytics } from '@next/third-parties/google'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      </body>
    </html>
  )
}
```

### 2. Google Search Console

**Kurulum:**
1. Search Console'a gidin
2. Property ekleyin
3. Domain doğrulama (DNS TXT record)
4. Sitemap gönderin

### 3. Tracking Events

```typescript
// lib/analytics.ts
export function trackEvent(eventName: string, params?: any) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params)
  }
}

// Kullanım
trackEvent('quote_request', {
  service: 'ev-tasima',
  location: 'istanbul'
})
```

---

## SEO Checklist

### Teknik SEO
- [ ] Sitemap.xml oluşturuldu
- [ ] Robots.txt oluşturuldu
- [ ] Meta tags tüm sayfalarda
- [ ] Canonical URLs
- [ ] SSL sertifikası
- [ ] Mobile-friendly
- [ ] Page speed optimize
- [ ] Schema.org markup

### On-Page SEO
- [ ] H1 her sayfada
- [ ] Alt text tüm görsellerde
- [ ] Internal linking
- [ ] URL yapısı optimize
- [ ] Keyword placement
- [ ] Content quality

### Off-Page SEO
- [ ] Google My Business
- [ ] Backlinks
- [ ] Social media
- [ ] Local directories

### Performance
- [ ] PSI %100 hedef
- [ ] Image optimization
- [ ] Code splitting
- [ ] Lazy loading
- [ ] Caching

---

**Versiyon:** 1.0.0  
**Son Güncelleme:** 11 Mart 2026
