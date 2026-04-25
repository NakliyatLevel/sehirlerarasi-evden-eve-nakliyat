# Veritabanı Şeması

Bu doküman, projenin PostgreSQL veritabanı şemasını detaylı olarak açıklar.

## Genel Bakış

Veritabanı tamamen dinamik bir yapıya sahiptir. Tüm içerikler, ayarlar ve yapılandırmalar veritabanından yönetilir. Hardcode veri yoktur.

## Prisma Schema

### Datasource & Generator

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}
```

## Tablolar

### 1. SiteSetting (Site Ayarları)

Tüm site ayarları key-value formatında saklanır.

```prisma
model SiteSetting {
  id        String   @id @default(cuid())
  key       String   @unique
  value     String   @db.Text
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([key])
}
```

**Örnek Kayıtlar:**

| key | value |
|-----|-------|
| `site_title` | "Çolak Nakliyat" |
| `company_name` | "Çolak Evden Eve Nakliyat Ltd." |
| `domain` | "colaknakli.com" |
| `phone` | "+90 555 123 4567" |
| `email` | "info@colaknakli.com" |
| `whatsapp` | "+90 555 123 4567" |
| `address` | "İstanbul, Türkiye" |
| `logo_url` | "/uploads/logo.png" |
| `logo_alt_url` | "/uploads/logo-white.png" |
| `seo_title` | "Evden Eve Nakliyat - Çolak Nakliyat" |
| `seo_description` | "Profesyonel evden eve nakliyat hizmetleri..." |
| `google_analytics_id` | "G-XXXXXXXXXX" |
| `facebook_url` | "https://facebook.com/..." |
| `instagram_url` | "https://instagram.com/..." |
| `twitter_url` | "https://twitter.com/..." |

**Kullanım:**

```typescript
const settings = await prisma.siteSetting.findMany()
const phone = await prisma.siteSetting.findUnique({ where: { key: 'phone' } })
```

---

### 2. User (Admin Kullanıcıları)

Admin paneline erişim için kullanıcı yönetimi.

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String   // Bcrypt hashed
  name      String
  role      String   @default("admin") // admin, editor, viewer
  active    Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([email])
}
```

**Roller:**
- `admin` - Tam yetki
- `editor` - İçerik düzenleme
- `viewer` - Sadece görüntüleme

---

### 3. Page (Dinamik Sayfalar)

Tüm sayfalar (ana sayfa, hakkımızda, hizmetler vs.) dinamik olarak yönetilir.

```prisma
model Page {
  id          String   @id @default(cuid())
  slug        String   @unique
  title       String
  content     Json     // Flexible content blocks
  seoTitle    String?
  seoDesc     String?  @db.Text
  seoKeywords String?  @db.Text
  published   Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([slug])
  @@index([published])
}
```

**Content JSON Yapısı:**

```json
{
  "blocks": [
    {
      "type": "hero",
      "data": {
        "title": "Profesyonel Evden Eve Nakliyat",
        "subtitle": "Güvenli ve hızlı taşımacılık",
        "image": "/uploads/hero.jpg",
        "cta": {
          "text": "Teklif Al",
          "link": "/teklif-al"
        }
      }
    },
    {
      "type": "text",
      "data": {
        "content": "<p>Lorem ipsum...</p>"
      }
    },
    {
      "type": "features",
      "data": {
        "items": [
          {
            "icon": "truck",
            "title": "Hızlı Teslimat",
            "description": "..."
          }
        ]
      }
    }
  ]
}
```

**Örnek Sayfalar:**
- `home` - Ana sayfa
- `hakkimizda` - Hakkımızda
- `iletisim` - İletişim
- `ev-tasima` - Ev Taşıma Hizmeti
- `ofis-tasima` - Ofis Taşıma Hizmeti

---

### 4. Post (Blog Yazıları)

```prisma
model Post {
  id          String   @id @default(cuid())
  slug        String   @unique
  title       String
  excerpt     String?  @db.Text
  content     String   @db.Text
  image       String?
  author      String   @default("Admin")
  seoTitle    String?
  seoDesc     String?  @db.Text
  seoKeywords String?  @db.Text
  published   Boolean  @default(false)
  publishedAt DateTime?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  categories  PostCategory[]

  @@index([slug])
  @@index([published])
  @@index([publishedAt])
}

model Category {
  id          String   @id @default(cuid())
  name        String   @unique
  slug        String   @unique
  description String?  @db.Text
  createdAt   DateTime @default(now())
  
  posts       PostCategory[]

  @@index([slug])
}

model PostCategory {
  postId     String
  categoryId String
  
  post       Post     @relation(fields: [postId], references: [id], onDelete: Cascade)
  category   Category @relation(fields: [categoryId], references: [id], onDelete: Cascade)

  @@id([postId, categoryId])
  @@index([postId])
  @@index([categoryId])
}
```

**Kategoriler:**
- Nakliyat İpuçları
- Taşınma Rehberi
- Haberler
- Müşteri Hikayeleri

---

### 5. Gallery (Galeri)

```prisma
model Gallery {
  id          String   @id @default(cuid())
  title       String
  description String?  @db.Text
  image       String
  thumbnail   String?
  category    String   // ev-tasima, ofis-tasima, uluslararasi
  beforeImage String?  // Öncesi fotoğrafı
  afterImage  String?  // Sonrası fotoğrafı
  order       Int      @default(0)
  active      Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([category])
  @@index([active])
  @@index([order])
}
```

**Kategoriler:**
- `ev-tasima` - Ev Taşıma
- `ofis-tasima` - Ofis Taşıma
- `uluslararasi` - Uluslararası Nakliyat
- `parca-esya` - Parça Eşya
- `asansorlu` - Asansörlü Taşıma

---

### 6. Review (Müşteri Yorumları)

```prisma
model Review {
  id          String   @id @default(cuid())
  name        String
  email       String?
  phone       String?
  rating      Int      // 1-5
  comment     String   @db.Text
  service     String   // Hangi hizmet için
  location    String?  // Nereden nereye
  approved    Boolean  @default(false)
  featured    Boolean  @default(false) // Öne çıkan yorumlar
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([approved])
  @@index([featured])
  @@index([rating])
  @@index([createdAt])
}
```

**Service Değerleri:**
- `ev-tasima` - Ev Taşıma
- `ofis-tasima` - Ofis Taşıma
- `uluslararasi` - Uluslararası
- `parca-esya` - Parça Eşya

---

### 7. FAQ (Sıkça Sorulan Sorular)

```prisma
model FAQ {
  id          String   @id @default(cuid())
  question    String
  answer      String   @db.Text
  category    String?  // genel, fiyatlandirma, hizmetler
  order       Int      @default(0)
  active      Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([category])
  @@index([active])
  @@index([order])
}
```

**Kategoriler:**
- `genel` - Genel Sorular
- `fiyatlandirma` - Fiyatlandırma
- `hizmetler` - Hizmetler
- `rezervasyon` - Rezervasyon

---

### 8. PricingSetting (Fiyatlandırma Ayarları)

Lokal ve uluslararası fiyat hesaplama formülleri.

```prisma
model PricingSetting {
  id        String   @id @default(cuid())
  type      String   // lokal, international
  key       String
  value     Json     // Flexible pricing rules
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@unique([type, key])
  @@index([type])
}
```

**Lokal Fiyatlandırma JSON:**

```json
{
  "basePrice": 1000,
  "pricePerKm": 5,
  "pricePerM2": 10,
  "pricePerFloor": 100,
  "elevatorDiscount": 0.2,
  "items": {
    "koltuk": 50,
    "yatak": 100,
    "dolap": 150,
    "buzdolabi": 200,
    "camasir_makinesi": 150,
    "piyano": 500
  },
  "insurance": {
    "none": 0,
    "basic": 200,
    "comprehensive": 500
  },
  "packaging": {
    "karton_kucuk": 10,
    "karton_buyuk": 20,
    "strec_film": 50,
    "bubble_wrap": 30
  },
  "vehicles": {
    "kamyonet": 0,
    "kamyon": 500,
    "tir": 1500
  },
  "seasonMultiplier": {
    "low": 0.8,
    "normal": 1.0,
    "high": 1.3
  },
  "weekendMultiplier": 1.2
}
```

**Uluslararası Fiyatlandırma JSON:**

```json
{
  "basePrice": 5000,
  "customsFee": 1000,
  "documentFee": 500,
  "insurance": {
    "basic": 1000,
    "comprehensive": 2500
  },
  "packaging": {
    "standard": 500,
    "premium": 1500
  }
}
```

---

### 9. Country (Uluslararası Ülkeler)

```prisma
model Country {
  id              String   @id @default(cuid())
  name            String   // Almanya
  code            String   @unique // DE
  flag            String?  // Emoji veya URL
  active          Boolean  @default(true)
  basePrice       Float    // Temel fiyat
  pricePerKm      Float    // Km başı fiyat
  customsFee      Float    // Gümrük ücreti
  insuranceRate   Float    // Sigorta oranı %
  estimatedDays   Int      // Tahmini süre (gün)
  description     String?  @db.Text
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  @@index([code])
  @@index([active])
}
```

**Örnek Ülkeler:**
- Almanya (DE)
- Hollanda (NL)
- Belçika (BE)
- Fransa (FR)
- Avusturya (AT)
- İsviçre (CH)

---

### 10. Service (Hizmetler)

```prisma
model Service {
  id          String   @id @default(cuid())
  slug        String   @unique
  name        String
  description String   @db.Text
  icon        String?  // Lucide icon name
  image       String?
  features    Json     // Özellikler listesi
  active      Boolean  @default(true)
  order       Int      @default(0)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([slug])
  @@index([active])
  @@index([order])
}
```

**Features JSON:**

```json
{
  "features": [
    "Profesyonel ekip",
    "Sigortalı taşıma",
    "Paketleme hizmeti",
    "Montaj-demontaj"
  ],
  "includes": [
    "Ücretsiz keşif",
    "Nakliye sigortası",
    "Paketleme malzemesi"
  ]
}
```

---

### 11. City (Şehirler - Lokal için)

```prisma
model City {
  id          String   @id @default(cuid())
  name        String   @unique
  slug        String   @unique
  region      String   // Marmara, Ege, Akdeniz, vs.
  active      Boolean  @default(true)
  popular     Boolean  @default(false)
  latitude    Float?
  longitude   Float?
  createdAt   DateTime @default(now())

  @@index([slug])
  @@index([active])
  @@index([popular])
}
```

**Popüler Şehirler:**
- İstanbul
- Ankara
- İzmir
- Bursa
- Antalya

---

### 12. ContactSubmission (İletişim Formları - Opsiyonel)

SMTP ile gönderilir ama opsiyonel olarak veritabanına da kaydedilebilir.

```prisma
model ContactSubmission {
  id        String   @id @default(cuid())
  name      String
  email     String
  phone     String
  subject   String?
  message   String   @db.Text
  read      Boolean  @default(false)
  createdAt DateTime @default(now())

  @@index([read])
  @@index([createdAt])
}
```

---

## İlişkiler Diyagramı

```
User
  └─ (Yönetir) → Page, Post, Gallery, Review, FAQ

Post ─┬─ PostCategory ─── Category
      └─ (Yazar: User)

Review
  └─ (İlişkili) → Service

Country
  └─ (Kullanılır) → PricingSetting (international)

City
  └─ (Kullanılır) → PricingSetting (lokal)
```

## Indexes

Performans için önemli indexler:

```prisma
// Sık aranan alanlar
@@index([slug])
@@index([published])
@@index([active])
@@index([createdAt])

// Unique constraints
@@unique([email])
@@unique([slug])
@@unique([code])

// Composite indexes
@@index([type, key])
@@index([postId, categoryId])
```

## Migrations

### İlk Migration

```bash
npx prisma migrate dev --name init
```

### Seed Data

```typescript
// prisma/seed.ts
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Admin kullanıcı
  const hashedPassword = await bcrypt.hash('admin123', 10)
  await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      password: hashedPassword,
      name: 'Admin',
      role: 'admin'
    }
  })

  // Site ayarları
  const settings = [
    { key: 'site_title', value: 'Evden Eve Nakliyat' },
    { key: 'company_name', value: 'Nakliyat Ltd.' },
    { key: 'domain', value: 'localhost:3000' },
  ]

  for (const setting of settings) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting
    })
  }

  // Kategoriler
  const categories = ['Nakliyat İpuçları', 'Taşınma Rehberi', 'Haberler']
  for (const name of categories) {
    await prisma.category.upsert({
      where: { slug: name.toLowerCase().replace(/\s+/g, '-') },
      update: {},
      create: {
        name,
        slug: name.toLowerCase().replace(/\s+/g, '-')
      }
    })
  }

  console.log('Seed completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
```

## Backup & Restore

### Backup

```bash
pg_dump -h localhost -U username -d nakliyat > backup.sql
```

### Restore

```bash
psql -h localhost -U username -d nakliyat < backup.sql
```

## Performans İpuçları

1. **Connection Pooling:** Prisma otomatik connection pooling yapar
2. **Indexes:** Sık sorgulanan alanlara index ekleyin
3. **Select:** Sadece gerekli alanları seçin
4. **Pagination:** Büyük listelerde pagination kullanın
5. **Caching:** React cache() ile sonuçları cache'leyin

---

**Versiyon:** 1.0.0  
**Son Güncelleme:** 11 Mart 2026
