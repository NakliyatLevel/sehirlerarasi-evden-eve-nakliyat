# Geliştirme Rehberi

Bu doküman, proje üzerinde geliştirme yaparken uyulması gereken kuralları ve best practice'leri açıklar.

## Geliştirme Ortamı Kurulumu

### Gereksinimler

- **Node.js:** 18+ (önerilir: 20.x LTS)
- **npm/yarn/pnpm:** Herhangi biri
- **PostgreSQL:** 14+ (veya Vercel Postgres)
- **Git:** 2.x+
- **VS Code:** (önerilir)

### İlk Kurulum

```bash
# Repository'yi klonlayın
git clone <repository-url>
cd colak

# Bağımlılıkları yükleyin
npm install

# Environment variables
cp .env.example .env
# .env dosyasını düzenleyin

# Prisma setup
npx prisma generate
npx prisma migrate dev
npx prisma db seed

# Geliştirme sunucusunu başlatın
npm run dev
```

### VS Code Extensions (Önerilir)

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "prisma.prisma",
    "ms-vscode.vscode-typescript-next"
  ]
}
```

---

## Kod Standartları

### 1. TypeScript Kuralları

**Strict Mode Kullanın:**
```typescript
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
```

**Type Annotations:**
```typescript
// ✅ Doğru
function calculatePrice(distance: number, homeSize: number): number {
  return distance * 5 + homeSize * 10
}

// ❌ Yanlış
function calculatePrice(distance, homeSize) {
  return distance * 5 + homeSize * 10
}
```

**Interface vs Type:**
```typescript
// ✅ Interface (genişletilebilir objeler için)
interface User {
  id: string
  email: string
  name: string
}

// ✅ Type (union, intersection için)
type Status = 'pending' | 'approved' | 'rejected'
type UserWithRole = User & { role: string }
```

---

### 2. Naming Conventions

**Dosya Adları:**
```
PascalCase: Component dosyaları (Header.tsx, Button.tsx)
camelCase: Utility dosyaları (settings.ts, utils.ts)
kebab-case: Route dosyaları (teklif-al, hakkimizda)
```

**Değişken Adları:**
```typescript
// ✅ Doğru
const userName = 'Ahmet'
const isActive = true
const totalPrice = 1000
const userList = []

// ❌ Yanlış
const user_name = 'Ahmet'
const active = true
const price = 1000
const users = []
```

**Component Adları:**
```typescript
// ✅ Doğru
export function UserProfile() {}
export function PriceCalculator() {}

// ❌ Yanlış
export function userProfile() {}
export function priceCalculator() {}
```

**Constant Adları:**
```typescript
// ✅ Doğru
const MAX_FILE_SIZE = 5 * 1024 * 1024
const API_BASE_URL = 'https://api.example.com'

// ❌ Yanlış
const maxFileSize = 5 * 1024 * 1024
const apiBaseUrl = 'https://api.example.com'
```

---

### 3. Component Yapısı

**Server Component (Varsayılan):**
```typescript
// components/marketing/Header.tsx
import { getSiteSettings } from '@/lib/settings'

export async function Header() {
  const settings = await getSiteSettings()
  
  return (
    <header>
      {/* JSX */}
    </header>
  )
}
```

**Client Component:**
```typescript
// components/forms/ContactForm.tsx
'use client'

import { useState } from 'react'

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  return (
    <form>
      {/* JSX */}
    </form>
  )
}
```

**Component Sıralaması:**
```typescript
// 1. Imports
import { useState } from 'react'
import { Button } from '@/components/ui/button'

// 2. Types/Interfaces
interface Props {
  title: string
}

// 3. Component
export function MyComponent({ title }: Props) {
  // 4. Hooks
  const [state, setState] = useState()
  
  // 5. Functions
  function handleClick() {}
  
  // 6. Effects
  useEffect(() => {}, [])
  
  // 7. Return
  return <div>{title}</div>
}
```

---

### 4. Import Sıralaması

```typescript
// 1. React imports
import { useState, useEffect } from 'react'

// 2. Next.js imports
import Image from 'next/image'
import Link from 'next/link'

// 3. Third-party imports
import { motion } from 'framer-motion'
import { Truck } from 'lucide-react'

// 4. Local imports (absolute path)
import { Button } from '@/components/ui/button'
import { getSiteSettings } from '@/lib/settings'

// 5. Relative imports
import { Header } from './Header'
import styles from './styles.module.css'

// 6. Type imports
import type { User } from '@/types'
```

---

### 5. CSS/Tailwind Kuralları

**Tailwind Class Sıralaması:**
```typescript
// Layout → Spacing → Sizing → Typography → Visual → Misc
<div className="
  flex items-center justify-between
  p-4 gap-4
  w-full h-20
  text-lg font-semibold
  bg-white border border-gray-200 rounded-lg shadow-sm
  hover:shadow-md transition-shadow
">
```

**Conditional Classes:**
```typescript
import clsx from 'clsx'

<button className={clsx(
  'px-4 py-2 rounded',
  isActive && 'bg-primary text-white',
  isDisabled && 'opacity-50 cursor-not-allowed'
)} />
```

**Responsive Design:**
```typescript
<div className="
  grid grid-cols-1
  md:grid-cols-2
  lg:grid-cols-3
  gap-4
  md:gap-6
  lg:gap-8
">
```

---

### 6. Emoji Yasağı

**Kesinlikle emoji kullanmayın:**

```typescript
// ❌ Yanlış
<button>Teklif Al 🚚</button>
<h1>Hizmetlerimiz 📦</h1>

// ✅ Doğru
import { Truck, Package } from 'lucide-react'

<button>
  <Truck className="w-5 h-5" />
  Teklif Al
</button>

<h1>
  <Package className="w-6 h-6" />
  Hizmetlerimiz
</h1>
```

---

## Git Workflow

### Branch Stratejisi

```
main (production)
  └── develop (staging)
       ├── feature/user-authentication
       ├── feature/price-calculator
       ├── bugfix/header-responsive
       └── hotfix/email-sending
```

### Commit Messages

**Format:**
```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: Yeni özellik
- `fix`: Bug fix
- `docs`: Dokümantasyon
- `style`: Kod formatı (logic değişikliği yok)
- `refactor`: Refactoring
- `test`: Test ekleme/düzenleme
- `chore`: Build, dependencies vs.

**Örnekler:**
```bash
git commit -m "feat(pricing): Add international pricing calculator"
git commit -m "fix(header): Fix mobile menu overflow issue"
git commit -m "docs(readme): Update installation instructions"
git commit -m "style(components): Format code with prettier"
git commit -m "refactor(api): Simplify settings API logic"
```

### Pull Request

**PR Template:**
```markdown
## Açıklama
Bu PR ne yapıyor?

## Değişiklikler
- [ ] Yeni özellik eklendi
- [ ] Bug düzeltildi
- [ ] Dokümantasyon güncellendi

## Test
Nasıl test edildi?

## Screenshots (varsa)

## Checklist
- [ ] Kod lint'ten geçiyor
- [ ] Type check başarılı
- [ ] Testler geçiyor
- [ ] Dokümantasyon güncellendi
```

---

## Testing

### Unit Tests

```typescript
// __tests__/lib/settings.test.ts
import { describe, it, expect } from '@jest/globals'
import { getSiteSettings } from '@/lib/settings'

describe('Settings', () => {
  it('should return all settings', async () => {
    const settings = await getSiteSettings()
    expect(settings).toBeDefined()
    expect(settings.site_title).toBeDefined()
  })
})
```

### Integration Tests

```typescript
// __tests__/api/contact.test.ts
import { POST } from '@/app/api/contact/route'

describe('Contact API', () => {
  it('should send contact email', async () => {
    const request = new Request('http://localhost:3000/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        message: 'Test message'
      })
    })
    
    const response = await POST(request)
    const data = await response.json()
    
    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
  })
})
```

---

## Performance Best Practices

### 1. Image Optimization

```typescript
// ✅ Doğru
import Image from 'next/image'

<Image
  src="/image.jpg"
  alt="Description"
  width={1200}
  height={800}
  quality={85}
  loading="lazy"
  placeholder="blur"
/>

// ❌ Yanlış
<img src="/image.jpg" alt="Description" />
```

### 2. Dynamic Imports

```typescript
// ✅ Doğru (heavy component)
import dynamic from 'next/dynamic'

const PriceCalculator = dynamic(() => import('@/components/PriceCalculator'), {
  loading: () => <LoadingSkeleton />,
  ssr: false
})

// ❌ Yanlış
import { PriceCalculator } from '@/components/PriceCalculator'
```

### 3. Memoization

```typescript
// ✅ Doğru
import { useMemo, useCallback } from 'react'

function Component({ items }) {
  const sortedItems = useMemo(() => {
    return items.sort((a, b) => a.price - b.price)
  }, [items])
  
  const handleClick = useCallback(() => {
    // ...
  }, [])
  
  return <div>{/* ... */}</div>
}
```

### 4. Database Queries

```typescript
// ✅ Doğru (sadece gerekli alanlar)
const posts = await prisma.post.findMany({
  select: {
    id: true,
    title: true,
    slug: true,
    excerpt: true
  },
  where: { published: true },
  take: 10
})

// ❌ Yanlış (tüm alanlar)
const posts = await prisma.post.findMany({
  where: { published: true }
})
```

---

## Error Handling

### API Routes

```typescript
// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validation
    const schema = z.object({
      name: z.string().min(2),
      email: z.string().email(),
      message: z.string().min(10)
    })
    
    const data = schema.parse(body)
    
    // Process...
    
    return NextResponse.json({
      success: true,
      message: 'Email sent'
    })
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Validation error', details: error.errors },
        { status: 400 }
      )
    }
    
    console.error('Contact API error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
```

### Client Components

```typescript
'use client'

import { useState } from 'react'

export function ContactForm() {
  const [error, setError] = useState<string | null>(null)
  
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(data)
      })
      
      if (!response.ok) {
        throw new Error('Failed to send')
      }
      
      // Success
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    }
  }
  
  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="text-red-500">{error}</div>}
      {/* Form fields */}
    </form>
  )
}
```

---

## Security Best Practices

### 1. Input Validation

```typescript
// ✅ Her input'u validate edin
import { z } from 'zod'

const schema = z.object({
  email: z.string().email(),
  phone: z.string().regex(/^\+?[0-9]{10,15}$/),
  message: z.string().min(10).max(1000)
})
```

### 2. SQL Injection Prevention

```typescript
// ✅ Doğru (Prisma kullanın)
const user = await prisma.user.findUnique({
  where: { email: userEmail }
})

// ❌ Yanlış (raw SQL)
const user = await prisma.$queryRaw`SELECT * FROM users WHERE email = ${userEmail}`
```

### 3. XSS Prevention

```typescript
// ✅ Doğru (React otomatik escape eder)
<div>{userInput}</div>

// ❌ Yanlış (dangerouslySetInnerHTML dikkatli kullanın)
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// ✅ Sanitize edin
import DOMPurify from 'isomorphic-dompurify'

<div dangerouslySetInnerHTML={{ 
  __html: DOMPurify.sanitize(userInput) 
}} />
```

### 4. Environment Variables

```typescript
// ✅ Doğru
const apiKey = process.env.GOOGLE_MAPS_API_KEY

// ❌ Yanlış (hardcode)
const apiKey = 'AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXX'
```

---

## Debugging

### Console Logging

```typescript
// Development
if (process.env.NODE_ENV === 'development') {
  console.log('Debug info:', data)
}

// Production (use logger)
import { logger } from '@/lib/logger'

logger.info('User logged in', { userId: user.id })
logger.error('Failed to send email', { error })
```

### React DevTools

```bash
# Install React DevTools extension
# Chrome: https://chrome.google.com/webstore/detail/react-developer-tools/
```

### Prisma Studio

```bash
# Database GUI
npx prisma studio
```

---

## Code Review Checklist

### Reviewer Checklist

- [ ] Kod okunabilir mi?
- [ ] Type safety var mı?
- [ ] Error handling doğru mu?
- [ ] Performance optimize mi?
- [ ] Security açığı var mı?
- [ ] Testler var mı?
- [ ] Dokümantasyon güncel mi?
- [ ] Emoji kullanılmamış mı?
- [ ] Hardcode veri yok mu?
- [ ] Conditional rendering kullanılmış mı?

### Author Checklist

- [ ] Lint geçiyor mu? (`npm run lint`)
- [ ] Type check geçiyor mu? (`npm run type-check`)
- [ ] Build başarılı mı? (`npm run build`)
- [ ] Testler geçiyor mu? (`npm run test`)
- [ ] Değişiklikler test edildi mi?
- [ ] Dokümantasyon güncellendi mi?
- [ ] Commit messages anlamlı mı?

---

## Deployment Checklist

### Pre-deployment

- [ ] Tüm testler geçiyor
- [ ] Environment variables hazır
- [ ] Database migration hazır
- [ ] Build başarılı
- [ ] Performance test yapıldı
- [ ] Security audit yapıldı

### Post-deployment

- [ ] Site açılıyor
- [ ] Admin panel çalışıyor
- [ ] Email gönderimi çalışıyor
- [ ] Forms çalışıyor
- [ ] Database bağlantısı çalışıyor
- [ ] SSL aktif
- [ ] Analytics çalışıyor

---

## Troubleshooting

### Build Errors

**Error: Module not found**
```bash
# Solution
npm install
npx prisma generate
```

**Error: Type error**
```bash
# Solution
npm run type-check
# Fix type errors
```

### Runtime Errors

**Error: Database connection failed**
```bash
# Check DATABASE_URL
# Check database is running
# Check firewall settings
```

**Error: SMTP error**
```bash
# Check SMTP credentials
# Check SMTP_HOST and SMTP_PORT
# For Gmail, use App Password
```

---

## Useful Commands

```bash
# Development
npm run dev                    # Start dev server
npm run build                  # Build for production
npm run start                  # Start production server

# Database
npx prisma studio              # Open Prisma Studio
npx prisma migrate dev         # Create migration
npx prisma migrate deploy      # Apply migrations
npx prisma db seed             # Seed database
npx prisma generate            # Generate Prisma Client

# Code Quality
npm run lint                   # Run ESLint
npm run lint:fix               # Fix ESLint errors
npm run format                 # Format with Prettier
npm run type-check             # TypeScript check

# Testing
npm run test                   # Run tests
npm run test:watch             # Watch mode
npm run test:coverage          # Coverage report

# Git
git status                     # Check status
git add .                      # Stage all
git commit -m "message"        # Commit
git push                       # Push to remote
git pull                       # Pull from remote
```

---

## Resources

### Documentation

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Prisma Docs](https://www.prisma.io/docs)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [TypeScript Docs](https://www.typescriptlang.org/docs)

### Tools

- [Vercel](https://vercel.com)
- [Prisma Studio](https://www.prisma.io/studio)
- [React DevTools](https://react.dev/learn/react-developer-tools)
- [VS Code](https://code.visualstudio.com)

---

**Versiyon:** 1.0.0  
**Son Güncelleme:** 11 Mart 2026
