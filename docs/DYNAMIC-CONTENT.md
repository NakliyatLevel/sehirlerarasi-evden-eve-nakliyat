# Dinamik İçerik Sistemi

Bu doküman, projenin %100 dinamik içerik sistemini detaylı olarak açıklar.

## Temel Prensipler

### 1. Hardcode Yasağı

**Kesinlikle hardcode edilmeyecek veriler:**
- Site başlığı, şirket adı
- Domain adı
- İletişim bilgileri (telefon, email, adres)
- Logo URL'leri
- Sosyal medya linkleri
- Sayfa içerikleri
- Hizmet bilgileri
- Fiyatlandırma parametreleri
- SEO meta bilgileri

**Tüm veriler:**
- Veritabanında saklanır (`SiteSetting`, `Page`, vs.)
- Environment variables'da saklanır (API keys, secrets)
- Admin panelden düzenlenebilir

### 2. Conditional Rendering

**Veri yoksa görünmez:**

```typescript
// ❌ Yanlış (her zaman görünür)
<a href="tel:+90 555 123 4567">+90 555 123 4567</a>

// ✅ Doğru (veri varsa görünür)
{settings.phone && (
  <a href={`tel:${settings.phone}`}>{settings.phone}</a>
)}
```

### 3. Fallback Değerler

**Placeholder kullanımı:**

```typescript
// Logo yoksa placeholder
<Image
  src={settings.logo_url || '/placeholder-logo.svg'}
  alt={settings.company_name || 'Logo'}
/>

// Başlık yoksa varsayılan
<title>{settings.site_title || 'Nakliyat'}</title>
```

---

## Site Ayarları Sistemi

### Database Schema

```prisma
model SiteSetting {
  id        String   @id @default(cuid())
  key       String   @unique
  value     String   @db.Text
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Ayar Kategorileri

#### 1. Genel Bilgiler

```typescript
const generalSettings = {
  site_title: "Çolak Nakliyat",
  company_name: "Çolak Evden Eve Nakliyat Ltd.",
  domain: "colaknakli.com",
  description: "Profesyonel evden eve nakliyat hizmetleri"
}
```

#### 2. İletişim Bilgileri

```typescript
const contactSettings = {
  phone: "+90 555 123 4567",
  phone_2: "+90 555 987 6543", // İkinci telefon (opsiyonel)
  email: "info@colaknakli.com",
  email_support: "destek@colaknakli.com", // Destek emaili (opsiyonel)
  whatsapp: "+90 555 123 4567",
  address: "Kadıköy, İstanbul, Türkiye",
  city: "İstanbul",
  postal_code: "34000"
}
```

#### 3. Logo ve Görseller

```typescript
const mediaSettings = {
  logo_url: "/uploads/logo.png",
  logo_alt_url: "/uploads/logo-white.png", // Koyu zemin için
  favicon_url: "/uploads/favicon.ico",
  og_image: "/uploads/og-image.jpg", // Open Graph
  placeholder_image: "/uploads/placeholder.jpg"
}
```

#### 4. SEO Ayarları

```typescript
const seoSettings = {
  seo_title: "Evden Eve Nakliyat - Çolak Nakliyat",
  seo_description: "Profesyonel evden eve nakliyat hizmetleri...",
  seo_keywords: "evden eve nakliyat, istanbul nakliyat, ofis taşıma",
  google_analytics_id: "G-XXXXXXXXXX",
  google_verification: "google-site-verification-code",
  yandex_verification: "yandex-verification-code"
}
```

#### 5. Sosyal Medya

```typescript
const socialSettings = {
  facebook_url: "https://facebook.com/colaknakli",
  instagram_url: "https://instagram.com/colaknakli",
  twitter_url: "https://twitter.com/colaknakli",
  linkedin_url: "https://linkedin.com/company/colaknakli",
  youtube_url: "https://youtube.com/@colaknakli"
}
```

#### 6. Çalışma Saatleri

```typescript
const workingHoursSettings = {
  working_hours_weekday: "09:00 - 18:00",
  working_hours_saturday: "09:00 - 14:00",
  working_hours_sunday: "Kapalı",
  working_days: "Pazartesi - Cumartesi"
}
```

#### 7. Konum Bilgileri

```typescript
const locationSettings = {
  latitude: "40.9925",
  longitude: "29.0261",
  map_embed_url: "https://maps.google.com/..."
}
```

---

## Settings Helper Functions

### lib/settings.ts

```typescript
import { prisma } from '@/lib/db'

// Tüm ayarları getir
export async function getSiteSettings() {
  const settings = await prisma.siteSetting.findMany({
    select: {
      key: true,
      value: true
    }
  })
  
  return settings.reduce((acc, setting) => {
    acc[setting.key] = setting.value
    return acc
  }, {} as Record<string, string>)
}

// Tek ayar getir
export async function getSiteSetting(key: string) {
  const setting = await prisma.siteSetting.findUnique({
    where: { key }
  })
  
  return setting?.value || null
}

// Ayar güncelle veya oluştur
export async function updateSiteSetting(key: string, value: string) {
  return await prisma.siteSetting.upsert({
    where: { key },
    update: { value, updatedAt: new Date() },
    create: { key, value }
  })
}

// Çoklu ayar güncelle
export async function updateSiteSettings(settings: Record<string, string>) {
  const updates = Object.entries(settings).map(([key, value]) =>
    prisma.siteSetting.upsert({
      where: { key },
      update: { value, updatedAt: new Date() },
      create: { key, value }
    })
  )
  
  return await prisma.$transaction(updates)
}

// Ayar sil
export async function deleteSiteSetting(key: string) {
  return await prisma.siteSetting.delete({
    where: { key }
  })
}

// Cache'li ayarlar (React cache)
import { cache } from 'react'

export const getCachedSettings = cache(async () => {
  return await getSiteSettings()
})
```

---

## Kullanım Örnekleri

### 1. Layout'ta Kullanım

```typescript
// app/layout.tsx
import { getSiteSettings } from '@/lib/settings'

export async function generateMetadata() {
  const settings = await getSiteSettings()
  
  return {
    title: settings.site_title,
    description: settings.seo_description,
    metadataBase: new URL(`https://${settings.domain}`),
    openGraph: {
      title: settings.seo_title,
      description: settings.seo_description,
      url: `https://${settings.domain}`,
      siteName: settings.company_name,
      images: [settings.og_image],
    },
  }
}

export default async function RootLayout({ children }) {
  const settings = await getSiteSettings()
  
  return (
    <html lang="tr">
      <head>
        <link rel="icon" href={settings.favicon_url || '/favicon.ico'} />
        {settings.google_analytics_id && (
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${settings.google_analytics_id}`} />
        )}
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
```

### 2. Header Component

```typescript
// components/marketing/header/Header.tsx
import { getSiteSettings } from '@/lib/settings'
import Image from 'next/image'
import Link from 'next/link'
import { Phone, Mail } from 'lucide-react'

export async function Header() {
  const settings = await getSiteSettings()
  
  return (
    <header>
      {/* Logo */}
      {settings.logo_url && (
        <Link href="/">
          <Image
            src={settings.logo_url}
            alt={settings.company_name || 'Logo'}
            width={200}
            height={60}
            priority
          />
        </Link>
      )}
      
      {/* İletişim Bilgileri */}
      <div className="flex gap-4">
        {settings.phone && (
          <a href={`tel:${settings.phone}`} className="flex items-center gap-2">
            <Phone className="w-5 h-5" />
            <span>{settings.phone}</span>
          </a>
        )}
        
        {settings.email && (
          <a href={`mailto:${settings.email}`} className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            <span>{settings.email}</span>
          </a>
        )}
      </div>
    </header>
  )
}
```

### 3. Footer Component

```typescript
// components/marketing/footer/Footer.tsx
import { getSiteSettings } from '@/lib/settings'
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react'

export async function Footer() {
  const settings = await getSiteSettings()
  
  return (
    <footer>
      {/* Şirket Bilgileri */}
      <div>
        <h3>{settings.company_name}</h3>
        {settings.address && <p>{settings.address}</p>}
        {settings.phone && <p>Tel: {settings.phone}</p>}
        {settings.email && <p>Email: {settings.email}</p>}
      </div>
      
      {/* Çalışma Saatleri */}
      {settings.working_days && (
        <div>
          <h4>Çalışma Saatleri</h4>
          <p>{settings.working_days}</p>
          {settings.working_hours_weekday && (
            <p>Hafta İçi: {settings.working_hours_weekday}</p>
          )}
          {settings.working_hours_saturday && (
            <p>Cumartesi: {settings.working_hours_saturday}</p>
          )}
        </div>
      )}
      
      {/* Sosyal Medya */}
      <div className="flex gap-4">
        {settings.facebook_url && (
          <a href={settings.facebook_url} target="_blank" rel="noopener noreferrer">
            <Facebook className="w-6 h-6" />
          </a>
        )}
        {settings.instagram_url && (
          <a href={settings.instagram_url} target="_blank" rel="noopener noreferrer">
            <Instagram className="w-6 h-6" />
          </a>
        )}
        {settings.twitter_url && (
          <a href={settings.twitter_url} target="_blank" rel="noopener noreferrer">
            <Twitter className="w-6 h-6" />
          </a>
        )}
        {settings.linkedin_url && (
          <a href={settings.linkedin_url} target="_blank" rel="noopener noreferrer">
            <Linkedin className="w-6 h-6" />
          </a>
        )}
      </div>
    </footer>
  )
}
```

### 4. WhatsApp Button

```typescript
// components/marketing/WhatsAppButton.tsx
'use client'

import { getSiteSettings } from '@/lib/settings'
import { MessageCircle } from 'lucide-react'

export function WhatsAppButton() {
  const [whatsapp, setWhatsapp] = useState<string | null>(null)
  
  useEffect(() => {
    getSiteSettings().then(settings => {
      setWhatsapp(settings.whatsapp)
    })
  }, [])
  
  if (!whatsapp) return null
  
  const whatsappUrl = `https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`
  
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition"
    >
      <MessageCircle className="w-6 h-6" />
    </a>
  )
}
```

---

## Dinamik Sayfalar

### Page Model

```prisma
model Page {
  id          String   @id @default(cuid())
  slug        String   @unique
  title       String
  content     Json     // Flexible content blocks
  seoTitle    String?
  seoDesc     String?
  seoKeywords String?
  published   Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

### Content Block Yapısı

```typescript
type ContentBlock = 
  | HeroBlock
  | TextBlock
  | FeaturesBlock
  | GalleryBlock
  | TestimonialsBlock
  | CTABlock
  | FormBlock

interface HeroBlock {
  type: 'hero'
  data: {
    title: string
    subtitle: string
    image: string
    cta?: {
      text: string
      link: string
    }
  }
}

interface TextBlock {
  type: 'text'
  data: {
    content: string // HTML
  }
}

interface FeaturesBlock {
  type: 'features'
  data: {
    title?: string
    items: Array<{
      icon: string // Lucide icon name
      title: string
      description: string
    }>
  }
}
```

### Page Renderer

```typescript
// components/PageRenderer.tsx
import { HeroBlock } from './blocks/HeroBlock'
import { TextBlock } from './blocks/TextBlock'
import { FeaturesBlock } from './blocks/FeaturesBlock'

export function PageRenderer({ content }: { content: any }) {
  const blocks = content.blocks || []
  
  return (
    <div>
      {blocks.map((block: any, index: number) => {
        switch (block.type) {
          case 'hero':
            return <HeroBlock key={index} data={block.data} />
          case 'text':
            return <TextBlock key={index} data={block.data} />
          case 'features':
            return <FeaturesBlock key={index} data={block.data} />
          // ... diğer bloklar
          default:
            return null
        }
      })}
    </div>
  )
}
```

### Sayfa Kullanımı

```typescript
// app/(marketing)/[slug]/page.tsx
import { prisma } from '@/lib/db'
import { PageRenderer } from '@/components/PageRenderer'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }) {
  const page = await prisma.page.findUnique({
    where: { slug: params.slug }
  })
  
  if (!page) return {}
  
  return {
    title: page.seoTitle || page.title,
    description: page.seoDesc,
    keywords: page.seoKeywords,
  }
}

export default async function DynamicPage({ params }) {
  const page = await prisma.page.findUnique({
    where: { slug: params.slug, published: true }
  })
  
  if (!page) notFound()
  
  return (
    <div>
      <h1>{page.title}</h1>
      <PageRenderer content={page.content} />
    </div>
  )
}
```

---

## Admin Panel - Ayarlar Yönetimi

### Settings Form

```typescript
// app/karakar/ayarlar/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function SettingsPage() {
  const form = useForm()
  
  useEffect(() => {
    // Mevcut ayarları yükle
    fetch('/api/admin/settings')
      .then(res => res.json())
      .then(data => form.reset(data.data))
  }, [])
  
  async function onSubmit(data: any) {
    const response = await fetch('/api/admin/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    
    if (response.ok) {
      // Success toast
    }
  }
  
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      {/* Genel Bilgiler */}
      <section>
        <h2>Genel Bilgiler</h2>
        
        <div>
          <Label>Site Başlığı</Label>
          <Input {...form.register('site_title')} />
        </div>
        
        <div>
          <Label>Şirket Adı</Label>
          <Input {...form.register('company_name')} />
        </div>
        
        <div>
          <Label>Domain</Label>
          <Input {...form.register('domain')} />
        </div>
      </section>
      
      {/* İletişim Bilgileri */}
      <section>
        <h2>İletişim Bilgileri</h2>
        
        <div>
          <Label>Telefon</Label>
          <Input {...form.register('phone')} />
          <p className="text-sm text-gray-500">
            Boş bırakırsanız sitede görünmez
          </p>
        </div>
        
        <div>
          <Label>Email</Label>
          <Input {...form.register('email')} type="email" />
        </div>
        
        <div>
          <Label>WhatsApp</Label>
          <Input {...form.register('whatsapp')} />
        </div>
        
        <div>
          <Label>Adres</Label>
          <Input {...form.register('address')} />
        </div>
      </section>
      
      {/* Sosyal Medya */}
      <section>
        <h2>Sosyal Medya</h2>
        
        <div>
          <Label>Facebook URL</Label>
          <Input {...form.register('facebook_url')} />
        </div>
        
        <div>
          <Label>Instagram URL</Label>
          <Input {...form.register('instagram_url')} />
        </div>
        
        <div>
          <Label>Twitter URL</Label>
          <Input {...form.register('twitter_url')} />
        </div>
      </section>
      
      <Button type="submit">Kaydet</Button>
    </form>
  )
}
```

### Settings API

```typescript
// app/api/admin/settings/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getSiteSettings, updateSiteSettings } from '@/lib/settings'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  const settings = await getSiteSettings()
  
  return NextResponse.json({
    success: true,
    data: settings
  })
}

export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  const data = await request.json()
  
  await updateSiteSettings(data)
  
  // Revalidate cache
  revalidatePath('/', 'layout')
  
  return NextResponse.json({
    success: true,
    message: 'Ayarlar güncellendi'
  })
}
```

---

## Cache Yönetimi

### Revalidation

```typescript
import { revalidatePath, revalidateTag } from 'next/cache'

// Tüm sayfaları revalidate et
revalidatePath('/', 'layout')

// Belirli sayfayı revalidate et
revalidatePath('/hakkimizda')

// Tag bazlı revalidation
revalidateTag('settings')
```

### Cache Tags

```typescript
// lib/settings.ts
export async function getCachedSettings() {
  return await fetch('/api/settings', {
    next: {
      tags: ['settings'],
      revalidate: 3600 // 1 saat
    }
  })
}
```

---

## Best Practices

### 1. Her Zaman Conditional Rendering

```typescript
// ✅ Doğru
{data && <Component data={data} />}
{items.length > 0 && <List items={items} />}
{settings.phone && <PhoneLink phone={settings.phone} />}

// ❌ Yanlış
<Component data={data} /> // data null olabilir
<List items={items} /> // items boş olabilir
```

### 2. Fallback Değerler

```typescript
// ✅ Doğru
const title = settings.site_title || 'Varsayılan Başlık'
const logo = settings.logo_url || '/placeholder-logo.svg'

// ❌ Yanlış
const title = settings.site_title // undefined olabilir
```

### 3. Type Safety

```typescript
// ✅ Doğru
interface SiteSettings {
  site_title?: string
  company_name?: string
  phone?: string
  email?: string
}

const settings: SiteSettings = await getSiteSettings()

// ❌ Yanlış
const settings: any = await getSiteSettings()
```

### 4. Error Handling

```typescript
// ✅ Doğru
try {
  const settings = await getSiteSettings()
  return settings
} catch (error) {
  console.error('Settings fetch error:', error)
  return {}
}

// ❌ Yanlış
const settings = await getSiteSettings() // Hata yakalama yok
```

---

## Özet

**Dinamik İçerik Sistemi Kuralları:**

1. ✅ Tüm veriler veritabanında
2. ✅ Admin panelden düzenlenebilir
3. ✅ Conditional rendering kullan
4. ✅ Fallback değerler sağla
5. ✅ Type-safe kod yaz
6. ❌ Hardcode veri yok
7. ❌ Emoji kullanma
8. ❌ Veri yoksa gösterme

---

**Versiyon:** 1.0.0  
**Son Güncelleme:** 11 Mart 2026
