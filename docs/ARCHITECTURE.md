# Teknik Mimari

Bu doküman, Evden Eve Nakliyat web sitesinin teknik mimarisini detaylı olarak açıklar.

## Genel Mimari

### Katmanlı Mimari

```
┌─────────────────────────────────────────────────────────┐
│                    Presentation Layer                    │
│              (Next.js App Router + React)                │
├─────────────────────────────────────────────────────────┤
│                     Business Logic                       │
│           (API Routes + Server Components)               │
├─────────────────────────────────────────────────────────┤
│                      Data Access                         │
│                   (Prisma ORM)                           │
├─────────────────────────────────────────────────────────┤
│                       Database                           │
│                    (PostgreSQL)                          │
└─────────────────────────────────────────────────────────┘
```

## Frontend Mimarisi

### Next.js 15.1.4 App Router

#### Route Groups

```
/app
  /(marketing)/          # Public routes - Layout 1
    layout.tsx           # Marketing layout
    page.tsx             # Ana sayfa
    /hizmetlerimiz/
    /blog/
    ...
  
  /karakar/              # Admin routes - Layout 2
    layout.tsx           # Admin layout (auth korumalı)
    /dashboard/
    /blog/
    ...
  
  /api/                  # API routes
    /auth/
    /contact/
    ...
```

#### Server vs Client Components

**Server Components (Varsayılan):**
- Sayfalar (pages)
- Layouts
- Veri getiren componentler
- SEO meta tags

**Client Components ('use client'):**
- Formlar
- Interactive UI (modals, dropdowns)
- State yönetimi gereken componentler
- Event handlers

### Component Yapısı

```
/components
  /ui/                   # Shadcn/ui base components
    button.tsx
    input.tsx
    card.tsx
    ...
  
  /marketing/            # Public components
    /header/
      Header.tsx
      Navigation.tsx
      MobileMenu.tsx
    /footer/
      Footer.tsx
      FooterLinks.tsx
    /hero/
      HeroSection.tsx
    /services/
      ServiceCard.tsx
      ServiceGrid.tsx
    /testimonials/
      ReviewCard.tsx
      ReviewSlider.tsx
    /pricing/
      PriceCalculator.tsx
      PriceDisplay.tsx
    ...
  
  /admin/                # Admin components
    /sidebar/
      Sidebar.tsx
      SidebarNav.tsx
    /tables/
      DataTable.tsx
      TableActions.tsx
    /forms/
      PageEditor.tsx
      BlogEditor.tsx
    ...
  
  /forms/                # Shared form components
    ContactForm.tsx
    QuoteForm.tsx
    LocalQuoteForm.tsx
    InternationalQuoteForm.tsx
  
  /email/                # Email templates
    ContactEmail.tsx
    QuoteEmail.tsx
    ReservationEmail.tsx
```

## Backend Mimarisi

### API Routes Yapısı

```
/app/api
  /auth/
    /[...nextauth]/
      route.ts           # NextAuth.js handler
  
  /contact/
    route.ts             # POST - İletişim formu
  
  /quote/
    /lokal/
      route.ts           # POST - Lokal teklif
    /international/
      route.ts           # POST - Uluslararası teklif
  
  /blog/
    route.ts             # GET - Blog listesi
    /[slug]/
      route.ts           # GET - Blog detay
  
  /admin/
    /blog/
      route.ts           # GET, POST
      /[id]/
        route.ts         # GET, PUT, DELETE
    /gallery/
      route.ts           # GET, POST
      /[id]/
        route.ts         # GET, PUT, DELETE
    /reviews/
      route.ts           # GET, POST
      /[id]/
        route.ts         # GET, PUT, DELETE
        /approve/
          route.ts       # POST - Yorum onaylama
    /pages/
      route.ts           # GET
      /[slug]/
        route.ts         # GET, PUT
    /settings/
      route.ts           # GET, PUT
    /pricing/
      /lokal/
        route.ts         # GET, PUT
      /international/
        route.ts         # GET, PUT
    /countries/
      route.ts           # GET, POST
      /[id]/
        route.ts         # GET, PUT, DELETE
    /upload/
      route.ts           # POST - Görsel yükleme
```

### API Response Format

```typescript
// Success Response
{
  success: true,
  data: {...},
  message?: string
}

// Error Response
{
  success: false,
  error: string,
  details?: any
}
```

### Middleware

```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  // 1. Auth check for /karakar routes
  // 2. Rate limiting
  // 3. CORS headers
  // 4. Security headers
}

export const config = {
  matcher: ['/karakar/:path*', '/api/:path*']
}
```

## Veritabanı Mimarisi

### Prisma ORM

**Schema Dosyası:** `/prisma/schema.prisma`

#### Connection Pooling

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  directUrl = env("DIRECT_URL") // Migrations için
}
```

#### Model İlişkileri

```
User (1) ──── (N) Post
Page (1) ──── (N) PageBlock
Post (1) ──── (N) PostCategory
Review (N) ──── (1) Service
Country (1) ──── (N) PricingRule
```

### Database Utilities

```typescript
// lib/db/index.ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query', 'error', 'warn'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

## Authentication Mimarisi

### NextAuth.js v5 (Auth.js)

```typescript
// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Kullanıcı doğrulama
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })
        
        if (user && await verifyPassword(credentials.password, user.password)) {
          return { id: user.id, email: user.email, name: user.name }
        }
        return null
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: '/karakar/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id
      }
      return session
    }
  }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
```

### Protected Routes

```typescript
// lib/auth.ts
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function requireAuth() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/karakar/login')
  }
  
  return session
}
```

## Dinamik İçerik Sistemi

### Site Settings Helper

```typescript
// lib/settings.ts
import { prisma } from '@/lib/db'

export async function getSiteSettings() {
  const settings = await prisma.siteSetting.findMany()
  
  return settings.reduce((acc, setting) => {
    acc[setting.key] = setting.value
    return acc
  }, {} as Record<string, string>)
}

export async function getSiteSetting(key: string) {
  const setting = await prisma.siteSetting.findUnique({
    where: { key }
  })
  
  return setting?.value || null
}

export async function updateSiteSetting(key: string, value: string) {
  return await prisma.siteSetting.upsert({
    where: { key },
    update: { value },
    create: { key, value }
  })
}
```

### Conditional Rendering Pattern

```typescript
// components/marketing/header/Header.tsx
import { getSiteSettings } from '@/lib/settings'

export async function Header() {
  const settings = await getSiteSettings()
  
  return (
    <header>
      {settings.logo_url && (
        <Image src={settings.logo_url} alt={settings.company_name || 'Logo'} />
      )}
      
      {settings.phone && (
        <a href={`tel:${settings.phone}`}>{settings.phone}</a>
      )}
      
      {settings.whatsapp && (
        <a href={`https://wa.me/${settings.whatsapp}`}>WhatsApp</a>
      )}
    </header>
  )
}
```

## Form Validation

### Zod Schemas

```typescript
// lib/validations/contact.ts
import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().min(2, 'İsim en az 2 karakter olmalı'),
  email: z.string().email('Geçerli bir email adresi girin'),
  phone: z.string().min(10, 'Geçerli bir telefon numarası girin'),
  message: z.string().min(10, 'Mesaj en az 10 karakter olmalı')
})

export type ContactFormData = z.infer<typeof contactSchema>
```

```typescript
// lib/validations/quote.ts
export const localQuoteSchema = z.object({
  from: z.string().min(1, 'Nereden bilgisi gerekli'),
  to: z.string().min(1, 'Nereye bilgisi gerekli'),
  homeSize: z.number().min(1, 'Ev büyüklüğü gerekli'),
  floor: z.number().min(0),
  hasElevator: z.boolean(),
  items: z.array(z.object({
    name: z.string(),
    quantity: z.number()
  })),
  insurance: z.enum(['none', 'basic', 'comprehensive']),
  packingMaterials: z.boolean(),
  moveDate: z.date(),
  // ...
})
```

### React Hook Form Integration

```typescript
// components/forms/ContactForm.tsx
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactSchema, type ContactFormData } from '@/lib/validations/contact'

export function ContactForm() {
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: ''
    }
  })
  
  async function onSubmit(data: ContactFormData) {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    
    if (response.ok) {
      // Success
      form.reset()
    }
  }
  
  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* Form fields */}
    </form>
  )
}
```

## Email Sistemi

### SMTP Configuration

```typescript
// lib/email/config.ts
import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_PORT === '465',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
})
```

### Email Templates (React Email)

```typescript
// components/email/ContactEmail.tsx
import { Html, Head, Body, Container, Text, Button } from '@react-email/components'

interface ContactEmailProps {
  name: string
  email: string
  phone: string
  message: string
}

export function ContactEmail({ name, email, phone, message }: ContactEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={{ backgroundColor: '#ffffff', fontFamily: 'sans-serif' }}>
        <Container style={{ padding: '20px' }}>
          <Text style={{ fontSize: '24px', color: '#1e455f' }}>
            Yeni İletişim Formu
          </Text>
          <Text><strong>İsim:</strong> {name}</Text>
          <Text><strong>Email:</strong> {email}</Text>
          <Text><strong>Telefon:</strong> {phone}</Text>
          <Text><strong>Mesaj:</strong></Text>
          <Text>{message}</Text>
        </Container>
      </Body>
    </Html>
  )
}
```

### Email Sending Utility

```typescript
// lib/email/send.ts
import { render } from '@react-email/render'
import { transporter } from './config'

export async function sendEmail({
  to,
  subject,
  template
}: {
  to: string
  subject: string
  template: React.ReactElement
}) {
  const html = render(template)
  
  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to,
    subject,
    html
  })
}
```

## File Upload Sistemi

### Public Folder Upload

```typescript
// app/api/admin/upload/route.ts
import { writeFile } from 'fs/promises'
import { join } from 'path'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const file = formData.get('file') as File
  
  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
  }
  
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  
  // Unique filename
  const filename = `${Date.now()}-${file.name}`
  const path = join(process.cwd(), 'public/uploads', filename)
  
  await writeFile(path, buffer)
  
  return NextResponse.json({
    success: true,
    url: `/uploads/${filename}`
  })
}
```

## Google Maps Integration

### Distance Matrix API

```typescript
// lib/maps/distance.ts
export async function calculateDistance(from: string, to: string) {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/distancematrix/json?` +
    `origins=${encodeURIComponent(from)}&` +
    `destinations=${encodeURIComponent(to)}&` +
    `key=${process.env.GOOGLE_MAPS_API_KEY}`
  )
  
  const data = await response.json()
  
  if (data.status === 'OK') {
    const element = data.rows[0].elements[0]
    return {
      distance: element.distance.value, // meters
      duration: element.duration.value, // seconds
      distanceText: element.distance.text,
      durationText: element.duration.text
    }
  }
  
  throw new Error('Distance calculation failed')
}
```

## Caching Strategy

### React Cache

```typescript
// lib/cache.ts
import { cache } from 'react'
import { prisma } from '@/lib/db'

export const getCachedSettings = cache(async () => {
  return await prisma.siteSetting.findMany()
})

export const getCachedPosts = cache(async () => {
  return await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' }
  })
})
```

### Revalidation

```typescript
// app/api/admin/blog/route.ts
import { revalidatePath } from 'next/cache'

export async function POST(request: Request) {
  // Create blog post
  const post = await prisma.post.create({...})
  
  // Revalidate blog pages
  revalidatePath('/blog')
  revalidatePath(`/blog/${post.slug}`)
  
  return NextResponse.json({ success: true, data: post })
}
```

## Error Handling

### Global Error Boundary

```typescript
// app/error.tsx
'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div>
      <h2>Bir hata oluştu!</h2>
      <button onClick={() => reset()}>Tekrar dene</button>
    </div>
  )
}
```

### API Error Handler

```typescript
// lib/api/error-handler.ts
export function handleApiError(error: unknown) {
  console.error('API Error:', error)
  
  if (error instanceof z.ZodError) {
    return NextResponse.json(
      { success: false, error: 'Validation error', details: error.errors },
      { status: 400 }
    )
  }
  
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return NextResponse.json(
      { success: false, error: 'Database error' },
      { status: 500 }
    )
  }
  
  return NextResponse.json(
    { success: false, error: 'Internal server error' },
    { status: 500 }
  )
}
```

## Performance Optimizations

### Image Optimization

```typescript
// components/OptimizedImage.tsx
import Image from 'next/image'

export function OptimizedImage({ src, alt, ...props }) {
  return (
    <Image
      src={src}
      alt={alt}
      loading="lazy"
      quality={85}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,..."
      {...props}
    />
  )
}
```

### Code Splitting

```typescript
// Dynamic imports
const AdminDashboard = dynamic(() => import('@/components/admin/Dashboard'), {
  loading: () => <LoadingSpinner />,
  ssr: false
})
```

### Font Optimization

```typescript
// app/layout.tsx
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})
```

## Security

### CSRF Protection

```typescript
// middleware.ts
import { csrf } from '@/lib/security/csrf'

export async function middleware(request: NextRequest) {
  if (request.method !== 'GET') {
    const csrfToken = request.headers.get('x-csrf-token')
    if (!csrf.verify(csrfToken)) {
      return new NextResponse('Invalid CSRF token', { status: 403 })
    }
  }
}
```

### Rate Limiting

```typescript
// lib/security/rate-limit.ts
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '10 s'),
})

export async function checkRateLimit(identifier: string) {
  const { success } = await ratelimit.limit(identifier)
  return success
}
```

## Monitoring & Logging

### Error Logging

```typescript
// lib/logger.ts
export function logError(error: Error, context?: any) {
  console.error({
    message: error.message,
    stack: error.stack,
    context,
    timestamp: new Date().toISOString()
  })
  
  // Production'da Sentry, LogRocket vs. entegre edilebilir
}
```

## Build & Deployment

### Next.js Config

```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    serverActions: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
}

module.exports = nextConfig
```

### Environment Variables

```env
# Development
NODE_ENV=development
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=...
NEXTAUTH_URL=http://localhost:3000

# Production
NODE_ENV=production
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=...
NEXTAUTH_URL=https://yourdomain.com
```

---

**Versiyon:** 1.0.0  
**Son Güncelleme:** 11 Mart 2026
