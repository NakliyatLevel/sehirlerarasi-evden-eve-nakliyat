# Evden Eve Nakliyat Web Sitesi

Modern, SEO uyumlu, %100 dinamik evden eve nakliyat web sitesi projesi.

## 🎯 Proje Özeti

Bu proje, evden eve nakliyat sektörü için geliştirilmiş, kurumsal ve profesyonel bir web sitesidir. Lokal (Türkiye içi) ve uluslararası nakliyat hizmetleri için gelişmiş fiyat hesaplama, online teklif formu, rezervasyon sistemi ve kapsamlı admin paneli içerir.

## ✨ Temel Özellikler

### Public Özellikler
- ✅ Gelişmiş fiyat hesaplama (lokal + uluslararası)
- ✅ Online teklif formu
- ✅ Rezervasyon sistemi (SMTP email)
- ✅ Müşteri yorumları ve referanslar
- ✅ Blog sistemi
- ✅ Galeri (öncesi/sonrası fotoğraflar)
- ✅ SSS (Sıkça Sorulan Sorular)
- ✅ WhatsApp Business entegrasyonu
- ✅ Google Maps entegrasyonu
- ✅ SEO optimizasyonu (PSI %100 hedef)
- ✅ Schema.org + JSON-LD (yıldızlı SERP)
- ✅ Mobil native app hissi

### Admin Panel Özellikleri
- ✅ Tüm sayfalar düzenlenebilir (ana sayfa dahil)
- ✅ Blog yönetimi (ekle/düzenle/sil)
- ✅ Galeri yönetimi
- ✅ Müşteri yorumları yönetimi (onay/reddet)
- ✅ Hizmet sayfaları düzenlenebilir
- ✅ SSS yönetimi
- ✅ SEO meta bilgileri düzenlenebilir
- ✅ Fiyatlandırma formülü düzenlenebilir
- ✅ Site ayarları (domain, şirket adı, logo, iletişim)
- ✅ SMTP ayarları
- ✅ API key yönetimi
- ✅ Uluslararası ülke yönetimi

## 🚀 Teknoloji Stack

### Frontend
- **Next.js 15.1.4** - App Router, SSR/SSG
- **React 18+** - Modern UI
- **TypeScript** - Tip güvenliği
- **TailwindCSS** - Utility-first CSS
- **Shadcn/ui** - Komponent kütüphanesi
- **Framer Motion** - Animasyonlar
- **Lucide Icons** - İkon kütüphanesi

### Backend
- **PostgreSQL** - Veritabanı
- **Prisma ORM** - Type-safe database client
- **Next.js API Routes** - Backend API
- **NextAuth.js v5** - Authentication

### Form & Validation
- **Zod** - Schema validation
- **React Hook Form** - Form yönetimi

### SEO & Performance
- **next-seo** - SEO meta yönetimi
- **next-sitemap** - Otomatik sitemap
- **sharp** - Image optimization
- **schema-dts** - TypeScript Schema.org

### Email & Maps
- **React Email** - Email templates
- **Nodemailer** - SMTP client
- **Google Maps Distance Matrix API** - Mesafe hesaplama

## 📋 Gereksinimler

- **Node.js** 18+ (önerilir: 20+)
- **PostgreSQL** 14+
- **npm** veya **yarn** veya **pnpm**

## 🛠️ Kurulum

### 1. Repository'yi Klonlayın

```bash
git clone <repository-url>
cd colak
```

### 2. Bağımlılıkları Yükleyin

```bash
npm install
# veya
yarn install
# veya
pnpm install
```

### 3. Environment Variables Ayarlayın

`.env.example` dosyasını `.env` olarak kopyalayın:

```bash
cp .env.example .env
```

`.env` dosyasını düzenleyin:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/nakliyat"

# Auth
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# SMTP (Gmail)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"

# Google Maps
GOOGLE_MAPS_API_KEY="your-google-maps-api-key"

# Admin Email
ADMIN_EMAIL="admin@yourdomain.com"

# Site URL
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

### 4. Veritabanını Hazırlayın

```bash
# Prisma migration
npx prisma migrate dev

# Seed data (opsiyonel)
npx prisma db seed
```

### 5. Geliştirme Sunucusunu Başlatın

```bash
npm run dev
# veya
yarn dev
# veya
pnpm dev
```

Tarayıcınızda `http://localhost:3000` adresini açın.

## 📁 Proje Yapısı

```
/app
  /(marketing)              # Public sayfalar
    /page.tsx               # Ana sayfa
    /hizmetlerimiz/         # Hizmet sayfaları
    /hakkimizda/
    /referanslar/
    /galeri/
    /blog/
    /sss/
    /iletisim/
    /teklif-al/
  /karakar/                 # Admin panel (auth korumalı)
    /dashboard/
    /sayfalar/
    /blog/
    /galeri/
    /yorumlar/
    /fiyatlandirma/
    /ayarlar/
  /api/                     # API routes
/components
  /ui/                      # Shadcn components
  /marketing/               # Public components
  /admin/                   # Admin components
  /forms/
  /email/
/lib
  /db/                      # Database utilities
  /validations/             # Zod schemas
  /utils/
  /email/
/prisma
  /schema.prisma            # Database schema
/public
  /uploads/                 # Yüklenen görseller
  /images/
/docs                       # Dokümanlar
```

## 🎨 Tasarım Sistemi

### Renkler
- **Primary:** `#1e455f` (Koyu mavi)
- **Secondary:** `#cb2b24` (Kırmızı)
- **Background:** Beyaz zemin

### İkonlar
- **Lucide Icons** kullanılır
- Emoji kullanılmaz

### Mobil UX
- Native app hissi
- Touch gestures
- Smooth animations
- Fast tap responses
- PWA değil

## 🔐 Admin Panel

Admin panele erişim: `http://localhost:3000/karakar`

**İlk admin kullanıcısı:**
- Email: `admin@example.com`
- Şifre: `admin123` (ilk girişte değiştirin)

## 📊 Veritabanı

Detaylı veritabanı şeması için: [`docs/DATABASE-SCHEMA.md`](./DATABASE-SCHEMA.md)

### Ana Tablolar
- `SiteSetting` - Site ayarları
- `Page` - Dinamik sayfalar
- `Post` - Blog yazıları
- `Gallery` - Galeri görselleri
- `Review` - Müşteri yorumları
- `FAQ` - SSS
- `PricingSetting` - Fiyatlandırma
- `Country` - Uluslararası ülkeler
- `User` - Admin kullanıcıları

## 🌐 API Routes

Detaylı API dokümantasyonu için: [`docs/API-ROUTES.md`](./API-ROUTES.md)

### Public API
- `POST /api/contact` - İletişim formu
- `POST /api/quote/lokal` - Lokal teklif
- `POST /api/quote/international` - Uluslararası teklif
- `GET /api/blog` - Blog listesi
- `GET /api/blog/[slug]` - Blog detay

### Admin API (Auth gerekli)
- `GET/POST/PUT/DELETE /api/admin/blog`
- `GET/POST/PUT/DELETE /api/admin/gallery`
- `GET/POST/PUT/DELETE /api/admin/reviews`
- `GET/PUT /api/admin/settings`

## 🔍 SEO

Detaylı SEO stratejisi için: [`docs/SEO-STRATEGY.md`](./SEO-STRATEGY.md)

### Özellikler
- Dinamik meta tags
- Open Graph + Twitter Card
- Schema.org JSON-LD
- Yıldızlı SERP görünümü
- Otomatik sitemap.xml
- robots.txt
- Canonical URLs

## 💰 Fiyat Hesaplama

Detaylı fiyat hesaplama mantığı için: [`docs/PRICE-CALCULATOR.md`](./PRICE-CALCULATOR.md)

### Lokal (Türkiye İçi)
- Google Maps mesafe hesaplama
- Ev büyüklüğü
- Kat bilgisi
- Eşya listesi
- Sigorta seçenekleri
- Paketleme malzemeleri
- Araç tipi
- Sezon/gün farkı

### Uluslararası
- Ülke seçimi
- Mesafe paketleri
- Gümrük/evrak işlemleri
- Sigorta (seçilebilir)
- Özel paketleme
- Ek hizmetler

## 📧 Email Sistemi

### SMTP Ayarları
- Gmail SMTP desteği
- Özel sunucu SMTP desteği
- React Email templates
- Responsive email tasarımı

### Email Tipleri
- Teklif formu (müşteriye + admin)
- Rezervasyon (müşteriye + admin)
- İletişim formu (admin)

## 🚀 Deployment

Detaylı deployment rehberi için: [`docs/DEPLOYMENT.md`](./DEPLOYMENT.md)

### Vercel (Önerilir)

1. GitHub'a push edin
2. Vercel'e import edin
3. Environment variables ekleyin
4. Deploy edin

### Diğer Platformlar
- Netlify
- Railway
- Render
- Kendi sunucunuz

## 📚 Dokümanlar

Tüm detaylı dokümanlar `/docs` klasöründe:

1. [`ARCHITECTURE.md`](./ARCHITECTURE.md) - Teknik mimari
2. [`DATABASE-SCHEMA.md`](./DATABASE-SCHEMA.md) - Veritabanı yapısı
3. [`API-ROUTES.md`](./API-ROUTES.md) - API endpoint'ler
4. [`ADMIN-GUIDE.md`](./ADMIN-GUIDE.md) - Admin panel kullanımı
5. [`DEPLOYMENT.md`](./DEPLOYMENT.md) - Deployment rehberi
6. [`SEO-STRATEGY.md`](./SEO-STRATEGY.md) - SEO stratejisi
7. [`PRICE-CALCULATOR.md`](./PRICE-CALCULATOR.md) - Fiyat hesaplama
8. [`TECH-STACK.md`](./TECH-STACK.md) - Teknoloji detayları
9. [`DYNAMIC-CONTENT.md`](./DYNAMIC-CONTENT.md) - Dinamik içerik sistemi
10. [`DEVELOPMENT-GUIDE.md`](./DEVELOPMENT-GUIDE.md) - Geliştirme rehberi

## 🧪 Test

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Type check
npm run type-check

# Lint
npm run lint

# Format
npm run format
```

## 🛡️ Güvenlik

- NextAuth.js authentication
- CSRF protection
- SQL injection koruması (Prisma)
- XSS protection
- Rate limiting
- Input validation (Zod)

## 📈 Performance

- Image optimization (Next.js Image)
- Code splitting
- Lazy loading
- Caching
- PSI %100 hedef (Mobil + Desktop)

## 🌍 Dil

- **Sadece Türkçe** - Çok dilli sistem yok
- Tarih/saat formatları Türkiye standartları

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'feat: Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📝 Lisans

Bu proje özel bir projedir. Tüm hakları saklıdır.

## 📞 İletişim

Proje ile ilgili sorularınız için:
- Email: [Admin panelden ayarlanacak]
- Website: [Admin panelden ayarlanacak]

## 🙏 Teşekkürler

Bu proje aşağıdaki açık kaynak projeleri kullanmaktadır:
- Next.js
- React
- Prisma
- TailwindCSS
- Shadcn/ui
- Ve diğerleri...

---

**Versiyon:** 1.0.0  
**Son Güncelleme:** 11 Mart 2026
