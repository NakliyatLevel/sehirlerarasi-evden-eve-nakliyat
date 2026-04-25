# 🛡️ Veritabanı Yedekleme ve Geri Yükleme Rehberi

## 📦 Otomatik Yedekleme

### Yedek Alma
```bash
npm run db:backup
```

**Ne Yapar:**
- Tüm veritabanını `backups/backup_YYYYMMDD_HHMMSS.sql` dosyasına kaydeder
- 7 günden eski yedekleri otomatik siler
- Dosya boyutunu gösterir

### Yedek Geri Yükleme
```bash
npm run db:restore backups/backup_20260317_120000.sql
```

**Dikkat:** Bu işlem mevcut veritabanını siler ve yedeği geri yükler!

---

## 🔄 Migration Yapmadan Önce

**HER ZAMAN** migration yapmadan önce yedek alın:

```bash
# 1. Önce yedek al
npm run db:backup

# 2. Sonra migration yap
npx prisma migrate dev
```

---

## 🌱 Seed Veriler

Veritabanı sıfırlandığında otomatik olarak seed veriler oluşturulur:

- Admin kullanıcısı (email: admin@example.com, şifre: admin123)
- Temel site ayarları
- Örnek SSS

**Manuel Seed:**
```bash
npm run prisma:seed
```

---

## ⚠️ Önemli Notlar

1. **Production'da asla `migrate reset` kullanma**
2. **Her migration öncesi backup al**
3. **Backup dosyalarını güvenli bir yerde sakla**
4. **7 günden eski backuplar otomatik silinir**

---

## 📁 Backup Klasör Yapısı

```
backups/
├── backup_20260317_120000.sql
├── backup_20260317_150000.sql
└── backup_20260318_090000.sql
```

---

## 🚨 Acil Durum Kurtarma

Eğer veriler kaybolursa:

1. En son backup dosyasını bul
2. Geri yükle: `npm run db:restore backups/backup_XXXXXX.sql`
3. Prisma client'ı yeniden oluştur: `npx prisma generate`
4. Uygulamayı yeniden başlat

---

## 💡 İpuçları

- Her önemli değişiklikten önce backup al
- Backup dosyalarını düzenli olarak harici bir yere kopyala
- Production'da günlük otomatik backup ayarla (cron job)
