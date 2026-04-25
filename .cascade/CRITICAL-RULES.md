# KRITIK GELIŞTIRME KURALLARI

Bu dosya, Cascade AI'ın geliştirme sürecinde MUTLAKA uyması gereken kritik kuralları içerir.

## 🚨 ASLA YAPILMAYACAKLAR

### 1. Yarım İş Bırakma
- ❌ "Sonra yaparım" - YOK
- ❌ "Proje bitince yapılacak" - YOK
- ❌ "Eksik bırak" - YOK
- ✅ Her özellik eksiksiz tamamlanmalı
- ✅ Her CRUD işlemi (Create, Read, Update, Delete) çalışmalı

### 2. Hardcode Veriler
- ❌ Domain hardcode (`https://yourdomain.com`)
- ❌ Şirket adı hardcode
- ❌ İletişim bilgileri hardcode
- ❌ Logo URL hardcode
- ✅ Tüm veriler veritabanından veya env variables'dan

### 3. Emoji Kullanımı
- ❌ Hiçbir yerde emoji kullanma
- ✅ Sadece Lucide Icons kullan

### 4. Test Etmeden Geçme
- ❌ Kod yazdım, çalışıyor varsayıyorum
- ✅ Her değişikliği test et
- ✅ Frontend'de git, kullan, çalıştığını gör
- ✅ Admin dashboard'da git, kullan, çalıştığını gör

### 5. Lint/Type Hataları
- ❌ Lint hatası bırakma
- ❌ Type error bırakma
- ✅ Her commit öncesi `npm run lint` ve `npm run type-check`

## ✅ MUTLAKA YAPILACAKLAR

### 1. CRUD İşlemleri - Eksiksiz
Her model için:
- ✅ **Create** - Yeni kayıt ekleme çalışmalı
- ✅ **Read** - Listeleme ve detay çalışmalı
- ✅ **Update** - Güncelleme çalışmalı
- ✅ **Delete** - Silme çalışmalı

**Örnek:** Blog yönetimi
- ✅ Yeni blog yazısı ekle → Çalışıyor mu? Test et!
- ✅ Blog listesi → Görünüyor mu? Test et!
- ✅ Blog düzenle → Kaydediyor mu? Test et!
- ✅ Blog sil → Siliniyor mu? Test et!

### 2. Frontend-Backend Entegrasyonu
Her API endpoint için:
- ✅ API route yaz
- ✅ Frontend'de kullan
- ✅ Test et (Postman/Thunder Client)
- ✅ Hata durumlarını handle et
- ✅ Loading state ekle
- ✅ Success/error mesajları göster

### 3. Domain Bağımsızlığı
```typescript
// ❌ YANLIŞ
const url = "https://yourdomain.com/api/contact"

// ✅ DOĞRU
const url = `${process.env.NEXT_PUBLIC_SITE_URL}/api/contact`

// ✅ DOĞRU (Server-side)
const settings = await getSiteSettings()
const url = `https://${settings.domain}/api/contact`
```

### 4. Conditional Rendering
```typescript
// ❌ YANLIŞ (veri yoksa boş görünür)
<div>{settings.phone}</div>

// ✅ DOĞRU (veri yoksa hiç görünmez)
{settings.phone && (
  <div>{settings.phone}</div>
)}
```

### 5. Her Değişiklik Sonrası Kontroller
- ✅ Internal Server Error var mı?
- ✅ Console'da hata var mı?
- ✅ Lint geçiyor mu?
- ✅ Type check geçiyor mu?
- ✅ Build başarılı mı?

## 🔍 Test Checklist

### Frontend Değişikliği Yaptıysan
1. ✅ Tarayıcıda aç
2. ✅ Sayfayı yenile (hard refresh: Cmd+Shift+R)
3. ✅ Değişikliği gör
4. ✅ Kullan (butona tıkla, form doldur vs.)
5. ✅ Çalıştığından emin ol
6. ✅ Console'da hata yok mu kontrol et
7. ✅ Mobil görünümde test et

### Backend/API Değişikliği Yaptıysan
1. ✅ Postman/Thunder Client ile test et
2. ✅ Request gönder
3. ✅ Response kontrol et
4. ✅ Database'de değişiklik oldu mu kontrol et (Prisma Studio)
5. ✅ Frontend'den kullan
6. ✅ Çalıştığından emin ol

### Admin Panel Değişikliği Yaptıysan
1. ✅ `/karakar` adresine git
2. ✅ Login ol
3. ✅ İlgili sayfaya git
4. ✅ Değişikliği gör
5. ✅ Kullan (CRUD işlemleri yap)
6. ✅ Her işlem çalışıyor mu kontrol et
7. ✅ Database'de değişiklik oldu mu kontrol et

### Database Değişikliği Yaptıysan
1. ✅ `npx prisma migrate dev` çalıştır
2. ✅ Migration başarılı mı?
3. ✅ `npx prisma generate` çalıştır
4. ✅ Prisma Studio'da kontrol et
5. ✅ API'leri güncelle
6. ✅ Frontend'i güncelle
7. ✅ Test et

## 📋 Geliştirme Süreci

### Yeni Özellik Eklerken
1. ✅ Database schema güncelle (gerekiyorsa)
2. ✅ Migration oluştur
3. ✅ API route'ları yaz
4. ✅ API'leri test et (Postman)
5. ✅ Frontend komponentleri yaz
6. ✅ Admin panel sayfalarını yaz
7. ✅ Tüm CRUD işlemlerini test et
8. ✅ Lint ve type check
9. ✅ Build test et
10. ✅ Production'a deploy et

### Bug Fix Yaparken
1. ✅ Hatayı tekrarla
2. ✅ Root cause'u bul
3. ✅ Fix'i yap
4. ✅ Test et
5. ✅ Regression test yap (başka bir şey bozmadın mı?)
6. ✅ Lint ve type check
7. ✅ Commit et

## 🚫 Yaygın Hatalar

### 1. "Çalışıyor" Varsayımı
```typescript
// ❌ YANLIŞ - Test etmeden commit
async function createPost(data) {
  await prisma.post.create({ data })
  // Çalışıyor mu? Bilmiyorum, test etmedim
}

// ✅ DOĞRU - Test ettim, çalıştığını gördüm
async function createPost(data) {
  const post = await prisma.post.create({ data })
  // Postman'de test ettim ✓
  // Frontend'de kullandım ✓
  // Admin panelde göründü ✓
  return post
}
```

### 2. Eksik CRUD
```typescript
// ❌ YANLIŞ - Sadece Create ve Read var
// Create ✓
// Read ✓
// Update ❌ YOK
// Delete ❌ YOK

// ✅ DOĞRU - Hepsi var
// Create ✓
// Read ✓
// Update ✓
// Delete ✓
```

### 3. Hardcode Domain
```typescript
// ❌ YANLIŞ
const ogImage = "https://yourdomain.com/og-image.jpg"

// ✅ DOĞRU
const settings = await getSiteSettings()
const ogImage = `https://${settings.domain}/og-image.jpg`
```

### 4. Conditional Rendering Eksik
```typescript
// ❌ YANLIŞ - phone null ise boş div
<div className="phone">{settings.phone}</div>

// ✅ DOĞRU - phone null ise hiç render etme
{settings.phone && (
  <div className="phone">{settings.phone}</div>
)}
```

## 💡 Best Practices

### 1. Her Zaman Test Et
- Kod yazdın → Test et
- API yazdın → Postman'de test et
- Component yazdın → Tarayıcıda test et
- Admin panel yazdın → Login olup test et

### 2. Her Zaman Kontrol Et
- Lint → `npm run lint`
- Type → `npm run type-check`
- Build → `npm run build`
- Test → Manuel test

### 3. Her Zaman Doğrula
- Database → Prisma Studio'da kontrol et
- Frontend → Tarayıcıda kontrol et
- Backend → Postman'de kontrol et
- Admin → Dashboard'da kontrol et

### 4. Her Zaman Temizle
- Console.log'ları sil
- Yorumları temizle
- Kullanılmayan import'ları sil
- Dead code'u sil

## 🎯 Özet

**3 Altın Kural:**
1. **Hiçbir işi yarım bırakma** - Her özellik eksiksiz
2. **Her şeyi test et** - Çalıştığını gör
3. **Hardcode yok** - Her şey dinamik

**Unutma:**
- ✅ CRUD eksiksiz
- ✅ Test eksiksiz
- ✅ Lint/type check eksiksiz
- ✅ Domain bağımsız
- ✅ Conditional rendering
- ✅ Veri kaybı yok

---

**Bu kurallar MUTLAKA uygulanmalıdır. İstisna yoktur.**
