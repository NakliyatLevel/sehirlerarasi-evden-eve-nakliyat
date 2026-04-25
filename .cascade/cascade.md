# Cascade AI Context - Evden Eve Nakliyat Projesi

## Proje Özeti
Modern, SEO uyumlu, %100 dinamik evden eve nakliyat web sitesi. Next.js 15.1.4, TypeScript, PostgreSQL, Prisma kullanılarak geliştirilmiştir.

## Temel Prensipler

### 🎯 Dinamik Yapı (HARDCODE YOK)
- **Tüm veriler veritabanından veya environment variables'dan gelir**
- Domain, şirket adı, iletişim bilgileri → Admin panelden düzenlenebilir
- Veri yoksa → Görünmez (conditional rendering)
- Logo yoksa → Placeholder gösterilir, ama dinamik
- Hiçbir içerik hardcode edilmez

### 🚫 Kesinlikle Yapılmayacaklar
- Emoji kullanımı (ikonlar sadece Lucide Icons)
- PWA (Progressive Web App)
- Hardcode veriler
- Dark mode/koyu tema

### ✅ Mutlaka Yapılacaklar
- SEO optimizasyonu (PSI %100 hedef)
- Schema.org + JSON-LD (yıldızlı SERP görünümü)
- Mobil native app hissi (PWA olmadan)
- Temiz kod yapısı
- Veri kaybı önleme
- Her değişiklik sonrası Internal Server Error kontrolü

## Teknik Stack

### Frontend
- **Next.js 15.1.4** (App Router, SSR/SSG)
- **React 18+**
- **TypeScript**
- **TailwindCSS**
- **Shadcn/ui** (Full kullanım)
- **Framer Motion** (Performanslı animasyonlar)
- **Lucide Icons** (Tek ikon kütüphanesi)

### Backend
- **PostgreSQL** (Vercel Postgres)
- **Prisma ORM**
- **Next.js API Routes**
- **NextAuth.js v5** (Authentication)

### Form & Validation
- **Zod** (TypeScript validation)
- **React Hook Form**

### SEO & Performance
- **next-seo**
- **next-sitemap**
- **sharp** (Image optimization)
- **schema-dts** (TypeScript Schema.org)

### Email
- **React Email** (HTML templates)
- **SMTP** (Gmail + Özel sunucu desteği)

### Maps
- **Google Maps Distance Matrix API** (Mesafe hesaplama)

## Proje Yapısı

```
/app
  /(marketing)              # Public routes
    /page.tsx               # Ana sayfa
    /hizmetlerimiz/
      /ev-tasima/
      /ofis-tasima/
      /uluslararasi-nakliyat/
        /[country]/         # Dinamik ülke sayfaları
      /parca-esya/
      /asansorlu-tasima/
      /sehirler-arasi/
      /sehir-ici/
    /hakkimizda/
    /referanslar/
    /galeri/
    /blog/
      /[slug]/
    /sss/
    /iletisim/
    /teklif-al/
      /lokal/
      /uluslararasi/
  /karakar                  # Admin panel (auth korumalı)
    /dashboard/
    /sayfalar/
    /blog/
    /galeri/
    /yorumlar/
    /hizmetler/
    /sss/
    /fiyatlandirma/
      /lokal/
      /uluslararasi/
    /ulkeler/
    /ayarlar/
  /api
    /auth/
    /contact/
    /quote/
    /settings/
/components
  /ui                       # Shadcn components
  /marketing                # Public components
  /admin                    # Admin components
  /forms
  /email
/lib
  /db
  /validations
  /utils
  /email
  /settings.ts
/prisma
  /schema.prisma
/public
  /uploads                  # Admin yüklenen görseller
  /images
  /placeholder-logo.svg
/docs                       # Tüm dokümanlar
/.cascade                   # Cascade AI context
/.windsurf                  # Windsurf workflows
```

## Tasarım Sistemi

### Renkler
- **Primary:** `#1e455f` (Koyu mavi)
- **Secondary:** `#cb2b24` (Kırmızı)
- **Background:** Beyaz zemin (koyu card yok)

### Tipografi
- Modern, okunabilir fontlar
- Responsive font sizes

### İkonlar
- **Sadece Lucide Icons** kullanılır
- Emoji kesinlikle kullanılmaz

### Mobil UX
- Bottom navigation (mobilde)
- Pull-to-refresh hissi
- Smooth scroll
- Touch gestures
- Native-like transitions
- Sticky headers
- Fast tap responses (300ms delay yok)

## Özellikler

### Public Özellikler
- ✅ Online teklif formu (lokal + uluslararası)
- ✅ Gelişmiş fiyat hesaplama
- ✅ Rezervasyon sistemi (SMTP email)
- ✅ Müşteri yorumları/referanslar
- ✅ Blog/içerik bölümü
- ✅ Galeri (öncesi/sonrası)
- ✅ WhatsApp Business entegrasyonu
- ✅ Google Maps entegrasyonu
- ❌ Canlı destek/chatbot (yok)
- ❌ Gönderi takibi (yok)
- ❌ Müşteri paneli (yok)

### Admin Panel Özellikleri
- ✅ Blog yazıları yönetimi
- ✅ Galeri görselleri yönetimi
- ✅ Müşteri yorumları yönetimi (onay/reddet)
- ✅ Tüm sayfalar düzenlenebilir (ana sayfa dahil)
- ✅ Hizmet sayfaları düzenlenebilir
- ✅ SSS yönetimi
- ✅ SEO meta bilgileri düzenlenebilir
- ✅ Fiyatlandırma formülü düzenlenebilir (lokal + uluslararası)
- ✅ İletişim bilgileri düzenlenebilir
- ✅ Site ayarları (domain, şirket adı, logo vs.)
- ✅ SMTP ayarları
- ✅ API key yönetimi
- ✅ Uluslararası ülke yönetimi
- ❌ Teklif/rezervasyon kayıtları (sadece email)

## Fiyat Hesaplama

### Lokal (Türkiye İçi)
1. Nereden → Nereye (Google Maps mesafe)
2. Ev büyüklüğü (m² veya oda sayısı)
3. Kat bilgisi (asansör var mı)
4. Eşya listesi (koltuk, yatak, dolap vs.)
5. Özel eşyalar (piyano, antika, kırılabilir)
6. Sigorta seçenekleri (temel/kapsamlı)
7. Paketleme malzemeleri
8. İşçilik (kaç kişi, kaç saat)
9. Araç tipi (kamyonet, kamyon, tır)
10. Sezon/gün farkı (hafta sonu, tatil)

### Uluslararası
1. Ülke seçimi
2. Mesafe (sabit paketler veya manuel)
3. Ev büyüklüğü
4. Eşya listesi
5. Gümrük/evrak işlemleri ücreti
6. Sigorta (seçilebilir)
7. Özel paketleme
8. Araç tipi
9. Sezon farkı
10. Ek hizmetler

**Admin panelden her iki tip için formül ayarlanabilir.**

## Veritabanı Yapısı

### Ana Tablolar
- `SiteSetting` - Site ayarları (domain, şirket adı, iletişim vs.)
- `Page` - Dinamik sayfalar (ana sayfa, hakkımızda vs.)
- `Post` - Blog yazıları
- `Gallery` - Galeri görselleri
- `Review` - Müşteri yorumları
- `FAQ` - SSS
- `PricingSetting` - Fiyatlandırma ayarları
- `Country` - Uluslararası ülkeler
- `User` - Admin kullanıcıları

**Detaylı schema için:** `docs/DATABASE-SCHEMA.md`

## SEO Stratejisi

### Meta Tags
- Dinamik title, description
- Open Graph tags
- Twitter Card tags
- Canonical URLs

### Schema.org (JSON-LD)
- LocalBusiness
- MovingCompany
- AggregateRating (yıldızlı görünüm)
- Service
- Review
- FAQPage
- BreadcrumbList
- Offers (fiyat aralığı)

### Sitemap & Robots
- Otomatik sitemap.xml
- robots.txt
- Dinamik URL'ler

**Detaylı strateji için:** `docs/SEO-STRATEGY.md`

## Environment Variables

**KRITIK:** Tüm domain ve URL bilgileri environment variables'dan gelir. Hiçbir yerde hardcode edilmez.

```env
# Database
DATABASE_URL="postgresql://..."

# Auth
NEXTAUTH_SECRET="..."
NEXTAUTH_URL="http://localhost:3000"  # Production'da domain değişir

# SMTP (Gmail)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"

# Google Maps
GOOGLE_MAPS_API_KEY="..."

# Admin Email
ADMIN_EMAIL="admin@yourdomain.com"  # Production'da değişir

# Site URL (KRITIK - Tüm absolute URL'ler buradan)
NEXT_PUBLIC_SITE_URL="http://localhost:3000"  # Production'da domain değişir
```

**Domain Bağımsızlığı:**
- Kodda hiçbir zaman `https://yourdomain.com` yazma
- Her zaman `process.env.NEXT_PUBLIC_SITE_URL` kullan
- Veritabanında domain `SiteSetting` tablosunda saklanır
- Admin panelden düzenlenebilir

## Geliştirme Kuralları

### Kod Kalitesi
1. **Temiz kod** - Okunabilir, maintainable
2. **TypeScript strict mode** - Tip güvenliği
3. **ESLint + Prettier** - Kod formatı
4. **Hiç emoji kullanma** - Sadece Lucide Icons
5. **Conditional rendering** - Veri yoksa görünmez
6. **Error handling** - Her API call için
7. **Loading states** - UX için önemli
8. **Responsive design** - Mobil öncelikli

### Veri Yönetimi
1. **Veri kaybı yok** - Dikkatli CRUD işlemleri
2. **Validation** - Zod ile her form
3. **Sanitization** - XSS koruması
4. **Database transactions** - Atomik işlemler

### Performance
1. **Image optimization** - Next.js Image component
2. **Code splitting** - Dynamic imports
3. **Lazy loading** - Gerektiğinde yükle
4. **Caching** - API responses
5. **PSI %100 hedef** - Mobil + Desktop

### Güvenlik
1. **NextAuth.js** - Güvenli authentication
2. **CSRF protection** - Form güvenliği
3. **SQL injection** - Prisma ile korunmalı
4. **XSS protection** - Input sanitization
5. **Rate limiting** - API koruması

## Deployment

### Vercel
- **Platform:** Vercel (önerilir)
- **Database:** Vercel Postgres
- **Domain:** Özel domain bağlanabilir
- **Environment variables:** Vercel dashboard'dan

**Detaylı deployment için:** `docs/DEPLOYMENT.md`

## Dil & Lokalizasyon
- **Sadece Türkçe** - Çok dilli sistem yok
- Tüm içerikler Türkçe
- Tarih/saat formatları Türkiye standartları

## Önemli Notlar

### Geliştirme Sırasında - KRITIK KURALLAR
1. **Hiçbir işi yarım bırakma** - "Sonra yaparım" YOK
2. **Tüm CRUD işlemleri eksiksiz** - Create, Read, Update, Delete hepsi çalışmalı
3. **Her değişiklikten sonra Internal Server Error kontrolü**
4. **Lint hatalarını mutlaka düzelt** - Hiç lint hatası bırakma
5. **Her geliştirmeyi test et** - Çalıştığından emin ol
6. **Frontend değişikliği → Frontend'de git, kontrol et, kullan**
7. **Backend değişikliği → Admin dashboard'a git, kontrol et, kullan**
8. **API geliştirme → Postman/Thunder Client ile test et**
9. **Database değişikliği → Prisma Studio'da kontrol et**
10. **Tüm .md dosyalarını oku ve context'i güncelle**
11. **Domain bağımsızlığı** - Hiçbir yerde domain hardcode etme
12. **Veri kaybı yok** - Her işlemde dikkatli ol

### Test Edilmesi Gerekenler
- [ ] Tüm formlar çalışıyor mu?
- [ ] SMTP email gidiyor mu?
- [ ] Fiyat hesaplama doğru mu?
- [ ] Admin panel tüm CRUD işlemleri?
- [ ] Responsive tasarım?
- [ ] SEO meta tags?
- [ ] Schema.org JSON-LD?
- [ ] Google Maps entegrasyonu?
- [ ] Image upload?
- [ ] Performance (PSI)?

## Dokümanlar

Tüm detaylı bilgiler `/docs` klasöründe:

1. `README.md` - Proje genel bilgi
2. `ARCHITECTURE.md` - Teknik mimari
3. `DATABASE-SCHEMA.md` - Veritabanı yapısı
4. `API-ROUTES.md` - API endpoint'ler
5. `ADMIN-GUIDE.md` - Admin panel kullanımı
6. `DEPLOYMENT.md` - Deployment rehberi
7. `SEO-STRATEGY.md` - SEO stratejisi
8. `PRICE-CALCULATOR.md` - Fiyat hesaplama
9. `TECH-STACK.md` - Teknoloji detayları
10. `DYNAMIC-CONTENT.md` - Dinamik içerik sistemi
11. `DEVELOPMENT-GUIDE.md` - Geliştirme rehberi

## İletişim Bilgileri (Placeholder)

Tüm bilgiler admin panelden düzenlenebilir:
- Şirket adı: [Admin panelden ayarlanacak]
- Domain: [Admin panelden ayarlanacak]
- Telefon: [Admin panelden ayarlanacak]
- Email: [Admin panelden ayarlanacak]
- WhatsApp: [Admin panelden ayarlanacak]
- Adres: [Admin panelden ayarlanacak]
- Logo: [Admin panelden yüklenecek]

## Versiyon
- **Proje Versiyonu:** 1.0.0
- **Next.js:** 15.1.4
- **React:** 18+
- **Node.js:** 18+ (önerilir)
- **PostgreSQL:** 14+

## Son Güncelleme
11 Mart 2026
