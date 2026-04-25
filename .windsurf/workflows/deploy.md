---
description: Projeyi Vercel'e deploy etme
---

# Vercel Deployment

Bu workflow, projeyi Vercel'e deploy etmek için adımları içerir.

## Adımlar

### 1. Environment Variables Hazırla

Aşağıdaki değişkenleri `.env` dosyasında hazırlayın:

```env
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=...
NEXTAUTH_URL=https://yourdomain.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
GOOGLE_MAPS_API_KEY=...
ADMIN_EMAIL=admin@yourdomain.com
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### 2. GitHub'a Push

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 3. Vercel'e Import

1. [vercel.com](https://vercel.com) adresine git
2. **New Project** → GitHub repository'yi seç
3. **Import** tıkla

### 4. Environment Variables Ekle

Vercel Dashboard'da:
- **Settings** → **Environment Variables**
- Tüm değişkenleri ekle

### 5. Vercel Postgres Oluştur

1. **Storage** → **Create Database** → **Postgres**
2. Database adı: `nakliyat-db`
3. **Connect** → Prisma seç
4. `DATABASE_URL` ve `DIRECT_URL` kopyala
5. Environment Variables'a ekle

### 6. Build Command Güncelle

**Settings** → **Build & Development Settings**

Build Command:
```bash
npm run build && npx prisma migrate deploy && npx prisma db seed
```

### 7. Deploy

**Deployments** → **Redeploy**

### 8. Custom Domain Bağla

1. **Settings** → **Domains**
2. Domain adını ekle
3. DNS ayarlarını yap (A Record + CNAME)
4. SSL otomatik aktif olur

### 9. Test

- [ ] Site açılıyor mu?
- [ ] Admin panel çalışıyor mu?
- [ ] Email gidiyor mu?
- [ ] Database bağlantısı var mı?
- [ ] SSL aktif mi?

## Notlar

- İlk deploy 2-5 dakika sürebilir
- DNS propagation 24-48 saat sürebilir
- Vercel otomatik SSL sertifikası sağlar
