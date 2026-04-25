# Evden Eve Nakliyat Web Sitesi

Modern, SEO uyumlu, %100 dinamik evden eve nakliyat web sitesi.

## 🚀 Hızlı Başlangıç

```bash
# Bağımlılıkları yükle
npm install

# Environment variables ayarla
cp .env.example .env
# .env dosyasını düzenle

# Veritabanını hazırla
npx prisma migrate dev
npx prisma db seed

# Geliştirme sunucusunu başlat
npm run dev
```

Tarayıcıda `http://localhost:3000` adresini aç.

## 📋 Özellikler

### Public
- ✅ Gelişmiş fiyat hesaplama (lokal + uluslararası)
- ✅ Online teklif formu
- ✅ Rezervasyon sistemi
- ✅ Müşteri yorumları
- ✅ Blog sistemi
- ✅ Galeri
- ✅ SEO optimizasyonu (PSI %100 hedef)
- ✅ Schema.org + JSON-LD (yıldızlı SERP)
- ✅ Mobil native app hissi

### Admin Panel
- ✅ Tüm sayfalar düzenlenebilir
- ✅ Blog yönetimi
- ✅ Galeri yönetimi
- ✅ Yorum yönetimi
- ✅ Fiyatlandırma ayarları
- ✅ Site ayarları
- ✅ SMTP ayarları

## 🛠️ Teknoloji Stack

- **Next.js 15.1.4** - Framework
- **React 18+** - UI Library
- **TypeScript** - Type Safety
- **PostgreSQL** - Database
- **Prisma** - ORM
- **TailwindCSS** - Styling
- **Shadcn/ui** - Components
- **NextAuth.js** - Authentication

## 📁 Proje Yapısı

```
/app
  /(marketing)     # Public sayfalar
  /karakar         # Admin panel
  /api             # API routes
/components
  /ui              # Shadcn components
  /marketing       # Public components
  /admin           # Admin components
/lib               # Utilities
/prisma            # Database schema
/docs              # Dokümanlar
```

## 📚 Dokümanlar

Detaylı dokümanlar `/docs` klasöründe:

- [`README.md`](./docs/README.md) - Genel bilgi
- [`ARCHITECTURE.md`](./docs/ARCHITECTURE.md) - Teknik mimari
- [`DATABASE-SCHEMA.md`](./docs/DATABASE-SCHEMA.md) - Veritabanı
- [`API-ROUTES.md`](./docs/API-ROUTES.md) - API endpoint'ler
- [`ADMIN-GUIDE.md`](./docs/ADMIN-GUIDE.md) - Admin kullanımı
- [`DEPLOYMENT.md`](./docs/DEPLOYMENT.md) - Deployment
- [`SEO-STRATEGY.md`](./docs/SEO-STRATEGY.md) - SEO stratejisi
- [`PRICE-CALCULATOR.md`](./docs/PRICE-CALCULATOR.md) - Fiyat hesaplama
- [`TECH-STACK.md`](./docs/TECH-STACK.md) - Teknoloji detayları
- [`DYNAMIC-CONTENT.md`](./docs/DYNAMIC-CONTENT.md) - Dinamik içerik
- [`DEVELOPMENT-GUIDE.md`](./docs/DEVELOPMENT-GUIDE.md) - Geliştirme rehberi

## 🔐 Admin Panel

**URL:** `http://localhost:3000/karakar`

**İlk Giriş:**
- Email: `admin@example.com`
- Şifre: `admin123`

**Güvenlik:** İlk girişte şifrenizi değiştirin!

## 🌐 Environment Variables

```env
# Database
DATABASE_URL="postgresql://..."

# Auth
NEXTAUTH_SECRET="..."
NEXTAUTH_URL="http://localhost:3000"

# SMTP
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"

# Google Maps
GOOGLE_MAPS_API_KEY="..."

# Admin Email
ADMIN_EMAIL="admin@yourdomain.com"

# Site URL
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

## 🚀 Deployment

### Vercel (Önerilir)

1. GitHub'a push edin
2. Vercel'e import edin
3. Environment variables ekleyin
4. Deploy edin

Detaylı bilgi: [`docs/DEPLOYMENT.md`](./docs/DEPLOYMENT.md)

## 📊 Scripts

```bash
npm run dev          # Geliştirme sunucusu
npm run build        # Production build
npm run start        # Production sunucusu
npm run lint         # ESLint
npm run type-check   # TypeScript check
npm run format       # Prettier format
```

## 🎨 Tasarım

- **Primary:** `#1e455f` (Koyu mavi)
- **Secondary:** `#cb2b24` (Kırmızı)
- **Background:** Beyaz zemin
- **Icons:** Lucide Icons (emoji yok)

## 🔒 Güvenlik

- NextAuth.js authentication
- CSRF protection
- SQL injection koruması (Prisma)
- XSS protection
- Input validation (Zod)

## 📈 Performance

- Image optimization (Next.js Image)
- Code splitting
- Lazy loading
- Caching
- PSI %100 hedef

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun
3. Commit edin
4. Push edin
5. Pull Request açın

## 📝 Lisans

Bu proje özel bir projedir. Tüm hakları saklıdır.

## 📞 İletişim

Proje ile ilgili sorularınız için dokümanları inceleyin.

---

**Versiyon:** 1.0.0  
**Son Güncelleme:** 11 Mart 2026
