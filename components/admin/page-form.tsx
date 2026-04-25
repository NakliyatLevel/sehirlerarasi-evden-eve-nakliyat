'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Save, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'
import TiptapEditor from '@/components/admin/tiptap-editor'

interface PageFormProps {
  page?: {
    id: string
    slug: string
    title: string
    content: any
    seoTitle: string | null
    seoDesc: string | null
    seoKeywords: string | null
    published: boolean
  }
}

export default function PageForm({ page }: PageFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  
  // Content'i HTML string'e çevir
  const contentHtml = page?.content 
    ? (typeof page.content === 'string' ? page.content : JSON.stringify(page.content))
    : ''
  
  const [formData, setFormData] = useState({
    title: page?.title || '',
    slug: page?.slug || '',
    content: contentHtml,
    seoTitle: page?.seoTitle || '',
    seoDesc: page?.seoDesc || '',
    seoKeywords: page?.seoKeywords || '',
    published: page?.published !== undefined ? page.published : true,
  })

  function generateSlug(title: string) {
    return title
      .toLowerCase()
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ş/g, 's')
      .replace(/ı/g, 'i')
      .replace(/ö/g, 'o')
      .replace(/ç/g, 'c')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }

  function handleTitleChange(title: string) {
    setFormData({
      ...formData,
      title,
      slug: page ? formData.slug : generateSlug(title),
    })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    try {
      const url = page ? `/api/pages/${page.id}` : '/api/pages'
      const method = page ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error('Kayıt başarısız')

      toast.success(page ? 'Sayfa güncellendi' : 'Sayfa oluşturuldu')
      router.push('/karakar/sayfalar')
      router.refresh()
    } catch (error) {
      toast.error('Bir hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Başlık *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              required
              placeholder="Hakkımızda"
              className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Slug (URL) *</label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              required
              placeholder="hakkimizda"
              className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Örnek: hakkimizda, iletisim, gizlilik-politikasi
            </p>
          </div>

          <div className="md:col-span-2 flex items-center">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.published}
                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                className="w-4 h-4"
              />
              <span className="text-sm font-medium">Yayınla</span>
            </label>
          </div>
        </div>
      </div>

      {/* İçerik Editörü */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Sayfa İçeriği</h3>
        <TiptapEditor
          content={formData.content}
          onChange={(content) => setFormData({ ...formData, content })}
        />
      </div>

      {/* SEO */}
      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <h3 className="text-lg font-semibold">SEO Ayarları</h3>

        <div>
          <label className="block text-sm font-medium mb-2">SEO Başlık</label>
          <input
            type="text"
            value={formData.seoTitle}
            onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
            placeholder={formData.title}
            className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">SEO Açıklama</label>
          <textarea
            value={formData.seoDesc}
            onChange={(e) => setFormData({ ...formData, seoDesc: e.target.value })}
            rows={3}
            placeholder="Sayfa açıklaması..."
            className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">SEO Anahtar Kelimeler</label>
          <input
            type="text"
            value={formData.seoKeywords}
            onChange={(e) => setFormData({ ...formData, seoKeywords: e.target.value })}
            placeholder="nakliyat, evden eve, taşımacılık"
            className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button type="submit" disabled={loading}>
          <Save className="w-4 h-4 mr-2" />
          {loading ? 'Kaydediliyor...' : 'Kaydet'}
        </Button>
        <Link href="/karakar/sayfalar">
          <Button type="button" variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Geri
          </Button>
        </Link>
      </div>
    </form>
  )
}
