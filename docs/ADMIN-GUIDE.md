# Admin Panel Kullanım Kılavuzu

Bu doküman, admin panelinin nasıl kullanılacağını detaylı olarak açıklar.

## Giriş

### Admin Paneline Erişim

**URL:** `https://yourdomain.com/karakar`

**İlk Giriş Bilgileri:**
- Email: `admin@example.com`
- Şifre: `admin123`

**Güvenlik:** İlk girişte mutlaka şifrenizi değiştirin!

---

## Dashboard (Ana Sayfa)

Dashboard, sitenizin genel durumunu gösterir.

### İstatistikler

- **Toplam Blog Yazısı:** Yayınlanan ve taslak yazılar
- **Toplam Yorum:** Onaylanan ve bekleyen yorumlar
- **Ortalama Puan:** Müşteri yorumlarından hesaplanan ortalama
- **Galeri Görselleri:** Toplam görsel sayısı

### Son Aktiviteler

- Son eklenen blog yazıları
- Son gelen yorumlar
- Son yüklenen galeri görselleri

---

## Sayfa Yönetimi

Tüm sayfalar (ana sayfa, hakkımızda, hizmetler vs.) buradan düzenlenir.

### Sayfa Listesi

**Menü:** Dashboard → Sayfalar

Mevcut sayfalar:
- Ana Sayfa (`home`)
- Hakkımızda (`hakkimizda`)
- İletişim (`iletisim`)
- Ev Taşıma (`ev-tasima`)
- Ofis Taşıma (`ofis-tasima`)
- Uluslararası Nakliyat (`uluslararasi-nakliyat`)
- Parça Eşya (`parca-esya`)
- Asansörlü Taşıma (`asansorlu-tasima`)

### Sayfa Düzenleme

1. Düzenlemek istediğiniz sayfaya tıklayın
2. **Başlık:** Sayfa başlığı
3. **İçerik Blokları:** Sürükle-bırak ile düzenleyin

#### İçerik Blok Tipleri

**Hero (Ana Banner):**
```json
{
  "type": "hero",
  "data": {
    "title": "Profesyonel Evden Eve Nakliyat",
    "subtitle": "Güvenli ve hızlı taşımacılık",
    "image": "/uploads/hero.jpg",
    "cta": {
      "text": "Teklif Al",
      "link": "/teklif-al"
    }
  }
}
```

**Metin Bloğu:**
```json
{
  "type": "text",
  "data": {
    "content": "<p>HTML içerik...</p>"
  }
}
```

**Özellikler:**
```json
{
  "type": "features",
  "data": {
    "title": "Neden Biz?",
    "items": [
      {
        "icon": "truck",
        "title": "Hızlı Teslimat",
        "description": "..."
      }
    ]
  }
}
```

**Galeri:**
```json
{
  "type": "gallery",
  "data": {
    "title": "Projelerimiz",
    "category": "ev-tasima",
    "limit": 8
  }
}
```

**Yorumlar:**
```json
{
  "type": "testimonials",
  "data": {
    "title": "Müşteri Yorumları",
    "limit": 6
  }
}
```

**CTA (Call to Action):**
```json
{
  "type": "cta",
  "data": {
    "title": "Hemen Teklif Alın",
    "description": "Ücretsiz keşif ve fiyat teklifi",
    "buttonText": "Teklif Al",
    "buttonLink": "/teklif-al"
  }
}
```

### SEO Ayarları

Her sayfa için:
- **SEO Başlık:** Arama motorlarında görünecek başlık
- **SEO Açıklama:** Meta description (160 karakter)
- **SEO Anahtar Kelimeler:** Virgülle ayrılmış

**Örnek:**
- Başlık: "Ev Taşıma Hizmetleri | Çolak Nakliyat"
- Açıklama: "Profesyonel ev taşıma hizmetleri. Güvenli, hızlı ve uygun fiyatlı evden eve nakliyat."
- Anahtar Kelimeler: "ev taşıma, evden eve nakliyat, istanbul nakliyat"

---

## Blog Yönetimi

### Blog Listesi

**Menü:** Dashboard → Blog

**Filtreler:**
- Tümü / Yayınlanan / Taslak
- Kategori
- Arama

### Yeni Blog Yazısı Ekle

1. **Blog → Yeni Yazı** butonuna tıklayın
2. Formu doldurun:

**Temel Bilgiler:**
- **Başlık:** Yazı başlığı
- **Slug:** URL (otomatik oluşur, düzenlenebilir)
- **Özet:** Kısa açıklama (liste görünümünde)
- **Görsel:** Kapak görseli (önerilen: 1200x630px)

**İçerik:**
- Rich text editor ile içerik yazın
- Görseller ekleyin
- Başlıklar, listeler, linkler kullanın

**Kategoriler:**
- Bir veya birden fazla kategori seçin
- Yeni kategori ekleyebilirsiniz

**SEO:**
- SEO Başlık
- SEO Açıklama
- SEO Anahtar Kelimeler

**Yayınlama:**
- **Taslak:** Sadece admin görebilir
- **Yayınla:** Herkese açık
- **Yayın Tarihi:** Gelecek tarih seçilebilir (zamanlanmış yayın)

3. **Kaydet** veya **Yayınla** butonuna tıklayın

### Blog Düzenleme

1. Blog listesinden düzenlemek istediğiniz yazıya tıklayın
2. Değişiklikleri yapın
3. **Güncelle** butonuna tıklayın

### Blog Silme

1. Blog listesinde silinecek yazının yanındaki **Sil** butonuna tıklayın
2. Onaylayın

**Uyarı:** Silinen yazılar geri getirilemez!

---

## Galeri Yönetimi

### Galeri Listesi

**Menü:** Dashboard → Galeri

**Filtreler:**
- Kategori (Ev Taşıma, Ofis Taşıma, vs.)
- Aktif / Pasif

### Yeni Görsel Ekle

1. **Galeri → Yeni Görsel** butonuna tıklayın
2. Formu doldurun:

**Görsel Bilgileri:**
- **Başlık:** Görsel başlığı
- **Açıklama:** Kısa açıklama (opsiyonel)
- **Ana Görsel:** Yükleyin (önerilen: 1200x800px)
- **Küçük Resim:** Otomatik oluşur veya özel yükleyin

**Kategori:**
- Ev Taşıma
- Ofis Taşıma
- Uluslararası Nakliyat
- Parça Eşya
- Asansörlü Taşıma

**Öncesi/Sonrası:**
- **Öncesi Görseli:** Taşıma öncesi fotoğraf
- **Sonrası Görseli:** Taşıma sonrası fotoğraf

**Sıralama:**
- Sıra numarası (düşük önce gösterilir)

3. **Kaydet** butonuna tıklayın

### Görsel Düzenleme

1. Galeri listesinden görsele tıklayın
2. Değişiklikleri yapın
3. **Güncelle** butonuna tıklayın

### Görsel Silme

1. Galeri listesinde silinecek görselin yanındaki **Sil** butonuna tıklayın
2. Onaylayın

---

## Yorum Yönetimi

### Yorum Listesi

**Menü:** Dashboard → Yorumlar

**Filtreler:**
- Tümü / Onaylanan / Bekleyen
- Puan (1-5 yıldız)
- Hizmet türü

### Yorum Detayları

Her yorum için:
- **İsim:** Müşteri adı
- **Puan:** 1-5 yıldız
- **Yorum:** Müşteri yorumu
- **Hizmet:** Hangi hizmet için
- **Konum:** Nereden nereye
- **Tarih:** Yorum tarihi

### Yorum Onaylama

1. Bekleyen yorumlar listesine gidin
2. Yorumu okuyun
3. **Onayla** butonuna tıklayın

**Onaylanan yorumlar:**
- Sitede görünür
- Ortalama puana dahil edilir
- SERP'te görünebilir (Schema.org)

### Yorum Reddetme/Silme

1. Yorumun yanındaki **Sil** butonuna tıklayın
2. Onaylayın

### Öne Çıkan Yorumlar

Bazı yorumları öne çıkarabilirsiniz:
1. Yorumu düzenleyin
2. **Öne Çıkan** kutucuğunu işaretleyin
3. **Güncelle** butonuna tıklayın

**Öne çıkan yorumlar:**
- Ana sayfada gösterilir
- Hizmet sayfalarında öncelikli gösterilir

---

## Hizmet Yönetimi

### Hizmet Listesi

**Menü:** Dashboard → Hizmetler

Mevcut hizmetler:
- Ev Taşıma
- Ofis Taşıma
- Uluslararası Nakliyat
- Parça Eşya
- Asansörlü Taşıma
- Şehirler Arası
- Şehir İçi

### Hizmet Düzenleme

1. Hizmete tıklayın
2. Düzenleyin:

**Temel Bilgiler:**
- **İsim:** Hizmet adı
- **Slug:** URL
- **Açıklama:** Detaylı açıklama
- **İkon:** Lucide icon adı (örn: "truck", "package")
- **Görsel:** Hizmet görseli

**Özellikler:**
```json
{
  "features": [
    "Profesyonel ekip",
    "Sigortalı taşıma",
    "Paketleme hizmeti"
  ],
  "includes": [
    "Ücretsiz keşif",
    "Nakliye sigortası"
  ]
}
```

**Sıralama:**
- Menüde gösterilme sırası

3. **Güncelle** butonuna tıklayın

---

## SSS Yönetimi

### SSS Listesi

**Menü:** Dashboard → SSS

**Kategoriler:**
- Genel
- Fiyatlandırma
- Hizmetler
- Rezervasyon

### Yeni Soru Ekle

1. **SSS → Yeni Soru** butonuna tıklayın
2. Formu doldurun:

- **Soru:** Sıkça sorulan soru
- **Cevap:** Detaylı cevap (HTML destekler)
- **Kategori:** Kategori seçin
- **Sıralama:** Gösterilme sırası

3. **Kaydet** butonuna tıklayın

### SSS Düzenleme/Silme

Blog yönetimiyle aynı şekilde çalışır.

---

## Fiyatlandırma Ayarları

### Lokal Fiyatlandırma

**Menü:** Dashboard → Fiyatlandırma → Lokal

**Temel Fiyatlar:**
- **Başlangıç Fiyatı:** Minimum fiyat (₺)
- **Km Başı Fiyat:** Her km için (₺)
- **m² Başı Fiyat:** Her metrekare için (₺)
- **Kat Başı Fiyat:** Asansörsüz her kat için (₺)
- **Asansör İndirimi:** Asansör varsa indirim oranı (%)

**Eşya Fiyatları:**
```json
{
  "koltuk": 50,
  "yatak": 100,
  "dolap": 150,
  "buzdolabi": 200,
  "camasir_makinesi": 150,
  "piyano": 500,
  "antika": 300
}
```

**Sigorta:**
```json
{
  "none": 0,
  "basic": 200,
  "comprehensive": 500
}
```

**Paketleme Malzemeleri:**
```json
{
  "karton_kucuk": 10,
  "karton_buyuk": 20,
  "strec_film": 50,
  "bubble_wrap": 30
}
```

**Araç Tipleri:**
```json
{
  "kamyonet": 0,
  "kamyon": 500,
  "tir": 1500
}
```

**Sezon Çarpanları:**
```json
{
  "low": 0.8,      // Düşük sezon (Kasım-Şubat)
  "normal": 1.0,   // Normal sezon (Mart-Mayıs, Eylül-Ekim)
  "high": 1.3      // Yüksek sezon (Haziran-Ağustos)
}
```

**Hafta Sonu Çarpanı:** 1.2 (Cumartesi-Pazar %20 ek)

### Uluslararası Fiyatlandırma

**Menü:** Dashboard → Fiyatlandırma → Uluslararası

**Temel Fiyatlar:**
- **Başlangıç Fiyatı:** Minimum fiyat (₺)
- **Gümrük Ücreti:** Sabit gümrük ücreti (₺)
- **Evrak İşlem Ücreti:** Dokümantasyon (₺)

**Sigorta:**
```json
{
  "basic": 1000,
  "comprehensive": 2500
}
```

**Paketleme:**
```json
{
  "standard": 500,
  "premium": 1500
}
```

---

## Ülke Yönetimi

**Menü:** Dashboard → Ülkeler

### Ülke Listesi

Uluslararası nakliyat yapılan ülkeler.

### Yeni Ülke Ekle

1. **Ülkeler → Yeni Ülke** butonuna tıklayın
2. Formu doldurun:

- **Ülke Adı:** Almanya
- **Ülke Kodu:** DE (ISO 3166-1 alpha-2)
- **Temel Fiyat:** Başlangıç fiyatı (₺)
- **Km Başı Fiyat:** Her km için (₺)
- **Gümrük Ücreti:** Sabit gümrük (₺)
- **Sigorta Oranı:** Yüzde (%)
- **Tahmini Süre:** Gün cinsinden
- **Açıklama:** Ek bilgiler

3. **Kaydet** butonuna tıklayın

### Ülke Düzenleme/Silme

Diğer modüllerle aynı şekilde.

---

## Site Ayarları

**Menü:** Dashboard → Ayarlar → Genel

### Genel Bilgiler

- **Site Başlığı:** Tarayıcı sekmesinde görünür
- **Şirket Adı:** Resmi şirket adı
- **Domain:** yourdomain.com

### İletişim Bilgileri

- **Telefon:** +90 555 123 4567
- **Email:** info@yourdomain.com
- **WhatsApp:** +90 555 123 4567
- **Adres:** Tam adres

**Not:** Boş bırakılan alanlar sitede görünmez.

### Logo

- **Ana Logo:** Beyaz zemin için (önerilen: PNG, şeffaf arka plan)
- **Alternatif Logo:** Koyu zemin için (opsiyonel)

**Önerilen Boyutlar:**
- Genişlik: 200-300px
- Yükseklik: 50-80px
- Format: PNG (şeffaf)

### SEO

- **SEO Başlık:** Varsayılan site başlığı
- **SEO Açıklama:** Varsayılan açıklama
- **Google Analytics ID:** G-XXXXXXXXXX (opsiyonel)

### Sosyal Medya

- **Facebook:** https://facebook.com/...
- **Instagram:** https://instagram.com/...
- **Twitter:** https://twitter.com/...
- **LinkedIn:** https://linkedin.com/...

**Not:** Boş bırakılan sosyal medya linkleri görünmez.

---

## SMTP Ayarları

**Menü:** Dashboard → Ayarlar → SMTP

### Gmail SMTP

- **Host:** smtp.gmail.com
- **Port:** 587
- **Email:** your-email@gmail.com
- **Şifre:** Gmail App Password (2FA gerekli)

**Gmail App Password Alma:**
1. Google Account → Security
2. 2-Step Verification'ı aktif edin
3. App Passwords → Mail seçin
4. Oluşturulan şifreyi kopyalayın

### Özel Sunucu SMTP

- **Host:** mail.yourdomain.com
- **Port:** 465 (SSL) veya 587 (TLS)
- **Email:** info@yourdomain.com
- **Şifre:** Email şifresi

### Test Email

SMTP ayarlarını test edin:
1. **Test Email Gönder** butonuna tıklayın
2. Test email adresinizi girin
3. Email geldi mi kontrol edin

---

## API Keys

**Menü:** Dashboard → Ayarlar → API Keys

### Google Maps API

**Gerekli:** Mesafe hesaplama için

1. [Google Cloud Console](https://console.cloud.google.com/)
2. Yeni proje oluşturun
3. APIs & Services → Enable APIs
4. Distance Matrix API'yi aktif edin
5. Credentials → Create API Key
6. API Key'i kopyalayın
7. Admin panelde yapıştırın

**Güvenlik:**
- API Key'i kısıtlayın (HTTP referrers)
- Sadece Distance Matrix API'ye izin verin

---

## Dosya Yükleme

### Görsel Yükleme

**Desteklenen Formatlar:**
- JPG, JPEG
- PNG
- WebP
- GIF

**Maksimum Boyut:** 5MB

**Önerilen Boyutlar:**
- Blog görseli: 1200x630px
- Galeri görseli: 1200x800px
- Logo: 200-300px genişlik
- Hero banner: 1920x1080px

### Görsel Optimizasyonu

Görseller otomatik optimize edilir:
- WebP formatına dönüştürülür
- Boyut küçültülür
- Lazy loading uygulanır

---

## Güvenlik

### Şifre Değiştirme

1. **Ayarlar → Profil** menüsüne gidin
2. **Şifre Değiştir** butonuna tıklayın
3. Mevcut şifrenizi girin
4. Yeni şifrenizi girin (min 8 karakter)
5. **Güncelle** butonuna tıklayın

**Güçlü Şifre:**
- En az 8 karakter
- Büyük ve küçük harf
- Rakam
- Özel karakter

### Oturum Yönetimi

- Otomatik çıkış: 24 saat
- Manuel çıkış: Sağ üst köşe → Çıkış

---

## Yedekleme

### Veritabanı Yedeği

**Önerilir:** Haftalık yedek

1. **Ayarlar → Yedekleme** menüsüne gidin
2. **Yedek Al** butonuna tıklayın
3. SQL dosyası indirilir

### Geri Yükleme

1. **Ayarlar → Yedekleme** menüsüne gidin
2. **Geri Yükle** butonuna tıklayın
3. SQL dosyasını seçin
4. **Yükle** butonuna tıklayın

**Uyarı:** Geri yükleme mevcut verileri siler!

---

## Performans

### Cache Temizleme

Değişiklikler hemen görünmüyorsa:

1. **Ayarlar → Performans** menüsüne gidin
2. **Cache Temizle** butonuna tıklayın

### Görsel Optimizasyonu

Tüm görselleri yeniden optimize edin:

1. **Ayarlar → Performans** menüsüne gidin
2. **Görselleri Optimize Et** butonuna tıklayın

---

## Sorun Giderme

### Giriş Yapamıyorum

- Şifrenizi doğru girdiğinizden emin olun
- Caps Lock kapalı mı kontrol edin
- Şifre sıfırlama linkini kullanın

### Görsel Yüklenmiyor

- Dosya boyutu 5MB'dan küçük mü?
- Desteklenen format mı? (JPG, PNG, WebP)
- İnternet bağlantınızı kontrol edin

### Email Gitmiyor

- SMTP ayarlarını kontrol edin
- Test email gönderin
- Spam klasörünü kontrol edin

### Değişiklikler Görünmüyor

- Cache'i temizleyin
- Tarayıcıyı yenileyin (Ctrl+F5)
- Gizli mod/Incognito'da test edin

---

## Destek

Sorun yaşıyorsanız:

1. Bu kılavuzu kontrol edin
2. Teknik dokümanlara bakın
3. Geliştirici ile iletişime geçin

---

**Versiyon:** 1.0.0  
**Son Güncelleme:** 11 Mart 2026
