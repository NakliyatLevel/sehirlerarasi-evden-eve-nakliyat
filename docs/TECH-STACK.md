# Teknoloji Stack Detayları

Bu doküman, projede kullanılan tüm teknolojileri ve versiyonlarını detaylı olarak açıklar.

## Frontend Stack

### Next.js 15.1.4

**Neden Next.js?**
- Server-Side Rendering (SSR)
- Static Site Generation (SSG)
- App Router (modern routing)
- Otomatik code splitting
- Image optimization
- SEO friendly
- API Routes (backend)

**Özellikler:**
- React Server Components
- Server Actions
- Streaming
- Parallel Routes
- Intercepting Routes

**Kurulum:**
```bash
npm install next@15.1.4 react@latest react-dom@latest
```

---

### React 18+

**Özellikler:**
- Concurrent rendering
- Automatic batching
- Transitions
- Suspense
- Server Components

**Hooks Kullanımı:**
```typescript
import { useState, useEffect, useCallback, useMemo } from 'react'
```

---

### TypeScript 5+

**Neden TypeScript?**
- Tip güvenliği
- IntelliSense desteği
- Hata yakalamada kolaylık
- Refactoring güvenliği
- Daha iyi dokümantasyon

**Konfigürasyon:**
```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "preserve",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "allowJs": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

---

### TailwindCSS 3+

**Neden TailwindCSS?**
- Utility-first CSS
- Hızlı geliştirme
- Küçük bundle size
- Responsive design
- Dark mode desteği (kullanmıyoruz)

**Konfigürasyon:**
```javascript
// tailwind.config.js
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1e455f',
        secondary: '#cb2b24',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}
```

**Kurulum:**
```bash
npm install -D tailwindcss postcss autoprefixer
npm install @tailwindcss/typography @tailwindcss/forms
```

---

### Shadcn/ui

**Neden Shadcn/ui?**
- Erişilebilir komponentler
- Özelleştirilebilir
- Radix UI tabanlı
- TailwindCSS ile entegre
- Copy-paste yaklaşımı (dependency değil)

**Kurulum:**
```bash
npx shadcn-ui@latest init
```

**Komponent Ekleme:**
```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add input
npx shadcn-ui@latest add card
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add dropdown-menu
npx shadcn-ui@latest add form
npx shadcn-ui@latest add table
npx shadcn-ui@latest add toast
```

**Kullanılan Komponentler:**
- Button
- Input
- Card
- Dialog
- Dropdown Menu
- Form
- Table
- Toast
- Select
- Checkbox
- Radio Group
- Textarea
- Label
- Separator
- Tabs
- Alert
- Badge

---

### Framer Motion

**Neden Framer Motion?**
- Performanslı animasyonlar
- Deklaratif API
- Gesture desteği
- Layout animations
- Scroll animations

**Kurulum:**
```bash
npm install framer-motion
```

**Kullanım Örnekleri:**
```typescript
import { motion } from 'framer-motion'

// Fade in
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>

// Slide in
<motion.div
  initial={{ x: -100, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  transition={{ type: 'spring', stiffness: 100 }}
>
  Content
</motion.div>
```

---

### Lucide Icons

**Neden Lucide Icons?**
- Hafif (tree-shakeable)
- Modern tasarım
- Tutarlı stil
- React komponentleri
- TypeScript desteği

**Kurulum:**
```bash
npm install lucide-react
```

**Kullanım:**
```typescript
import { Truck, Package, Phone, Mail, MapPin } from 'lucide-react'

<Truck className="w-6 h-6 text-primary" />
```

**Yasaklar:**
- Emoji kullanımı kesinlikle yasak
- Sadece Lucide Icons kullanılır

---

## Backend Stack

### PostgreSQL 14+

**Neden PostgreSQL?**
- Güçlü ve güvenilir
- ACID uyumlu
- JSON desteği
- Full-text search
- Performanslı

**Vercel Postgres:**
- Otomatik scaling
- Connection pooling
- Günlük backup
- Kolay entegrasyon

---

### Prisma ORM

**Neden Prisma?**
- Type-safe database client
- Auto-completion
- Migration sistemi
- Seed data desteği
- Prisma Studio (GUI)

**Kurulum:**
```bash
npm install prisma @prisma/client
npx prisma init
```

**Komutlar:**
```bash
# Schema değişikliği sonrası
npx prisma generate

# Migration oluştur
npx prisma migrate dev --name init

# Migration uygula (production)
npx prisma migrate deploy

# Prisma Studio aç
npx prisma studio

# Seed data
npx prisma db seed
```

**Konfigürasyon:**
```javascript
// package.json
{
  "prisma": {
    "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
  }
}
```

---

### NextAuth.js v5 (Auth.js)

**Neden NextAuth.js?**
- Next.js entegrasyonu
- Güvenli authentication
- Session yönetimi
- JWT desteği
- Çoklu provider desteği

**Kurulum:**
```bash
npm install next-auth@beta
```

**Konfigürasyon:**
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
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: '/karakar/login',
  }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
```

---

## Form & Validation

### Zod

**Neden Zod?**
- TypeScript-first
- Runtime validation
- Type inference
- Composable schemas
- Error handling

**Kurulum:**
```bash
npm install zod
```

**Kullanım:**
```typescript
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(2, 'İsim en az 2 karakter olmalı'),
  email: z.string().email('Geçerli bir email adresi girin'),
  phone: z.string().min(10, 'Geçerli bir telefon numarası girin'),
  message: z.string().min(10, 'Mesaj en az 10 karakter olmalı')
})

type ContactFormData = z.infer<typeof contactSchema>
```

---

### React Hook Form

**Neden React Hook Form?**
- Performanslı (minimal re-renders)
- Kolay validasyon
- TypeScript desteği
- Zod entegrasyonu
- Küçük bundle size

**Kurulum:**
```bash
npm install react-hook-form @hookform/resolvers
```

**Kullanım:**
```typescript
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const form = useForm<ContactFormData>({
  resolver: zodResolver(contactSchema),
  defaultValues: {
    name: '',
    email: '',
    phone: '',
    message: ''
  }
})
```

---

## SEO & Performance

### next-seo

**Kurulum:**
```bash
npm install next-seo
```

**Kullanım:**
```typescript
import { NextSeo } from 'next-seo'

<NextSeo
  title="Evden Eve Nakliyat"
  description="Profesyonel nakliyat hizmetleri"
  canonical="https://yourdomain.com"
  openGraph={{
    url: 'https://yourdomain.com',
    title: 'Evden Eve Nakliyat',
    description: 'Profesyonel nakliyat hizmetleri',
    images: [{ url: '/og-image.jpg' }],
  }}
/>
```

---

### next-sitemap

**Kurulum:**
```bash
npm install next-sitemap
```

**Konfigürasyon:**
```javascript
// next-sitemap.config.js
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  generateRobotsTxt: true,
  exclude: ['/karakar/*', '/api/*'],
}
```

---

### sharp

**Neden sharp?**
- Hızlı image processing
- Next.js tarafından kullanılır
- WebP/AVIF dönüşümü
- Resize ve optimize

**Kurulum:**
```bash
npm install sharp
```

**Next.js otomatik kullanır:**
```typescript
import Image from 'next/image'

<Image
  src="/image.jpg"
  alt="..."
  width={1200}
  height={800}
  quality={85}
/>
```

---

### schema-dts

**Kurulum:**
```bash
npm install schema-dts
```

**Kullanım:**
```typescript
import { LocalBusiness, WithContext } from 'schema-dts'

const schema: WithContext<LocalBusiness> = {
  "@context": "https://schema.org",
  "@type": "MovingCompany",
  "name": "Çolak Nakliyat",
  // ...
}
```

---

## Email

### Nodemailer

**Kurulum:**
```bash
npm install nodemailer
npm install -D @types/nodemailer
```

**Konfigürasyon:**
```typescript
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_PORT === '465',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
})
```

---

### React Email

**Kurulum:**
```bash
npm install react-email @react-email/components
```

**Kullanım:**
```typescript
import { Html, Head, Body, Container, Text } from '@react-email/components'

export function ContactEmail({ name, email, message }) {
  return (
    <Html>
      <Head />
      <Body>
        <Container>
          <Text>Yeni mesaj: {name}</Text>
          <Text>Email: {email}</Text>
          <Text>Mesaj: {message}</Text>
        </Container>
      </Body>
    </Html>
  )
}
```

---

## Maps

### Google Maps API

**Gerekli API'ler:**
- Distance Matrix API (mesafe hesaplama)
- Maps JavaScript API (harita gösterimi)
- Places API (adres otomatik tamamlama)

**Kurulum:**
```bash
npm install @googlemaps/js-api-loader
```

**Kullanım:**
```typescript
const response = await fetch(
  `https://maps.googleapis.com/maps/api/distancematrix/json?` +
  `origins=${from}&destinations=${to}&` +
  `key=${process.env.GOOGLE_MAPS_API_KEY}`
)
```

---

## Development Tools

### ESLint

**Kurulum:**
```bash
npm install -D eslint eslint-config-next
```

**Konfigürasyon:**
```javascript
// .eslintrc.json
{
  "extends": "next/core-web-vitals",
  "rules": {
    "no-console": "warn",
    "no-unused-vars": "warn"
  }
}
```

---

### Prettier

**Kurulum:**
```bash
npm install -D prettier eslint-config-prettier
```

**Konfigürasyon:**
```javascript
// .prettierrc
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5"
}
```

---

### TypeScript ESLint

**Kurulum:**
```bash
npm install -D @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

---

## Utility Libraries

### clsx

**Kurulum:**
```bash
npm install clsx
```

**Kullanım:**
```typescript
import clsx from 'clsx'

<div className={clsx(
  'base-class',
  isActive && 'active-class',
  isDisabled && 'disabled-class'
)} />
```

---

### date-fns

**Kurulum:**
```bash
npm install date-fns
```

**Kullanım:**
```typescript
import { format, parseISO } from 'date-fns'
import { tr } from 'date-fns/locale'

const formattedDate = format(new Date(), 'dd MMMM yyyy', { locale: tr })
```

---

### bcryptjs

**Kurulum:**
```bash
npm install bcryptjs
npm install -D @types/bcryptjs
```

**Kullanım:**
```typescript
import bcrypt from 'bcryptjs'

// Hash password
const hashedPassword = await bcrypt.hash(password, 10)

// Verify password
const isValid = await bcrypt.compare(password, hashedPassword)
```

---

## Package.json

```json
{
  "name": "nakliyat",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    "format": "prettier --write .",
    "prisma:generate": "prisma generate",
    "prisma:migrate": "prisma migrate dev",
    "prisma:studio": "prisma studio",
    "prisma:seed": "prisma db seed"
  },
  "dependencies": {
    "next": "15.1.4",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "@prisma/client": "^5.20.0",
    "next-auth": "^5.0.0-beta.22",
    "zod": "^3.23.8",
    "react-hook-form": "^7.53.0",
    "@hookform/resolvers": "^3.9.0",
    "framer-motion": "^11.11.1",
    "lucide-react": "^0.454.0",
    "next-seo": "^6.6.0",
    "next-sitemap": "^4.2.3",
    "sharp": "^0.33.5",
    "schema-dts": "^1.1.2",
    "nodemailer": "^6.9.15",
    "react-email": "^3.0.1",
    "@react-email/components": "^0.0.25",
    "@googlemaps/js-api-loader": "^1.16.8",
    "bcryptjs": "^2.4.3",
    "clsx": "^2.1.1",
    "date-fns": "^4.1.0",
    "@radix-ui/react-dialog": "^1.1.2",
    "@radix-ui/react-dropdown-menu": "^2.1.2",
    "@radix-ui/react-select": "^2.1.2",
    "@radix-ui/react-tabs": "^1.1.1",
    "@radix-ui/react-toast": "^1.2.2"
  },
  "devDependencies": {
    "typescript": "^5.6.3",
    "@types/node": "^22.7.5",
    "@types/react": "^18.3.11",
    "@types/react-dom": "^18.3.1",
    "@types/bcryptjs": "^2.4.6",
    "@types/nodemailer": "^6.4.16",
    "prisma": "^5.20.0",
    "tailwindcss": "^3.4.14",
    "postcss": "^8.4.47",
    "autoprefixer": "^10.4.20",
    "@tailwindcss/typography": "^0.5.15",
    "@tailwindcss/forms": "^0.5.9",
    "eslint": "^8.57.1",
    "eslint-config-next": "15.1.4",
    "prettier": "^3.3.3",
    "eslint-config-prettier": "^9.1.0",
    "@typescript-eslint/parser": "^8.8.1",
    "@typescript-eslint/eslint-plugin": "^8.8.1"
  },
  "prisma": {
    "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
  }
}
```

---

## Versiyonlar

| Paket | Versiyon | Açıklama |
|-------|----------|----------|
| Next.js | 15.1.4 | Framework |
| React | 18.3.1 | UI Library |
| TypeScript | 5.6.3 | Type Safety |
| Prisma | 5.20.0 | ORM |
| NextAuth.js | 5.0.0-beta.22 | Auth |
| TailwindCSS | 3.4.14 | CSS Framework |
| Zod | 3.23.8 | Validation |
| Framer Motion | 11.11.1 | Animations |
| Lucide React | 0.454.0 | Icons |

---

## Browser Support

**Desteklenen Tarayıcılar:**
- Chrome (son 2 versiyon)
- Firefox (son 2 versiyon)
- Safari (son 2 versiyon)
- Edge (son 2 versiyon)

**Mobil:**
- iOS Safari (son 2 versiyon)
- Chrome Android (son 2 versiyon)

---

## Node.js Versiyonu

**Minimum:** Node.js 18.x  
**Önerilen:** Node.js 20.x (LTS)

**Kontrol:**
```bash
node --version
```

---

**Versiyon:** 1.0.0  
**Son Güncelleme:** 11 Mart 2026
