# Deployment Rehberi

Bu doküman, projenin Vercel ve diğer platformlara nasıl deploy edileceğini açıklar.

## Vercel Deployment (Önerilir)

Vercel, Next.js için optimize edilmiş bir platformdur ve en iyi performansı sağlar.

### Ön Hazırlık

#### 1. GitHub Repository Oluşturun

```bash
# Git init (henüz yapılmadıysa)
git init

# Remote ekleyin
git remote add origin https://github.com/username/nakliyat.git

# İlk commit
git add .
git commit -m "Initial commit"
git push -u origin main
```

#### 2. Environment Variables Hazırlayın

Aşağıdaki değişkenleri hazırlayın:

```env
# Database (Vercel Postgres kullanacaksanız boş bırakın)
DATABASE_URL=
DIRECT_URL=

# Auth
NEXTAUTH_SECRET=
NEXTAUTH_URL=

# SMTP
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=

# Google Maps
GOOGLE_MAPS_API_KEY=

# Admin Email
ADMIN_EMAIL=

# Site URL (production domain)
NEXT_PUBLIC_SITE_URL=
```

### Vercel'e Deploy

#### Adım 1: Vercel Hesabı

1. [vercel.com](https://vercel.com) adresine gidin
2. GitHub hesabınızla giriş yapın
3. Vercel'i GitHub'a bağlayın

#### Adım 2: Proje Import

1. **New Project** butonuna tıklayın
2. GitHub repository'nizi seçin
3. **Import** butonuna tıklayın

#### Adım 3: Proje Ayarları

**Framework Preset:** Next.js (otomatik algılanır)

**Root Directory:** `./` (varsayılan)

**Build Command:** `npm run build` (varsayılan)

**Output Directory:** `.next` (varsayılan)

**Install Command:** `npm install` (varsayılan)

#### Adım 4: Environment Variables

1. **Environment Variables** bölümüne gidin
2. Tüm değişkenleri ekleyin:

```
DATABASE_URL = [Vercel Postgres'ten alınacak]
NEXTAUTH_SECRET = [rastgele güçlü string]
NEXTAUTH_URL = https://yourdomain.com
SMTP_HOST = smtp.gmail.com
SMTP_PORT = 587
SMTP_USER = your-email@gmail.com
SMTP_PASS = your-app-password
GOOGLE_MAPS_API_KEY = your-api-key
ADMIN_EMAIL = admin@yourdomain.com
NEXT_PUBLIC_SITE_URL = https://yourdomain.com
```

**NEXTAUTH_SECRET Oluşturma:**
```bash
openssl rand -base64 32
```

#### Adım 5: Deploy

1. **Deploy** butonuna tıklayın
2. Build süreci başlar (2-5 dakika)
3. Deploy tamamlandığında URL verilir

### Vercel Postgres Kurulumu

#### Adım 1: Database Oluştur

1. Vercel Dashboard → **Storage** sekmesi
2. **Create Database** → **Postgres**
3. Database adı girin (örn: `nakliyat-db`)
4. Region seçin (en yakın)
5. **Create** butonuna tıklayın

#### Adım 2: Database Bağlantısı

1. Database oluşturulduktan sonra **Connect** sekmesine gidin
2. **Prisma** seçeneğini seçin
3. Environment variables otomatik gösterilir:
   - `DATABASE_URL`
   - `DIRECT_URL`

4. Bu değişkenleri projenize ekleyin:
   - Vercel Dashboard → Project → **Settings** → **Environment Variables**
   - Her iki değişkeni de ekleyin

#### Adım 3: Database Migration

```bash
# Yerel olarak
npx prisma migrate deploy

# Veya Vercel'de otomatik
# Build Command: npm run build && npx prisma migrate deploy
```

**Vercel Build Settings:**
1. Project Settings → **General**
2. **Build & Development Settings**
3. **Build Command:** `npm run build && npx prisma migrate deploy`

#### Adım 4: Seed Data

İlk admin kullanıcısı ve temel verileri ekleyin:

```bash
# Yerel olarak seed çalıştırın
npx prisma db seed

# Veya Vercel'de
# package.json'a ekleyin:
{
  "scripts": {
    "vercel-build": "prisma generate && prisma migrate deploy && prisma db seed && next build"
  }
}
```

### Custom Domain Bağlama

#### Adım 1: Domain Ekle

1. Vercel Dashboard → Project → **Settings** → **Domains**
2. **Add** butonuna tıklayın
3. Domain adınızı girin (örn: `colaknakli.com`)
4. **Add** butonuna tıklayın

#### Adım 2: DNS Ayarları

Vercel size DNS kayıtlarını gösterir:

**A Record:**
```
Type: A
Name: @
Value: 76.76.21.21
```

**CNAME Record (www için):**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

#### Adım 3: Domain Provider'da Ayarlar

Domain sağlayıcınızda (GoDaddy, Namecheap, vs.):

1. DNS Management'a gidin
2. A Record ekleyin
3. CNAME Record ekleyin
4. Kaydedin

**Propagation:** 24-48 saat sürebilir

#### Adım 4: SSL Sertifikası

Vercel otomatik SSL sertifikası sağlar (Let's Encrypt).
Domain bağlandıktan sonra otomatik aktif olur.

### Environment Variables Güncelleme

Domain bağlandıktan sonra:

1. **Environment Variables** → `NEXTAUTH_URL`
2. Değeri güncelleyin: `https://yourdomain.com`
3. **Environment Variables** → `NEXT_PUBLIC_SITE_URL`
4. Değeri güncelleyin: `https://yourdomain.com`
5. **Redeploy** butonuna tıklayın

---

## Netlify Deployment

### Adım 1: Netlify Hesabı

1. [netlify.com](https://netlify.com) adresine gidin
2. GitHub hesabınızla giriş yapın

### Adım 2: Site Import

1. **Add new site** → **Import an existing project**
2. GitHub repository'nizi seçin
3. Branch seçin (main)

### Adım 3: Build Settings

```
Build command: npm run build
Publish directory: .next
```

### Adım 4: Environment Variables

Vercel'deki gibi tüm değişkenleri ekleyin.

### Adım 5: Deploy

**Deploy site** butonuna tıklayın.

**Not:** Netlify, Vercel kadar Next.js'e optimize değildir. Bazı özellikler çalışmayabilir.

---

## Railway Deployment

### Adım 1: Railway Hesabı

1. [railway.app](https://railway.app) adresine gidin
2. GitHub hesabınızla giriş yapın

### Adım 2: Yeni Proje

1. **New Project** → **Deploy from GitHub repo**
2. Repository seçin

### Adım 3: PostgreSQL Ekle

1. **New** → **Database** → **Add PostgreSQL**
2. Database otomatik oluşturulur
3. `DATABASE_URL` otomatik eklenir

### Adım 4: Environment Variables

Diğer değişkenleri ekleyin.

### Adım 5: Deploy

Otomatik deploy başlar.

---

## Kendi Sunucunuzda Deployment

### Gereksinimler

- **Node.js** 18+
- **PostgreSQL** 14+
- **Nginx** (reverse proxy)
- **PM2** (process manager)

### Adım 1: Sunucu Hazırlığı

```bash
# Node.js kurulumu (Ubuntu)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# PostgreSQL kurulumu
sudo apt-get install postgresql postgresql-contrib

# PM2 kurulumu
sudo npm install -g pm2

# Nginx kurulumu
sudo apt-get install nginx
```

### Adım 2: PostgreSQL Ayarları

```bash
# PostgreSQL'e giriş
sudo -u postgres psql

# Database oluştur
CREATE DATABASE nakliyat;
CREATE USER nakliyat_user WITH PASSWORD 'strong_password';
GRANT ALL PRIVILEGES ON DATABASE nakliyat TO nakliyat_user;
\q
```

### Adım 3: Proje Kurulumu

```bash
# Proje klasörü
cd /var/www
sudo git clone https://github.com/username/nakliyat.git
cd nakliyat

# Bağımlılıklar
npm install

# Environment variables
sudo nano .env
# Tüm değişkenleri ekleyin

# Prisma migration
npx prisma migrate deploy
npx prisma db seed

# Build
npm run build
```

### Adım 4: PM2 ile Başlatma

```bash
# PM2 ecosystem dosyası
nano ecosystem.config.js
```

```javascript
module.exports = {
  apps: [{
    name: 'nakliyat',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/nakliyat',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
}
```

```bash
# PM2 başlat
pm2 start ecosystem.config.js

# Otomatik başlatma
pm2 startup
pm2 save
```

### Adım 5: Nginx Ayarları

```bash
sudo nano /etc/nginx/sites-available/nakliyat
```

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
# Symlink oluştur
sudo ln -s /etc/nginx/sites-available/nakliyat /etc/nginx/sites-enabled/

# Nginx test
sudo nginx -t

# Nginx restart
sudo systemctl restart nginx
```

### Adım 6: SSL Sertifikası (Let's Encrypt)

```bash
# Certbot kurulumu
sudo apt-get install certbot python3-certbot-nginx

# SSL sertifikası al
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Otomatik yenileme
sudo certbot renew --dry-run
```

---

## Deployment Checklist

### Pre-deployment

- [ ] Tüm testler geçiyor mu?
- [ ] Environment variables hazır mı?
- [ ] Database migration hazır mı?
- [ ] Seed data hazır mı?
- [ ] `.env.example` güncel mi?
- [ ] `.gitignore` doğru mu?
- [ ] Production build çalışıyor mu? (`npm run build`)

### Post-deployment

- [ ] Site açılıyor mu?
- [ ] Admin paneline giriş yapılabiliyor mu?
- [ ] Database bağlantısı çalışıyor mu?
- [ ] Email gönderimi çalışıyor mu?
- [ ] Google Maps çalışıyor mu?
- [ ] Tüm sayfalar yükleniyor mu?
- [ ] Formlar çalışıyor mu?
- [ ] Görseller yükleniyor mu?
- [ ] SSL sertifikası aktif mi?
- [ ] SEO meta tags doğru mu?
- [ ] Sitemap oluşuyor mu? (`/sitemap.xml`)
- [ ] Robots.txt doğru mu? (`/robots.txt`)
- [ ] Performance test (PageSpeed Insights)

---

## Monitoring & Maintenance

### Vercel Analytics

Vercel otomatik analytics sağlar:
- Page views
- Unique visitors
- Performance metrics
- Error tracking

### Error Tracking (Opsiyonel)

**Sentry Integration:**

```bash
npm install @sentry/nextjs
```

```javascript
// sentry.client.config.js
import * as Sentry from "@sentry/nextjs"

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
})
```

### Database Backup

**Vercel Postgres:**
- Otomatik günlük backup
- 7 gün retention

**Kendi Sunucu:**

```bash
# Backup script
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
pg_dump -U nakliyat_user nakliyat > /backups/nakliyat_$DATE.sql

# Crontab (günlük 2:00)
0 2 * * * /path/to/backup.sh
```

### Updates

```bash
# Dependencies güncelleme
npm update

# Next.js güncelleme
npm install next@latest react@latest react-dom@latest

# Prisma güncelleme
npm install prisma@latest @prisma/client@latest

# Deploy
git add .
git commit -m "Update dependencies"
git push
```

---

## Troubleshooting

### Build Hatası

**Hata:** `Module not found`
**Çözüm:** `npm install` çalıştırın

**Hata:** `Type error`
**Çözüm:** `npm run type-check` ile kontrol edin

### Database Bağlantı Hatası

**Hata:** `Can't reach database server`
**Çözüm:** 
- `DATABASE_URL` doğru mu kontrol edin
- Database çalışıyor mu kontrol edin
- Firewall ayarlarını kontrol edin

### Email Gönderilmiyor

**Hata:** `Invalid login`
**Çözüm:**
- SMTP credentials doğru mu?
- Gmail için App Password kullanıyor musunuz?
- Port doğru mu? (587 veya 465)

### Görsel Yüklenmiyor

**Hata:** `413 Payload Too Large`
**Çözüm:**
- Nginx: `client_max_body_size 10M;`
- Vercel: Otomatik 4.5MB limit

### Performance Sorunları

**Çözüm:**
- Image optimization kontrol edin
- Cache ayarlarını kontrol edin
- Database query'leri optimize edin
- CDN kullanın

---

## Rollback

### Vercel

1. Deployments sekmesine gidin
2. Önceki deployment'ı bulun
3. **Promote to Production** butonuna tıklayın

### Kendi Sunucu

```bash
# Git rollback
git log
git reset --hard <commit-hash>
git push -f

# PM2 restart
pm2 restart nakliyat
```

---

## Performance Optimization

### Vercel Edge Network

Vercel otomatik CDN sağlar:
- Global edge network
- Automatic caching
- Image optimization

### Custom Caching

```javascript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/uploads/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}
```

### Database Connection Pooling

Prisma otomatik connection pooling yapar.

**Önerilen ayarlar:**
```
DATABASE_URL="postgresql://user:pass@host:5432/db?connection_limit=10&pool_timeout=20"
```

---

**Versiyon:** 1.0.0  
**Son Güncelleme:** 11 Mart 2026
