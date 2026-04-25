'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Save, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'
import TiptapEditor from '@/components/admin/tiptap-editor'
import ImageInput from '@/components/admin/image-input'

interface ServiceFormProps {
  service?: {
    id: string
    name: string
    slug: string
    description: string | null
    content: string | null
    image: string | null
    icon: string | null
    benefits: string | null
    metaTitle: string | null
    metaDescription: string | null
    order: number
    active: boolean
    showOnHomepage: boolean
  }
}

export default function ServiceForm({ service }: ServiceFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: service?.name || '',
    slug: service?.slug || '',
    description: service?.description || '',
    content: service?.content || '',
    image: service?.image || '',
    icon: service?.icon || '',
    benefits: service?.benefits || '',
    metaTitle: service?.metaTitle || '',
    metaDescription: service?.metaDescription || '',
    order: service?.order || 0,
    active: service?.active !== undefined ? service.active : true,
    showOnHomepage: service?.showOnHomepage !== undefined ? service.showOnHomepage : true,
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    try {
      const url = service ? `/api/services/${service.id}` : '/api/services'
      const method = service ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast.success(service ? 'Hizmet güncellendi' : 'Hizmet oluşturuldu')
        router.push('/karakar/hizmetler')
        router.refresh()
      } else {
        toast.error('Hizmet kaydedilemedi')
      }
    } catch (error) {
      toast.error('Bir hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Hizmet Adı *
        </label>
        <input
          id="name"
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label htmlFor="slug" className="block text-sm font-medium mb-2">
          Slug (URL) *
        </label>
        <input
          id="slug"
          type="text"
          required
          value={formData.slug}
          onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
          className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <p className="text-sm text-muted-foreground mt-1">
          Örnek: lokal-nakliyat
        </p>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-2">
          Kısa Açıklama
        </label>
        <textarea
          id="description"
          rows={3}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <p className="text-sm text-muted-foreground mt-1">
          Ana sayfada gösterilecek kısa açıklama
        </p>
      </div>

      <div>
        <label htmlFor="icon" className="block text-sm font-medium mb-2">
          İkon (Lucide Icon Adı)
        </label>
        <input
          id="icon"
          type="text"
          value={formData.icon}
          onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
          className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <p className="text-sm text-muted-foreground mt-1">
          Örnek: Truck, Package, Phone (lucide-react icon adları)
        </p>
      </div>

      <div>
        <label htmlFor="order" className="block text-sm font-medium mb-2">
          Sıra
        </label>
        <input
          id="order"
          type="number"
          value={formData.order}
          onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
          className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="flex flex-col gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-sm font-semibold text-foreground">Görünürlük Ayarları</p>
        <div className="flex items-center gap-2">
          <input
            id="active"
            type="checkbox"
            checked={formData.active}
            onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
            className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
          />
          <label htmlFor="active" className="text-sm font-medium">
            Aktif
          </label>
          <span className="text-xs text-muted-foreground ml-1">— Hizmet detay sayfası erişilebilir</span>
        </div>
        <div className="flex items-center gap-2">
          <input
            id="showOnHomepage"
            type="checkbox"
            checked={formData.showOnHomepage}
            onChange={(e) => setFormData({ ...formData, showOnHomepage: e.target.checked })}
            className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
          />
          <label htmlFor="showOnHomepage" className="text-sm font-medium">
            Ana Sayfada Göster
          </label>
          <span className="text-xs text-muted-foreground ml-1">— Hizmetlerimiz bölümünde görünür</span>
        </div>
      </div>

      {/* Görsel */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold mb-4">Hizmet Görseli</h3>
        <ImageInput
          value={formData.image}
          onChange={(url) => setFormData({ ...formData, image: url })}
          label="Görsel URL"
        />
      </div>

      {/* Avantajlar */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold mb-2">Hizmet Avantajları</h3>
        <p className="text-sm text-muted-foreground mb-3">
          Her satıra bir avantaj yazın
        </p>
        <textarea
          rows={6}
          value={formData.benefits}
          onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
          placeholder={`Profesyonel ve deneyimli ekip
Sigortalı taşımacılık hizmeti
Modern araç filosu
Uygun fiyat garantisi
7/24 müşteri desteği
Zamanında teslimat`}
          className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm"
        />
      </div>

      {/* İçerik Editörü */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold mb-4">Detaylı İçerik</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Hizmet detay sayfasında gösterilecek içeriği yazın
        </p>
        <TiptapEditor
          content={formData.content}
          onChange={(content) => setFormData({ ...formData, content })}
        />
      </div>

      {/* SEO */}
      <div className="border-t pt-6 space-y-4">
        <h3 className="text-lg font-semibold">SEO Ayarları</h3>
        
        <div>
          <label htmlFor="metaTitle" className="block text-sm font-medium mb-2">
            Meta Başlık
          </label>
          <input
            id="metaTitle"
            type="text"
            value={formData.metaTitle}
            onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
            placeholder={`${formData.name} - Profesyonel Nakliyat Hizmeti`}
            className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label htmlFor="metaDescription" className="block text-sm font-medium mb-2">
            Meta Açıklama
          </label>
          <textarea
            id="metaDescription"
            rows={3}
            value={formData.metaDescription}
            onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
            placeholder="Hizmet açıklaması..."
            className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div className="flex gap-4 border-t pt-6">
        <Button type="submit" disabled={loading}>
          <Save className="w-4 h-4 mr-2" />
          {loading ? 'Kaydediliyor...' : 'Kaydet'}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/karakar/hizmetler')}
        >
          İptal
        </Button>
      </div>
    </form>
  )
}
