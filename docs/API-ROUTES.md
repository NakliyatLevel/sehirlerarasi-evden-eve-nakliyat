# API Routes Dokümantasyonu

Bu doküman, projedeki tüm API endpoint'lerini detaylı olarak açıklar.

## Genel Bilgiler

### Base URL
- **Development:** `http://localhost:3000/api`
- **Production:** `https://yourdomain.com/api`

### Response Format

**Success Response:**
```json
{
  "success": true,
  "data": {...},
  "message": "İşlem başarılı"
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Hata mesajı",
  "details": {...}
}
```

### Authentication

Admin API'leri NextAuth.js session ile korunur:

```typescript
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

const session = await getServerSession(authOptions)
if (!session) {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
}
```

---

## Public API Endpoints

### 1. İletişim Formu

**Endpoint:** `POST /api/contact`

**Request Body:**
```json
{
  "name": "Ahmet Yılmaz",
  "email": "ahmet@example.com",
  "phone": "+90 555 123 4567",
  "subject": "Fiyat Teklifi",
  "message": "Merhaba, İstanbul'dan Ankara'ya taşınacağım..."
}
```

**Validation (Zod):**
```typescript
const contactSchema = z.object({
  name: z.string().min(2, 'İsim en az 2 karakter olmalı'),
  email: z.string().email('Geçerli bir email adresi girin'),
  phone: z.string().min(10, 'Geçerli bir telefon numarası girin'),
  subject: z.string().optional(),
  message: z.string().min(10, 'Mesaj en az 10 karakter olmalı')
})
```

**Response:**
```json
{
  "success": true,
  "message": "Mesajınız başarıyla gönderildi"
}
```

**Email Gönderimi:**
- Müşteriye otomatik yanıt
- Admin'e bildirim emaili

---

### 2. Lokal Teklif Formu

**Endpoint:** `POST /api/quote/lokal`

**Request Body:**
```json
{
  "personalInfo": {
    "name": "Ahmet Yılmaz",
    "email": "ahmet@example.com",
    "phone": "+90 555 123 4567"
  },
  "moveDetails": {
    "from": "İstanbul, Kadıköy",
    "to": "Ankara, Çankaya",
    "homeSize": 120,
    "homeSizeUnit": "m2",
    "floor": 3,
    "hasElevator": false,
    "moveDate": "2026-04-15"
  },
  "items": [
    { "name": "Koltuk Takımı", "quantity": 1 },
    { "name": "Yatak", "quantity": 2 },
    { "name": "Dolap", "quantity": 3 }
  ],
  "specialItems": [
    { "name": "Piyano", "description": "Kuyruklu piyano" }
  ],
  "services": {
    "insurance": "comprehensive",
    "packaging": true,
    "assembly": true,
    "storage": false
  },
  "packagingMaterials": [
    { "name": "Karton Kutu (Büyük)", "quantity": 20 },
    { "name": "Streç Film", "quantity": 5 }
  ],
  "vehicle": "kamyon"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "estimatedPrice": 8500,
    "breakdown": {
      "basePrice": 1000,
      "distancePrice": 2000,
      "homeSizePrice": 1200,
      "floorPrice": 300,
      "itemsPrice": 1500,
      "specialItemsPrice": 500,
      "insurancePrice": 500,
      "packagingPrice": 800,
      "vehiclePrice": 500,
      "seasonMultiplier": 1.2
    },
    "distance": 450,
    "estimatedDuration": "6-8 saat"
  },
  "message": "Teklif başarıyla oluşturuldu"
}
```

**İşlem Adımları:**
1. Form validasyonu
2. Google Maps API ile mesafe hesaplama
3. Fiyat hesaplama (veritabanından formül çekme)
4. Email gönderimi (müşteri + admin)

---

### 3. Uluslararası Teklif Formu

**Endpoint:** `POST /api/quote/international`

**Request Body:**
```json
{
  "personalInfo": {
    "name": "Ahmet Yılmaz",
    "email": "ahmet@example.com",
    "phone": "+90 555 123 4567"
  },
  "moveDetails": {
    "from": "İstanbul, Türkiye",
    "to": "Berlin, Almanya",
    "countryCode": "DE",
    "homeSize": 150,
    "moveDate": "2026-05-01"
  },
  "items": [
    { "name": "Mobilya", "volume": 25, "weight": 500 }
  ],
  "services": {
    "insurance": "comprehensive",
    "packaging": "premium",
    "customs": true,
    "storage": false
  },
  "additionalInfo": "Antika eşyalar var"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "estimatedPrice": 15000,
    "breakdown": {
      "basePrice": 5000,
      "countryPrice": 4000,
      "volumePrice": 2500,
      "insurancePrice": 2500,
      "packagingPrice": 1500,
      "customsFee": 1000,
      "documentFee": 500
    },
    "estimatedDays": 7,
    "country": {
      "name": "Almanya",
      "code": "DE"
    }
  },
  "message": "Teklif başarıyla oluşturuldu"
}
```

---

### 4. Blog Listesi

**Endpoint:** `GET /api/blog`

**Query Parameters:**
- `page` (number, default: 1)
- `limit` (number, default: 10)
- `category` (string, optional)
- `search` (string, optional)

**Request:**
```
GET /api/blog?page=1&limit=10&category=nakliyat-ipuclari
```

**Response:**
```json
{
  "success": true,
  "data": {
    "posts": [
      {
        "id": "clx...",
        "slug": "tasima-oncesi-yapilmasi-gerekenler",
        "title": "Taşıma Öncesi Yapılması Gerekenler",
        "excerpt": "Taşınma sürecini kolaylaştırmak için...",
        "image": "/uploads/blog-1.jpg",
        "author": "Admin",
        "publishedAt": "2026-03-01T10:00:00Z",
        "categories": ["Nakliyat İpuçları"]
      }
    ],
    "pagination": {
      "total": 45,
      "page": 1,
      "limit": 10,
      "totalPages": 5
    }
  }
}
```

---

### 5. Blog Detay

**Endpoint:** `GET /api/blog/[slug]`

**Request:**
```
GET /api/blog/tasima-oncesi-yapilmasi-gerekenler
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "clx...",
    "slug": "tasima-oncesi-yapilmasi-gerekenler",
    "title": "Taşıma Öncesi Yapılması Gerekenler",
    "content": "<p>Taşınma sürecini kolaylaştırmak için...</p>",
    "image": "/uploads/blog-1.jpg",
    "author": "Admin",
    "seoTitle": "Taşıma Öncesi Yapılması Gerekenler | Blog",
    "seoDesc": "Taşınma öncesi hazırlık ipuçları...",
    "publishedAt": "2026-03-01T10:00:00Z",
    "categories": ["Nakliyat İpuçları"],
    "relatedPosts": [...]
  }
}
```

---

### 6. Yorumlar (Public)

**Endpoint:** `GET /api/reviews`

**Query Parameters:**
- `limit` (number, default: 10)
- `service` (string, optional)
- `featured` (boolean, optional)

**Request:**
```
GET /api/reviews?limit=5&featured=true
```

**Response:**
```json
{
  "success": true,
  "data": {
    "reviews": [
      {
        "id": "clx...",
        "name": "Ayşe K.",
        "rating": 5,
        "comment": "Çok memnun kaldık, profesyonel ekip...",
        "service": "Ev Taşıma",
        "location": "İstanbul → Ankara",
        "createdAt": "2026-02-15T14:30:00Z"
      }
    ],
    "stats": {
      "averageRating": 4.8,
      "totalReviews": 150
    }
  }
}
```

---

### 7. SSS

**Endpoint:** `GET /api/faq`

**Query Parameters:**
- `category` (string, optional)

**Request:**
```
GET /api/faq?category=fiyatlandirma
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "clx...",
      "question": "Fiyat nasıl hesaplanır?",
      "answer": "Fiyatlandırma mesafe, ev büyüklüğü...",
      "category": "fiyatlandirma"
    }
  ]
}
```

---

### 8. Galeri

**Endpoint:** `GET /api/gallery`

**Query Parameters:**
- `category` (string, optional)
- `limit` (number, default: 20)

**Request:**
```
GET /api/gallery?category=ev-tasima&limit=12
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "clx...",
      "title": "İstanbul Ev Taşıma",
      "image": "/uploads/gallery-1.jpg",
      "thumbnail": "/uploads/gallery-1-thumb.jpg",
      "category": "ev-tasima",
      "beforeImage": "/uploads/before-1.jpg",
      "afterImage": "/uploads/after-1.jpg"
    }
  ]
}
```

---

### 9. Site Ayarları (Public)

**Endpoint:** `GET /api/settings/public`

**Response:**
```json
{
  "success": true,
  "data": {
    "site_title": "Çolak Nakliyat",
    "company_name": "Çolak Evden Eve Nakliyat Ltd.",
    "phone": "+90 555 123 4567",
    "email": "info@colaknakli.com",
    "whatsapp": "+90 555 123 4567",
    "address": "İstanbul, Türkiye",
    "logo_url": "/uploads/logo.png",
    "social": {
      "facebook": "https://facebook.com/...",
      "instagram": "https://instagram.com/...",
      "twitter": "https://twitter.com/..."
    }
  }
}
```

---

## Admin API Endpoints

Tüm admin endpoint'leri authentication gerektirir.

### 1. Blog Yönetimi

#### Blog Listesi (Admin)

**Endpoint:** `GET /api/admin/blog`

**Query Parameters:**
- `page`, `limit`, `search`, `published`

**Response:**
```json
{
  "success": true,
  "data": {
    "posts": [...],
    "pagination": {...}
  }
}
```

#### Blog Oluştur

**Endpoint:** `POST /api/admin/blog`

**Request Body:**
```json
{
  "title": "Yeni Blog Yazısı",
  "slug": "yeni-blog-yazisi",
  "excerpt": "Kısa açıklama...",
  "content": "<p>İçerik...</p>",
  "image": "/uploads/blog.jpg",
  "seoTitle": "SEO Başlık",
  "seoDesc": "SEO Açıklama",
  "categories": ["cat-id-1", "cat-id-2"],
  "published": false
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "clx...",
    "slug": "yeni-blog-yazisi",
    ...
  },
  "message": "Blog yazısı oluşturuldu"
}
```

#### Blog Güncelle

**Endpoint:** `PUT /api/admin/blog/[id]`

#### Blog Sil

**Endpoint:** `DELETE /api/admin/blog/[id]`

---

### 2. Galeri Yönetimi

#### Galeri Ekle

**Endpoint:** `POST /api/admin/gallery`

**Request Body:**
```json
{
  "title": "Proje Adı",
  "description": "Açıklama",
  "image": "/uploads/gallery.jpg",
  "category": "ev-tasima",
  "beforeImage": "/uploads/before.jpg",
  "afterImage": "/uploads/after.jpg"
}
```

#### Galeri Güncelle

**Endpoint:** `PUT /api/admin/gallery/[id]`

#### Galeri Sil

**Endpoint:** `DELETE /api/admin/gallery/[id]`

---

### 3. Yorum Yönetimi

#### Yorumları Listele

**Endpoint:** `GET /api/admin/reviews`

**Query Parameters:**
- `approved` (boolean)
- `page`, `limit`

#### Yorum Onayla

**Endpoint:** `POST /api/admin/reviews/[id]/approve`

**Response:**
```json
{
  "success": true,
  "message": "Yorum onaylandı"
}
```

#### Yorum Sil

**Endpoint:** `DELETE /api/admin/reviews/[id]`

---

### 4. Sayfa Yönetimi

#### Sayfa Listesi

**Endpoint:** `GET /api/admin/pages`

#### Sayfa Detay

**Endpoint:** `GET /api/admin/pages/[slug]`

#### Sayfa Güncelle

**Endpoint:** `PUT /api/admin/pages/[slug]`

**Request Body:**
```json
{
  "title": "Ana Sayfa",
  "content": {
    "blocks": [
      {
        "type": "hero",
        "data": {...}
      }
    ]
  },
  "seoTitle": "Ana Sayfa | Nakliyat",
  "seoDesc": "Profesyonel nakliyat hizmetleri"
}
```

---

### 5. Site Ayarları

#### Ayarları Getir

**Endpoint:** `GET /api/admin/settings`

**Response:**
```json
{
  "success": true,
  "data": {
    "site_title": "...",
    "company_name": "...",
    "phone": "...",
    ...
  }
}
```

#### Ayarları Güncelle

**Endpoint:** `PUT /api/admin/settings`

**Request Body:**
```json
{
  "site_title": "Yeni Başlık",
  "phone": "+90 555 999 8888",
  ...
}
```

---

### 6. Fiyatlandırma Ayarları

#### Lokal Fiyatlandırma

**Endpoint:** `GET /api/admin/pricing/lokal`

**Response:**
```json
{
  "success": true,
  "data": {
    "basePrice": 1000,
    "pricePerKm": 5,
    "items": {...},
    ...
  }
}
```

**Endpoint:** `PUT /api/admin/pricing/lokal`

#### Uluslararası Fiyatlandırma

**Endpoint:** `GET /api/admin/pricing/international`

**Endpoint:** `PUT /api/admin/pricing/international`

---

### 7. Ülke Yönetimi

#### Ülke Listesi

**Endpoint:** `GET /api/admin/countries`

#### Ülke Ekle

**Endpoint:** `POST /api/admin/countries`

**Request Body:**
```json
{
  "name": "Almanya",
  "code": "DE",
  "basePrice": 5000,
  "pricePerKm": 2,
  "customsFee": 1000,
  "insuranceRate": 5,
  "estimatedDays": 7
}
```

#### Ülke Güncelle

**Endpoint:** `PUT /api/admin/countries/[id]`

#### Ülke Sil

**Endpoint:** `DELETE /api/admin/countries/[id]`

---

### 8. Dosya Yükleme

**Endpoint:** `POST /api/admin/upload`

**Request:** `multipart/form-data`

**Form Data:**
- `file` (File)
- `folder` (string, optional) - "blog", "gallery", "logo"

**Response:**
```json
{
  "success": true,
  "data": {
    "url": "/uploads/1234567890-image.jpg",
    "filename": "1234567890-image.jpg",
    "size": 245678,
    "mimeType": "image/jpeg"
  }
}
```

**Desteklenen Formatlar:**
- Images: jpg, jpeg, png, webp, gif
- Max size: 5MB

---

### 9. Dashboard İstatistikleri

**Endpoint:** `GET /api/admin/dashboard/stats`

**Response:**
```json
{
  "success": true,
  "data": {
    "totalPosts": 45,
    "publishedPosts": 38,
    "totalReviews": 150,
    "approvedReviews": 120,
    "averageRating": 4.8,
    "totalGalleryItems": 85,
    "recentActivity": [...]
  }
}
```

---

## Error Codes

| Code | Açıklama |
|------|----------|
| 400 | Bad Request - Validation hatası |
| 401 | Unauthorized - Authentication gerekli |
| 403 | Forbidden - Yetki yok |
| 404 | Not Found - Kaynak bulunamadı |
| 409 | Conflict - Duplicate entry |
| 422 | Unprocessable Entity - İşlem yapılamadı |
| 429 | Too Many Requests - Rate limit |
| 500 | Internal Server Error - Sunucu hatası |

---

## Rate Limiting

- **Public API:** 100 istek / 15 dakika
- **Admin API:** 1000 istek / 15 dakika

---

## CORS

Development'ta tüm origin'lere izin verilir.
Production'da sadece belirtilen domain'lere izin verilir.

---

**Versiyon:** 1.0.0  
**Son Güncelleme:** 11 Mart 2026
