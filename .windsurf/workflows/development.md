---
description: Geliştirme ortamını başlatma ve çalıştırma
---

# Development Workflow

Geliştirme ortamını başlatmak ve çalıştırmak için adımlar.

## İlk Kurulum

### 1. Bağımlılıkları Yükle

```bash
npm install
```

### 2. Environment Variables Ayarla

```bash
cp .env.example .env
```

`.env` dosyasını düzenle:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/nakliyat"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
GOOGLE_MAPS_API_KEY="your-api-key"
ADMIN_EMAIL="admin@example.com"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

### 3. Veritabanını Hazırla

```bash
npx prisma generate
npx prisma migrate dev
npx prisma db seed
```

### 4. Geliştirme Sunucusunu Başlat

// turbo
```bash
npm run dev
```

Tarayıcıda `http://localhost:3000` aç.

## Günlük Geliştirme

### Yeni Feature Başlat

```bash
git checkout -b feature/feature-name
```

### Kod Değişiklikleri Yap

1. Kod yaz
2. Lint kontrol: `npm run lint`
3. Type check: `npm run type-check`
4. Test et tarayıcıda

### Commit ve Push

```bash
git add .
git commit -m "feat: Add new feature"
git push origin feature/feature-name
```

### Pull Request Oluştur

GitHub'da PR aç ve review bekle.

## Veritabanı İşlemleri

### Yeni Migration

```bash
npx prisma migrate dev --name migration-name
```

### Prisma Studio Aç

```bash
npx prisma studio
```

### Seed Data Çalıştır

```bash
npx prisma db seed
```

## Debugging

### Server Logs

Terminal'de Next.js loglarını izle.

### Database Query Logs

`prisma/schema.prisma` içinde:
```prisma
generator client {
  provider = "prisma-client-js"
  log      = ["query", "info", "warn", "error"]
}
```

### React DevTools

Browser extension kullan.

## Sorun Giderme

### Port Zaten Kullanımda

```bash
lsof -ti:3000 | xargs kill -9
npm run dev
```

### Module Not Found

```bash
rm -rf node_modules package-lock.json
npm install
```

### Prisma Client Hatası

```bash
npx prisma generate
```

### Build Hatası

```bash
npm run build
```

Hataları düzelt ve tekrar dene.

## Notlar

- Her değişiklikten sonra Internal Server Error kontrol et
- Lint hatalarını mutlaka düzelt
- Her geliştirmeyi test et
- Veri kaybı olmamasına dikkat et
