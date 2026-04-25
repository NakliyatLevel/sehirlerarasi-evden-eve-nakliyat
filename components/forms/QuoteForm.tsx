'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronRight, ChevronLeft, Check, User, MapPin, Package, Settings, FileText, Phone, Mail, Calendar, Home, Building2, Truck, Box } from 'lucide-react'
import { toast } from 'sonner'

interface FormData {
  // Kişisel Bilgiler
  fullName: string
  phone: string
  email: string
  preferredDate: string
  
  // Taşınma Detayları
  fromAddress: string
  fromFloor: string
  fromElevator: boolean
  toAddress: string
  toFloor: string
  toElevator: boolean
  distance: string
  propertyType: string
  
  // Eşya Listesi
  rooms: string
  furnitureCount: string
  hasFragileItems: boolean
  hasPiano: boolean
  hasAntiques: boolean
  specialItems: string
  
  // Ek Hizmetler
  needsPacking: boolean
  needsDisassembly: boolean
  needsStorage: boolean
  needsInsurance: boolean
  additionalNotes: string
}

const steps = [
  { id: 1, name: 'Kişisel Bilgiler', icon: User },
  { id: 2, name: 'Taşınma Detayları', icon: MapPin },
  { id: 3, name: 'Eşya Listesi', icon: Package },
  { id: 4, name: 'Ek Hizmetler', icon: Settings },
  { id: 5, name: 'Özet & Gönder', icon: FileText },
]

export default function QuoteForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phone: '',
    email: '',
    preferredDate: '',
    fromAddress: '',
    fromFloor: '0',
    fromElevator: false,
    toAddress: '',
    toFloor: '0',
    toElevator: false,
    distance: '',
    propertyType: 'apartment',
    rooms: '1',
    furnitureCount: '',
    hasFragileItems: false,
    hasPiano: false,
    hasAntiques: false,
    specialItems: '',
    needsPacking: false,
    needsDisassembly: false,
    needsStorage: false,
    needsInsurance: false,
    additionalNotes: '',
  })

  const nextStep = () => {
    if (validateStep()) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length))
    }
  }

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const validateStep = () => {
    switch (currentStep) {
      case 1:
        if (!formData.fullName || !formData.phone || !formData.email) {
          toast.error('Lütfen tüm zorunlu alanları doldurun')
          return false
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          toast.error('Geçerli bir email adresi girin')
          return false
        }
        break
      case 2:
        if (!formData.fromAddress || !formData.toAddress) {
          toast.error('Lütfen nereden ve nereye adreslerini girin')
          return false
        }
        break
      case 3:
        if (!formData.furnitureCount) {
          toast.error('Lütfen tahmini eşya sayısını girin')
          return false
        }
        break
    }
    return true
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error('Gönderim başarısız')

      toast.success('Teklif talebiniz alındı! En kısa sürede size dönüş yapacağız.')
      
      // Form sıfırlama
      setFormData({
        fullName: '',
        phone: '',
        email: '',
        preferredDate: '',
        fromAddress: '',
        fromFloor: '0',
        fromElevator: false,
        toAddress: '',
        toFloor: '0',
        toElevator: false,
        distance: '',
        propertyType: 'apartment',
        rooms: '1',
        furnitureCount: '',
        hasFragileItems: false,
        hasPiano: false,
        hasAntiques: false,
        specialItems: '',
        needsPacking: false,
        needsDisassembly: false,
        needsStorage: false,
        needsInsurance: false,
        additionalNotes: '',
      })
      setCurrentStep(1)
    } catch (error) {
      toast.error('Bir hata oluştu, lütfen tekrar deneyin')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
      {/* Progress Bar */}
      <div className="bg-gradient-to-r from-primary to-primary/80 p-8">
        <div className="flex justify-between items-center mb-6">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                    currentStep > step.id
                      ? 'bg-green-500 text-white'
                      : currentStep === step.id
                      ? 'bg-white text-primary scale-110'
                      : 'bg-white/30 text-white/60'
                  }`}
                >
                  {currentStep > step.id ? (
                    <Check className="w-6 h-6" />
                  ) : (
                    <step.icon className="w-6 h-6" />
                  )}
                </div>
                <span
                  className={`text-xs mt-2 text-center hidden md:block ${
                    currentStep >= step.id ? 'text-white font-medium' : 'text-white/60'
                  }`}
                >
                  {step.name}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`h-1 flex-1 mx-2 transition-all duration-300 ${
                    currentStep > step.id ? 'bg-green-500' : 'bg-white/30'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="text-white text-center">
          <h2 className="text-2xl font-bold mb-2">{steps[currentStep - 1].name}</h2>
          <p className="text-white/80">Adım {currentStep} / {steps.length}</p>
        </div>
      </div>

      {/* Form Content */}
      <div className="p-8">
        {/* Step 1: Kişisel Bilgiler */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Ad Soyad *</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Adınız ve soyadınız"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Telefon *</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="0555 555 55 55"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email *</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="email@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Tercih Edilen Tarih</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Taşınma Detayları */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-muted/30 p-6 rounded-lg">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                Nereden
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Adres *</label>
                  <input
                    type="text"
                    value={formData.fromAddress}
                    onChange={(e) => setFormData({ ...formData, fromAddress: e.target.value })}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Mevcut adresiniz"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Kat</label>
                    <select
                      value={formData.fromFloor}
                      onChange={(e) => setFormData({ ...formData, fromFloor: e.target.value })}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      {[...Array(21)].map((_, i) => (
                        <option key={i} value={i}>{i === 0 ? 'Zemin' : `${i}. Kat`}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-end">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.fromElevator}
                        onChange={(e) => setFormData({ ...formData, fromElevator: e.target.checked })}
                        className="w-5 h-5"
                      />
                      <span className="text-sm font-medium">Asansör var</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-muted/30 p-6 rounded-lg">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                Nereye
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Adres *</label>
                  <input
                    type="text"
                    value={formData.toAddress}
                    onChange={(e) => setFormData({ ...formData, toAddress: e.target.value })}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Yeni adresiniz"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Kat</label>
                    <select
                      value={formData.toFloor}
                      onChange={(e) => setFormData({ ...formData, toFloor: e.target.value })}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      {[...Array(21)].map((_, i) => (
                        <option key={i} value={i}>{i === 0 ? 'Zemin' : `${i}. Kat`}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-end">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.toElevator}
                        onChange={(e) => setFormData({ ...formData, toElevator: e.target.checked })}
                        className="w-5 h-5"
                      />
                      <span className="text-sm font-medium">Asansör var</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Tahmini Mesafe (km)</label>
                <input
                  type="number"
                  value={formData.distance}
                  onChange={(e) => setFormData({ ...formData, distance: e.target.value })}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Örn: 25"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Konut Tipi</label>
                <select
                  value={formData.propertyType}
                  onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="apartment">Daire</option>
                  <option value="villa">Villa</option>
                  <option value="office">Ofis</option>
                  <option value="warehouse">Depo</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Eşya Listesi */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Oda Sayısı</label>
                <select
                  value={formData.rooms}
                  onChange={(e) => setFormData({ ...formData, rooms: e.target.value })}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <option key={num} value={num}>{num}+{num - 1}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Tahmini Eşya Sayısı *</label>
                <input
                  type="number"
                  value={formData.furnitureCount}
                  onChange={(e) => setFormData({ ...formData, furnitureCount: e.target.value })}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Örn: 50"
                />
              </div>
            </div>

            <div className="bg-muted/30 p-6 rounded-lg">
              <h3 className="font-semibold mb-4">Özel Eşyalar</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer p-3 hover:bg-white rounded-lg transition">
                  <input
                    type="checkbox"
                    checked={formData.hasFragileItems}
                    onChange={(e) => setFormData({ ...formData, hasFragileItems: e.target.checked })}
                    className="w-5 h-5"
                  />
                  <Box className="w-5 h-5 text-primary" />
                  <span>Kırılabilir eşyalar var</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer p-3 hover:bg-white rounded-lg transition">
                  <input
                    type="checkbox"
                    checked={formData.hasPiano}
                    onChange={(e) => setFormData({ ...formData, hasPiano: e.target.checked })}
                    className="w-5 h-5"
                  />
                  <Package className="w-5 h-5 text-primary" />
                  <span>Piyano var</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer p-3 hover:bg-white rounded-lg transition">
                  <input
                    type="checkbox"
                    checked={formData.hasAntiques}
                    onChange={(e) => setFormData({ ...formData, hasAntiques: e.target.checked })}
                    className="w-5 h-5"
                  />
                  <Package className="w-5 h-5 text-primary" />
                  <span>Antika eşyalar var</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Özel Eşya Detayları</label>
              <textarea
                value={formData.specialItems}
                onChange={(e) => setFormData({ ...formData, specialItems: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Taşınmasında özen gösterilmesi gereken eşyalarınızı belirtin..."
              />
            </div>
          </div>
        )}

        {/* Step 4: Ek Hizmetler */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex items-start gap-4 p-6 border-2 border-border rounded-lg cursor-pointer hover:border-primary transition">
                <input
                  type="checkbox"
                  checked={formData.needsPacking}
                  onChange={(e) => setFormData({ ...formData, needsPacking: e.target.checked })}
                  className="w-5 h-5 mt-1"
                />
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Box className="w-5 h-5 text-primary" />
                    <span className="font-semibold">Paketleme Hizmeti</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Profesyonel ekibimiz tüm eşyalarınızı paketler
                  </p>
                </div>
              </label>

              <label className="flex items-start gap-4 p-6 border-2 border-border rounded-lg cursor-pointer hover:border-primary transition">
                <input
                  type="checkbox"
                  checked={formData.needsDisassembly}
                  onChange={(e) => setFormData({ ...formData, needsDisassembly: e.target.checked })}
                  className="w-5 h-5 mt-1"
                />
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Settings className="w-5 h-5 text-primary" />
                    <span className="font-semibold">Montaj/Demontaj</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Mobilyalarınızın sökme ve takma işlemi
                  </p>
                </div>
              </label>

              <label className="flex items-start gap-4 p-6 border-2 border-border rounded-lg cursor-pointer hover:border-primary transition">
                <input
                  type="checkbox"
                  checked={formData.needsStorage}
                  onChange={(e) => setFormData({ ...formData, needsStorage: e.target.checked })}
                  className="w-5 h-5 mt-1"
                />
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Building2 className="w-5 h-5 text-primary" />
                    <span className="font-semibold">Depolama</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Eşyalarınız için güvenli depolama alanı
                  </p>
                </div>
              </label>

              <label className="flex items-start gap-4 p-6 border-2 border-border rounded-lg cursor-pointer hover:border-primary transition">
                <input
                  type="checkbox"
                  checked={formData.needsInsurance}
                  onChange={(e) => setFormData({ ...formData, needsInsurance: e.target.checked })}
                  className="w-5 h-5 mt-1"
                />
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Truck className="w-5 h-5 text-primary" />
                    <span className="font-semibold">Sigorta</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Eşyalarınız için tam kapsamlı sigorta
                  </p>
                </div>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Ek Notlar</label>
              <textarea
                value={formData.additionalNotes}
                onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Belirtmek istediğiniz başka bir konu var mı?"
              />
            </div>
          </div>
        )}

        {/* Step 5: Özet */}
        {currentStep === 5 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-6 rounded-lg border border-primary/20">
              <h3 className="text-xl font-bold mb-4 text-primary">Teklif Özeti</h3>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Kişisel Bilgiler
                  </h4>
                  <div className="text-sm space-y-1 text-muted-foreground">
                    <p><strong>Ad Soyad:</strong> {formData.fullName}</p>
                    <p><strong>Telefon:</strong> {formData.phone}</p>
                    <p><strong>Email:</strong> {formData.email}</p>
                    {formData.preferredDate && <p><strong>Tercih Edilen Tarih:</strong> {new Date(formData.preferredDate).toLocaleDateString('tr-TR')}</p>}
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Taşınma Detayları
                  </h4>
                  <div className="text-sm space-y-1 text-muted-foreground">
                    <p><strong>Nereden:</strong> {formData.fromAddress} ({formData.fromFloor}. Kat, {formData.fromElevator ? 'Asansör var' : 'Asansör yok'})</p>
                    <p><strong>Nereye:</strong> {formData.toAddress} ({formData.toFloor}. Kat, {formData.toElevator ? 'Asansör var' : 'Asansör yok'})</p>
                    {formData.distance && <p><strong>Mesafe:</strong> {formData.distance} km</p>}
                    <p><strong>Konut Tipi:</strong> {formData.propertyType === 'apartment' ? 'Daire' : formData.propertyType === 'villa' ? 'Villa' : formData.propertyType === 'office' ? 'Ofis' : 'Depo'}</p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Package className="w-4 h-4" />
                    Eşya Bilgileri
                  </h4>
                  <div className="text-sm space-y-1 text-muted-foreground">
                    <p><strong>Oda Sayısı:</strong> {formData.rooms}+{parseInt(formData.rooms) - 1}</p>
                    <p><strong>Eşya Sayısı:</strong> {formData.furnitureCount}</p>
                    {(formData.hasFragileItems || formData.hasPiano || formData.hasAntiques) && (
                      <p><strong>Özel Eşyalar:</strong> {[
                        formData.hasFragileItems && 'Kırılabilir eşyalar',
                        formData.hasPiano && 'Piyano',
                        formData.hasAntiques && 'Antika eşyalar'
                      ].filter(Boolean).join(', ')}</p>
                    )}
                  </div>
                </div>

                {(formData.needsPacking || formData.needsDisassembly || formData.needsStorage || formData.needsInsurance) && (
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Settings className="w-4 h-4" />
                      Ek Hizmetler
                    </h4>
                    <div className="text-sm space-y-1 text-muted-foreground">
                      <p>{[
                        formData.needsPacking && 'Paketleme',
                        formData.needsDisassembly && 'Montaj/Demontaj',
                        formData.needsStorage && 'Depolama',
                        formData.needsInsurance && 'Sigorta'
                      ].filter(Boolean).join(', ')}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Not:</strong> Bu bilgiler doğrultusunda size en uygun teklifi hazırlayacağız. Detaylı fiyat bilgisi için ekibimiz en kısa sürede sizinle iletişime geçecektir.
              </p>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t">
          {currentStep > 1 && (
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Geri
            </Button>
          )}
          
          {currentStep < steps.length ? (
            <Button
              type="button"
              onClick={nextStep}
              className="ml-auto flex items-center gap-2"
            >
              İleri
              <ChevronRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="ml-auto flex items-center gap-2 bg-green-600 hover:bg-green-700"
            >
              {loading ? 'Gönderiliyor...' : 'Teklif Talebini Gönder'}
              <Check className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
