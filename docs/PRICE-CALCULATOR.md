# Fiyat Hesaplama Sistemi

Bu doküman, lokal ve uluslararası fiyat hesaplama sisteminin detaylı mantığını açıklar.

## Genel Bakış

Fiyat hesaplama sistemi tamamen dinamiktir. Tüm fiyat parametreleri admin panelden düzenlenebilir ve veritabanında saklanır.

---

## Lokal Fiyat Hesaplama (Türkiye İçi)

### Formül

```
Toplam Fiyat = (
  Temel Fiyat +
  Mesafe Fiyatı +
  Ev Büyüklüğü Fiyatı +
  Kat Fiyatı +
  Eşya Fiyatı +
  Özel Eşya Fiyatı +
  Sigorta Fiyatı +
  Paketleme Fiyatı +
  Araç Fiyatı
) × Sezon Çarpanı × Hafta Sonu Çarpanı
```

### 1. Temel Fiyat

**Sabit başlangıç fiyatı**

```typescript
const basePrice = 1000 // TL
```

**Admin Panelden Düzenlenebilir:**
- Dashboard → Fiyatlandırma → Lokal → Temel Fiyat

---

### 2. Mesafe Fiyatı

**Google Maps Distance Matrix API ile hesaplanır**

```typescript
// lib/maps/distance.ts
async function calculateDistance(from: string, to: string) {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/distancematrix/json?` +
    `origins=${encodeURIComponent(from)}&` +
    `destinations=${encodeURIComponent(to)}&` +
    `key=${process.env.GOOGLE_MAPS_API_KEY}`
  )
  
  const data = await response.json()
  const distanceInMeters = data.rows[0].elements[0].distance.value
  const distanceInKm = distanceInMeters / 1000
  
  return distanceInKm
}

// Fiyat hesaplama
const distance = await calculateDistance(from, to)
const pricePerKm = 5 // TL/km (admin panelden)
const distancePrice = distance * pricePerKm
```

**Örnek:**
- İstanbul → Ankara: 450 km
- Km başı fiyat: 5 TL
- Mesafe fiyatı: 450 × 5 = 2,250 TL

---

### 3. Ev Büyüklüğü Fiyatı

**m² veya oda sayısına göre**

```typescript
// m² bazlı
const homeSize = 120 // m²
const pricePerM2 = 10 // TL/m² (admin panelden)
const homeSizePrice = homeSize * pricePerM2

// Oda sayısı bazlı (alternatif)
const rooms = 3
const pricePerRoom = 400 // TL/oda
const homeSizePrice = rooms * pricePerRoom
```

**Örnek:**
- Ev büyüklüğü: 120 m²
- m² başı fiyat: 10 TL
- Ev büyüklüğü fiyatı: 120 × 10 = 1,200 TL

---

### 4. Kat Fiyatı

**Asansör durumuna göre**

```typescript
const floor = 3
const hasElevator = false
const pricePerFloor = 100 // TL/kat (admin panelden)
const elevatorDiscount = 0.2 // %20 indirim

let floorPrice = floor * pricePerFloor

if (hasElevator) {
  floorPrice = floorPrice * (1 - elevatorDiscount)
}
```

**Örnek 1 (Asansörsüz):**
- Kat: 3
- Kat başı fiyat: 100 TL
- Kat fiyatı: 3 × 100 = 300 TL

**Örnek 2 (Asansörlü):**
- Kat: 3
- Kat başı fiyat: 100 TL
- İndirim: %20
- Kat fiyatı: 3 × 100 × 0.8 = 240 TL

---

### 5. Eşya Fiyatı

**Standart eşyalar için sabit fiyatlar**

```typescript
const itemPrices = {
  koltuk: 50,
  yatak: 100,
  dolap: 150,
  buzdolabi: 200,
  camasir_makinesi: 150,
  bulasik_makinesi: 150,
  televizyon: 100,
  masa: 75,
  sandalye: 25,
  kitaplik: 100,
  komodin: 50,
  sehpa: 40,
}

// Kullanıcı seçimi
const selectedItems = [
  { name: 'koltuk', quantity: 1 },
  { name: 'yatak', quantity: 2 },
  { name: 'dolap', quantity: 3 },
]

const itemsPrice = selectedItems.reduce((total, item) => {
  return total + (itemPrices[item.name] * item.quantity)
}, 0)
```

**Örnek:**
- Koltuk takımı × 1: 50 TL
- Yatak × 2: 200 TL
- Dolap × 3: 450 TL
- **Toplam:** 700 TL

---

### 6. Özel Eşya Fiyatı

**Hassas/değerli eşyalar için ek ücret**

```typescript
const specialItemPrices = {
  piyano: 500,
  antika: 300,
  tablo: 200,
  kristal: 150,
  porselen: 100,
}

const specialItems = [
  { name: 'piyano', description: 'Kuyruklu piyano' },
  { name: 'antika', description: 'Antika dolap' },
]

const specialItemsPrice = specialItems.reduce((total, item) => {
  return total + specialItemPrices[item.name]
}, 0)
```

**Örnek:**
- Piyano: 500 TL
- Antika dolap: 300 TL
- **Toplam:** 800 TL

---

### 7. Sigorta Fiyatı

**3 seçenek**

```typescript
const insurancePrices = {
  none: 0,
  basic: 200,        // Temel sigorta
  comprehensive: 500 // Kapsamlı sigorta
}

const selectedInsurance = 'comprehensive'
const insurancePrice = insurancePrices[selectedInsurance]
```

**Sigorta Kapsamları:**

**Temel (200 TL):**
- Taşıma sırasında hasar
- Maksimum 10,000 TL teminat

**Kapsamlı (500 TL):**
- Taşıma sırasında hasar
- Hırsızlık
- Yangın
- Maksimum 50,000 TL teminat

---

### 8. Paketleme Malzemesi Fiyatı

```typescript
const packagingPrices = {
  karton_kucuk: 10,
  karton_buyuk: 20,
  strec_film: 50,
  bubble_wrap: 30,
  hava_kabarcikli_naylon: 40,
  koruyucu_keçe: 60,
}

const packagingMaterials = [
  { name: 'karton_buyuk', quantity: 20 },
  { name: 'strec_film', quantity: 5 },
  { name: 'bubble_wrap', quantity: 3 },
]

const packagingPrice = packagingMaterials.reduce((total, material) => {
  return total + (packagingPrices[material.name] * material.quantity)
}, 0)
```

**Örnek:**
- Büyük karton × 20: 400 TL
- Streç film × 5: 250 TL
- Bubble wrap × 3: 90 TL
- **Toplam:** 740 TL

---

### 9. Araç Tipi Fiyatı

```typescript
const vehiclePrices = {
  kamyonet: 0,      // Temel araç (ek ücret yok)
  kamyon: 500,      // Orta boy kamyon
  tir: 1500,        // Büyük tır
}

const selectedVehicle = 'kamyon'
const vehiclePrice = vehiclePrices[selectedVehicle]
```

**Araç Kapasiteleri:**
- **Kamyonet:** 1+1 daire, 50 m²'ye kadar
- **Kamyon:** 2+1 daire, 100 m²'ye kadar
- **Tır:** 3+1 ve üzeri, 150 m²+

---

### 10. Sezon Çarpanı

```typescript
const seasonMultipliers = {
  low: 0.8,      // Düşük sezon (Kasım-Şubat)
  normal: 1.0,   // Normal sezon (Mart-Mayıs, Eylül-Ekim)
  high: 1.3,     // Yüksek sezon (Haziran-Ağustos)
}

function getSeason(date: Date): 'low' | 'normal' | 'high' {
  const month = date.getMonth() + 1
  
  if (month >= 11 || month <= 2) return 'low'
  if (month >= 6 && month <= 8) return 'high'
  return 'normal'
}

const moveDate = new Date('2026-07-15')
const season = getSeason(moveDate)
const seasonMultiplier = seasonMultipliers[season]
```

**Sezonlar:**
- **Düşük Sezon (Kasım-Şubat):** %20 indirim
- **Normal Sezon (Mart-Mayıs, Eylül-Ekim):** Normal fiyat
- **Yüksek Sezon (Haziran-Ağustos):** %30 ek ücret

---

### 11. Hafta Sonu Çarpanı

```typescript
const weekendMultiplier = 1.2 // %20 ek ücret

function isWeekend(date: Date): boolean {
  const day = date.getDay()
  return day === 0 || day === 6 // Pazar veya Cumartesi
}

const moveDate = new Date('2026-07-18') // Cumartesi
const isWeekendMove = isWeekend(moveDate)
const weekendFactor = isWeekendMove ? weekendMultiplier : 1.0
```

---

### Toplam Hesaplama Örneği

```typescript
// Parametreler
const from = "İstanbul, Kadıköy"
const to = "Ankara, Çankaya"
const homeSize = 120 // m²
const floor = 3
const hasElevator = false
const items = [
  { name: 'koltuk', quantity: 1 },
  { name: 'yatak', quantity: 2 },
  { name: 'dolap', quantity: 3 },
]
const specialItems = [
  { name: 'piyano' }
]
const insurance = 'comprehensive'
const packaging = [
  { name: 'karton_buyuk', quantity: 20 },
  { name: 'strec_film', quantity: 5 },
]
const vehicle = 'kamyon'
const moveDate = new Date('2026-07-15') // Temmuz, Cumartesi

// Hesaplama
const basePrice = 1000
const distance = 450 // km (Google Maps'ten)
const distancePrice = 450 * 5 = 2250
const homeSizePrice = 120 * 10 = 1200
const floorPrice = 3 * 100 = 300
const itemsPrice = 50 + 200 + 450 = 700
const specialItemsPrice = 500
const insurancePrice = 500
const packagingPrice = 400 + 250 = 650
const vehiclePrice = 500

const subtotal = 1000 + 2250 + 1200 + 300 + 700 + 500 + 500 + 650 + 500 = 7600

const seasonMultiplier = 1.3 // Yüksek sezon
const weekendMultiplier = 1.2 // Cumartesi

const totalPrice = 7600 * 1.3 * 1.2 = 11,856 TL
```

**Fiyat Dökümü:**
```
Temel Fiyat:           1,000 TL
Mesafe (450 km):       2,250 TL
Ev Büyüklüğü (120 m²): 1,200 TL
Kat (3. kat):            300 TL
Eşyalar:                 700 TL
Özel Eşyalar:            500 TL
Sigorta:                 500 TL
Paketleme:               650 TL
Araç (Kamyon):           500 TL
─────────────────────────────
Ara Toplam:            7,600 TL
Sezon Çarpanı (×1.3):  9,880 TL
Hafta Sonu (×1.2):    11,856 TL
─────────────────────────────
TOPLAM:               11,856 TL
```

---

## Uluslararası Fiyat Hesaplama

### Formül

```
Toplam Fiyat = 
  Temel Fiyat +
  Ülke Temel Fiyatı +
  Mesafe Fiyatı +
  Hacim Fiyatı +
  Gümrük Ücreti +
  Evrak İşlem Ücreti +
  Sigorta Fiyatı +
  Paketleme Fiyatı +
  Ek Hizmetler
```

### 1. Temel Fiyat

```typescript
const basePrice = 5000 // TL (uluslararası için daha yüksek)
```

---

### 2. Ülke Temel Fiyatı

**Her ülke için farklı**

```typescript
// Veritabanından
const country = await prisma.country.findUnique({
  where: { code: 'DE' } // Almanya
})

const countryBasePrice = country.basePrice // 4000 TL
```

**Örnek Ülke Fiyatları:**
- Almanya: 4,000 TL
- Hollanda: 3,500 TL
- Belçika: 3,500 TL
- Fransa: 4,500 TL
- Avusturya: 4,200 TL
- İsviçre: 5,000 TL

---

### 3. Mesafe Fiyatı

```typescript
// Sabit mesafe paketleri veya manuel
const distancePackages = {
  near: { km: 2000, price: 2000 },    // Yakın (Balkanlar)
  medium: { km: 2500, price: 3000 },  // Orta (Orta Avrupa)
  far: { km: 3000, price: 4000 },     // Uzak (Batı Avrupa)
}

// Veya km bazlı
const distance = 2400 // km
const pricePerKm = country.pricePerKm // 2 TL/km
const distancePrice = distance * pricePerKm
```

---

### 4. Hacim Fiyatı

**m³ (metreküp) bazlı**

```typescript
const volume = 25 // m³
const pricePerM3 = 200 // TL/m³
const volumePrice = volume * pricePerM3
```

**Hacim Hesaplama:**
```typescript
// Eşyalardan otomatik hesaplama
const items = [
  { name: 'Koltuk takımı', volume: 3 },
  { name: 'Yatak', volume: 2 },
  { name: 'Dolap', volume: 4 },
]

const totalVolume = items.reduce((sum, item) => sum + item.volume, 0)
```

---

### 5. Gümrük Ücreti

```typescript
const customsFee = country.customsFee // 1000 TL (ülkeye göre)
```

**Gümrük İşlemleri:**
- Gümrük beyannamesi
- Vergi hesaplama
- Gümrük danışmanlığı

---

### 6. Evrak İşlem Ücreti

```typescript
const documentFee = 500 // TL

// İçerir:
// - CMR belgesi
// - Sigorta poliçesi
// - Envanter listesi
// - Gümrük evrakları
```

---

### 7. Sigorta Fiyatı

**Uluslararası için daha kapsamlı**

```typescript
const insurancePrices = {
  basic: 1000,        // Temel
  comprehensive: 2500 // Kapsamlı
}

// Veya değer bazlı
const goodsValue = 50000 // TL
const insuranceRate = country.insuranceRate // %5
const insurancePrice = goodsValue * (insuranceRate / 100)
```

---

### 8. Paketleme Fiyatı

```typescript
const packagingPrices = {
  standard: 500,  // Standart paketleme
  premium: 1500,  // Premium paketleme (ahşap kasa vs.)
}

const selectedPackaging = 'premium'
const packagingPrice = packagingPrices[selectedPackaging]
```

**Premium Paketleme İçerir:**
- Ahşap kasalar
- Özel koruma malzemeleri
- Profesyonel paketleme ekibi
- Etiketleme ve envanter

---

### 9. Ek Hizmetler

```typescript
const additionalServices = {
  storage: 500,           // Depolama (aylık)
  assembly: 300,          // Montaj-demontaj
  cleaning: 200,          // Temizlik
  disposal: 150,          // Atık bertaraf
}
```

---

### Toplam Hesaplama Örneği (Uluslararası)

```typescript
// Parametreler
const from = "İstanbul, Türkiye"
const to = "Berlin, Almanya"
const countryCode = "DE"
const volume = 25 // m³
const goodsValue = 50000 // TL
const insurance = 'comprehensive'
const packaging = 'premium'
const storage = true

// Hesaplama
const basePrice = 5000
const countryBasePrice = 4000 // Almanya
const distance = 2400 // km
const distancePrice = 2400 * 2 = 4800
const volumePrice = 25 * 200 = 5000
const customsFee = 1000
const documentFee = 500
const insurancePrice = 2500
const packagingPrice = 1500
const storagePrice = 500

const totalPrice = 5000 + 4000 + 4800 + 5000 + 1000 + 500 + 2500 + 1500 + 500 = 24,800 TL
```

**Fiyat Dökümü:**
```
Temel Fiyat:              5,000 TL
Ülke (Almanya):           4,000 TL
Mesafe (2400 km):         4,800 TL
Hacim (25 m³):            5,000 TL
Gümrük Ücreti:            1,000 TL
Evrak İşlemleri:            500 TL
Sigorta (Kapsamlı):       2,500 TL
Paketleme (Premium):      1,500 TL
Depolama (1 ay):            500 TL
─────────────────────────────
TOPLAM:                  24,800 TL
```

---

## API Implementation

### Lokal Fiyat Hesaplama API

```typescript
// app/api/quote/lokal/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { calculateDistance } from '@/lib/maps/distance'
import { prisma } from '@/lib/db'

export async function POST(request: NextRequest) {
  const data = await request.json()
  
  // Fiyat ayarlarını al
  const pricingSettings = await prisma.pricingSetting.findUnique({
    where: { type: 'lokal', key: 'main' }
  })
  
  const prices = pricingSettings.value as any
  
  // Mesafe hesapla
  const distance = await calculateDistance(data.from, data.to)
  
  // Fiyat hesaplama
  const basePrice = prices.basePrice
  const distancePrice = distance * prices.pricePerKm
  const homeSizePrice = data.homeSize * prices.pricePerM2
  const floorPrice = data.floor * prices.pricePerFloor * 
    (data.hasElevator ? (1 - prices.elevatorDiscount) : 1)
  
  const itemsPrice = data.items.reduce((total, item) => {
    return total + (prices.items[item.name] * item.quantity)
  }, 0)
  
  const specialItemsPrice = data.specialItems.reduce((total, item) => {
    return total + prices.specialItems[item.name]
  }, 0)
  
  const insurancePrice = prices.insurance[data.insurance]
  
  const packagingPrice = data.packagingMaterials.reduce((total, material) => {
    return total + (prices.packaging[material.name] * material.quantity)
  }, 0)
  
  const vehiclePrice = prices.vehicles[data.vehicle]
  
  const subtotal = basePrice + distancePrice + homeSizePrice + 
    floorPrice + itemsPrice + specialItemsPrice + 
    insurancePrice + packagingPrice + vehiclePrice
  
  const season = getSeason(new Date(data.moveDate))
  const seasonMultiplier = prices.seasonMultiplier[season]
  
  const isWeekendMove = isWeekend(new Date(data.moveDate))
  const weekendMultiplier = isWeekendMove ? prices.weekendMultiplier : 1.0
  
  const totalPrice = subtotal * seasonMultiplier * weekendMultiplier
  
  return NextResponse.json({
    success: true,
    data: {
      estimatedPrice: Math.round(totalPrice),
      breakdown: {
        basePrice,
        distancePrice,
        homeSizePrice,
        floorPrice,
        itemsPrice,
        specialItemsPrice,
        insurancePrice,
        packagingPrice,
        vehiclePrice,
        seasonMultiplier,
        weekendMultiplier
      },
      distance,
      estimatedDuration: calculateDuration(distance)
    }
  })
}
```

---

## Admin Panel Fiyat Yönetimi

### Fiyat Güncelleme

```typescript
// app/api/admin/pricing/lokal/route.ts
export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  const data = await request.json()
  
  await prisma.pricingSetting.upsert({
    where: { type: 'lokal', key: 'main' },
    update: { value: data },
    create: { type: 'lokal', key: 'main', value: data }
  })
  
  return NextResponse.json({ success: true })
}
```

---

## Fiyat Optimizasyonu İpuçları

### Müşteri İçin

1. **Düşük sezonda taşının** (%20 indirim)
2. **Hafta içi tercih edin** (%20 tasarruf)
3. **Asansörlü bina seçin** (%20 indirim)
4. **Gereksiz eşyaları ayıklayın** (eşya fiyatı azalır)
5. **Kendi paketleme yapın** (paketleme maliyeti azalır)

### Admin İçin

1. **Sezon fiyatlarını optimize edin**
2. **Rekabetçi km fiyatı belirleyin**
3. **Paket fiyatlar oluşturun**
4. **Kampanyalar düzenleyin**
5. **Müşteri sadakati indirimleri**

---

**Versiyon:** 1.0.0  
**Son Güncelleme:** 11 Mart 2026
