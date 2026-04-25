'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Save, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'
import TiptapEditor from '@/components/admin/tiptap-editor'
import ImageInput from '@/components/admin/image-input'

interface SolutionFormProps {
  solution?: {
    id: string
    slug: string
    title: string
    description: string | null
    content: string | null
    image: string | null
    icon: string | null
    metaTitle: string | null
    metaDescription: string | null
    order: number
    active: boolean
  }
}

export default function SolutionForm({ solution }: SolutionFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    slug: solution?.slug || '',
    title: solution?.title || '',
    description: solution?.description || '',
    content: solution?.content || '',
    image: solution?.image || '',
    icon: solution?.icon || '',
    metaTitle: solution?.metaTitle || '',
    metaDescription: solution?.metaDescription || '',
    order: solution?.order || 0,
    active: solution?.active !== undefined ? solution.active : true,
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const url = solution ? `/api/solutions/${solution.id}` : '/api/solutions'
      const method = solution ? 'PUT' : 'POST'
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (response.ok) {
        toast.success(solution ? 'Çözüm güncellendi' : 'Çözüm oluşturuldu')
        router.push('/karakar/cozumler')
        router.refresh()
      } else {
        toast.error('Çözüm kaydedilemedi')
      }
    } catch {
      toast.error('Bir hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Başlık *</label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Slug (URL) *</label>
          <input
            type="text"
            required
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <p className="text-xs text-muted-foreground mt-1">Örnek: ucretsiz-ekspertiz</p>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Kısa Açıklama</label>
        <textarea
          rows={3}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">İkon (Lucide adı)</label>
          <input
            type="text"
            value={formData.icon}
            onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
            placeholder="Shield, Package, FileText..."
            className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Sıra</label>
          <input
            type="number"
            value={formData.order}
            onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
            className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="active"
          checked={formData.active}
          onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
          className="w-4 h-4 text-primary border-gray-300 rounded"
        />
        <label htmlFor="active" className="text-sm font-medium">Aktif</label>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold mb-4">Görsel</h3>
        <ImageInput
          value={formData.image}
          onChange={(url) => setFormData({ ...formData, image: url })}
          label="Çözüm Görseli"
        />
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold mb-4">Detaylı İçerik</h3>
        <p className="text-sm text-muted-foreground mb-4">Detay sayfasında görünecek HTML içeriği</p>
        <TiptapEditor
          content={formData.content}
          onChange={(content) => setFormData({ ...formData, content })}
        />
      </div>

      <div className="border-t pt-6 space-y-4">
        <h3 className="text-lg font-semibold">SEO Ayarları</h3>
        <div>
          <label className="block text-sm font-medium mb-2">Meta Başlık</label>
          <input
            type="text"
            value={formData.metaTitle}
            onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
            className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Meta Açıklama</label>
          <textarea
            rows={3}
            value={formData.metaDescription}
            onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
            className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 pt-4">
        <Link href="/karakar/cozumler">
          <Button type="button" variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Geri
          </Button>
        </Link>
        <Button type="submit" disabled={loading}>
          <Save className="w-4 h-4 mr-2" />
          {loading ? 'Kaydediliyor...' : 'Kaydet'}
        </Button>
      </div>
    </form>
  )
}
