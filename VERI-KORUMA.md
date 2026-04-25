# 🛡️ VERİ KORUMA SİSTEMİ

## ⚡ HIZLI BAŞLANGIÇ

### 1️⃣ Şimdi Backup Al
```bash
npm run db:backup
```

### 2️⃣ Otomatik Backup Başlat (Önerilen)
```bash
npm run db:auto-backup
```
**Her 30 dakikada bir otomatik backup alır!**

---

## 🔄 OTOMATIK YEDEKLEME

### Başlatma
```bash
npm run db:auto-backup
```

**Ne Yapar:**
- ✅ Her 30 dakikada bir otomatik backup alır
- ✅ Arka planda çalışır
- ✅ Terminal'de durumu gösterir
- ✅ Ctrl+C ile durdurulur

**Kullanım Senaryosu:**
1. Terminal aç
2. `npm run db:auto-backup` çalıştır
3. Terminali açık bırak
4. İçerik girmeye devam et
5. Her 30 dakikada otomatik backup alınır

---

## 📦 MANUEL YEDEKLEME

### Backup Al
```bash
npm run db:backup
```

**Ne Zaman Kullan:**
- Önemli değişiklik öncesi
- Migration öncesi
- Production'a deploy öncesi
- Günlük rutin backup

### Backup Geri Yükle
```bash
npm run db:restore backups/backup_20260317_123934.sql
```

**Dikkat:** Mevcut veriler silinir!

---

## 📁 BACKUP DOSYALARI

**Konum:** `backups/`

**Format:** `backup_YYYYMMDD_HHMMSS.sql`

**Örnek:**
```
backups/
├── backup_20260317_120000.sql  (36 KB)
├── backup_20260317_123000.sql  (38 KB)
└── backup_20260317_130000.sql  (40 KB)
```

**Otomatik Temizlik:**
- 7 günden eski backuplar otomatik silinir
- Disk alanı tasarrufu

---

## 🚨 ACİL DURUM KURTARMA

### Veriler Kayboldu!

1. **Panik yapma** ✋
2. **En son backup'ı bul:**
   ```bash
   ls -lah backups/
   ```
3. **Geri yükle:**
   ```bash
   npm run db:restore backups/backup_XXXXXX.sql
   ```
4. **Kontrol et:**
   ```bash
   npm run dev
   ```

---

## ✅ ÖNERİLER

### Günlük Rutin
1. **Sabah:** Otomatik backup başlat
   ```bash
   npm run db:auto-backup
   ```
2. **İçerik gir** (otomatik backup çalışıyor)
3. **Akşam:** Manuel backup al
   ```bash
   npm run db:backup
   ```

### Migration Öncesi
```bash
# 1. Backup al
npm run db:backup

# 2. Migration yap
npx prisma migrate dev

# 3. Kontrol et
npm run dev

# 4. Sorun varsa geri yükle
npm run db:restore backups/backup_XXXXXX.sql
```

---

## 🔐 GÜVENLİK

- ✅ Backup dosyaları Git'e eklenmez
- ✅ Sadece lokal bilgisayarda
- ✅ 7 gün sonra otomatik silinir
- ⚠️ Önemli backupları harici diske kopyala

---

## 💡 İPUÇLARI

1. **Otomatik backup'ı her zaman çalıştır**
2. **Önemli değişiklik öncesi manuel backup al**
3. **Backup dosyalarını düzenli kontrol et**
4. **Disk alanını takip et**
5. **Production'da günlük backup al**

---

## 📞 SORUN ÇÖZME

### Backup Çalışmıyor
```bash
# Script'e izin ver
chmod +x scripts/*.sh

# Tekrar dene
npm run db:backup
```

### PostgreSQL Bulunamadı
- PostgreSQL kurulu olmalı
- `pg_dump` komutu PATH'de olmalı

### Disk Dolu
```bash
# Eski backupları sil
rm backups/backup_202603*.sql
```

---

## 🎯 ÖZET

**ŞİMDİ YAP:**
1. `npm run db:auto-backup` - Otomatik backup başlat
2. İçerik girmeye devam et
3. Rahat ol - her 30 dakikada backup alınıyor! 😊

**UNUTMA:**
- Otomatik backup terminali açık tutmalı
- Ctrl+C ile durdurulur
- Her gün yeni terminal'de başlat
