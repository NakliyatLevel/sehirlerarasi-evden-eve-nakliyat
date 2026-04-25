'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Save, ExternalLink } from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'

const DEFAULTS = {
  pageDesc: 'Yılların deneyimi ile güvenilir ve profesyonel nakliyat hizmetleri sunuyoruz.',
  bizKimiz1:
    'Firmamız, evden eve nakliyat sektöründe 15 yılı aşkın deneyimi ile müşterilerine en kaliteli hizmeti sunmayı ilke edinmiş bir firmadır.',
  bizKimiz2:
    'Profesyonel ekibimiz ve modern araç filomuz ile Türkiye\'nin her yerine güvenli, hızlı ve ekonomik nakliyat hizmetleri sağlıyoruz.',
  bizKimiz3:
    'Müşteri memnuniyetini ön planda tutarak, eşyalarınızın güvenliğini %100 garanti altına alıyoruz. Sigortalı taşımacılık hizmetimiz ile taşıma sürecinde oluşabilecek her türlü riskin karşılığını veriyoruz.',
  misyon:
    'Müşterilerimize en kaliteli, güvenilir ve ekonomik nakliyat hizmetlerini sunarak, taşınma sürecini stressiz ve sorunsuz bir deneyime dönüştürmek. Profesyonel ekibimiz ve modern teknolojimiz ile sektörde standartları belirlemek.',
  vizyon:
    'Türkiye\'nin en güvenilir ve tercih edilen nakliyat firması olmak. Sürekli gelişen hizmet kalitemiz ve müşteri memnuniyeti odaklı yaklaşımımız ile sektörde lider konuma ulaşmak.',
  stat1Value: '10,000+',
  stat1Label: 'Mutlu Müşteri',
  stat2Value: '15+',
  stat2Label: 'Yıl Tecrübe',
  stat3Value: '%100',
  stat3Label: 'Sigortalı',
  stat4Value: '7/24',
  stat4Label: 'Hizmet',
  neden1Title: 'Güvenli Taşıma',
  neden1Desc: 'Tüm eşyalarınız sigorta güvencesi altında taşınır. Profesyonel paketleme ve taşıma teknikleri kullanırız.',
  neden2Title: 'Deneyimli Ekip',
  neden2Desc: '15 yılı aşkın sektör deneyimi olan profesyonel ekibimiz ile hizmetinizdeyiz.',
  neden3Title: '7/24 Destek',
  neden3Desc: 'Haftanın her günü, günün her saati müşteri hizmetlerimize ulaşabilirsiniz.',
}

export default function AdminHakkimizdaPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState(DEFAULTS)

  useEffect(() => {
    fetch('/api/settings')
      .then((r) => r.json())
      .then((data) => {
        if (data.hakkimizda_content) {
          try {
            const parsed = JSON.parse(data.hakkimizda_content)
            setForm({ ...DEFAULTS, ...parsed })
          } catch {}
        }
      })
      .catch(() => toast.error('Veriler yüklenemedi'))
      .finally(() => setLoading(false))
  }, [])

  function handleChange(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSave() {
    setSaving(true)
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hakkimizda_content: JSON.stringify(form) }),
      })
      if (!res.ok) throw new Error()
      toast.success('Hakkımızda sayfası kaydedildi')
    } catch {
      toast.error('Kayıt başarısız')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-muted-foreground">
        Yükleniyor...
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Hakkımızda Sayfası</h1>
          <p className="text-muted-foreground mt-2">
            Site üzerindeki Hakkımızda sayfasının içeriğini düzenleyin
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/hakkimizda" target="_blank">
            <Button variant="outline" size="sm">
              <ExternalLink className="w-4 h-4 mr-2" />
              Sayfayı Gör
            </Button>
          </Link>
          <Button onClick={handleSave} disabled={saving}>
            <Save className="w-4 h-4 mr-2" />
            {saving ? 'Kaydediliyor...' : 'Kaydet'}
          </Button>
        </div>
      </div>

      {/* Başlık Altı Açıklama */}
      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <h2 className="text-lg font-semibold border-b pb-2">Başlık Altı Açıklama</h2>
        <div>
          <label className="block text-sm font-medium mb-1">
            Sayfa üst banner&apos;ındaki açıklama metni
          </label>
          <input
            type="text"
            value={form.pageDesc}
            onChange={(e) => handleChange('pageDesc', e.target.value)}
            className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm"
          />
        </div>
      </div>

      {/* Biz Kimiz */}
      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <h2 className="text-lg font-semibold border-b pb-2">Biz Kimiz? Bölümü</h2>
        <div>
          <label className="block text-sm font-medium mb-1">1. Paragraf</label>
          <textarea
            rows={3}
            value={form.bizKimiz1}
            onChange={(e) => handleChange('bizKimiz1', e.target.value)}
            className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">2. Paragraf</label>
          <textarea
            rows={3}
            value={form.bizKimiz2}
            onChange={(e) => handleChange('bizKimiz2', e.target.value)}
            className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">3. Paragraf</label>
          <textarea
            rows={3}
            value={form.bizKimiz3}
            onChange={(e) => handleChange('bizKimiz3', e.target.value)}
            className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm"
          />
        </div>
      </div>

      {/* İstatistikler */}
      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <h2 className="text-lg font-semibold border-b pb-2">İstatistikler (4 Kutu)</h2>
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="border border-border rounded-md p-4 space-y-3">
              <p className="text-sm font-medium text-muted-foreground">Kutu {i}</p>
              <div>
                <label className="block text-xs font-medium mb-1">Değer</label>
                <input
                  type="text"
                  value={form[`stat${i}Value` as keyof typeof form]}
                  onChange={(e) => handleChange(`stat${i}Value`, e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  placeholder="10,000+"
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Etiket</label>
                <input
                  type="text"
                  value={form[`stat${i}Label` as keyof typeof form]}
                  onChange={(e) => handleChange(`stat${i}Label`, e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  placeholder="Mutlu Müşteri"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Misyon & Vizyon */}
      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <h2 className="text-lg font-semibold border-b pb-2">Misyon & Vizyon</h2>
        <div>
          <label className="block text-sm font-medium mb-1">Misyonumuz</label>
          <textarea
            rows={4}
            value={form.misyon}
            onChange={(e) => handleChange('misyon', e.target.value)}
            className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Vizyonumuz</label>
          <textarea
            rows={4}
            value={form.vizyon}
            onChange={(e) => handleChange('vizyon', e.target.value)}
            className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm"
          />
        </div>
      </div>

      {/* Neden Biz */}
      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <h2 className="text-lg font-semibold border-b pb-2">Neden Bizi Tercih Etmelisiniz? (3 Kart)</h2>
        {[1, 2, 3].map((i) => (
          <div key={i} className="border border-border rounded-md p-4 space-y-3">
            <p className="text-sm font-medium text-muted-foreground">Kart {i}</p>
            <div>
              <label className="block text-xs font-medium mb-1">Başlık</label>
              <input
                type="text"
                value={form[`neden${i}Title` as keyof typeof form]}
                onChange={(e) => handleChange(`neden${i}Title`, e.target.value)}
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Açıklama</label>
              <textarea
                rows={2}
                value={form[`neden${i}Desc` as keyof typeof form]}
                onChange={(e) => handleChange(`neden${i}Desc`, e.target.value)}
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end pb-6">
        <Button onClick={handleSave} disabled={saving} size="lg">
          <Save className="w-4 h-4 mr-2" />
          {saving ? 'Kaydediliyor...' : 'Tüm Değişiklikleri Kaydet'}
        </Button>
      </div>
    </div>
  )
}
