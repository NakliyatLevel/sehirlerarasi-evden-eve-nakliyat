'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Save, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import ImageInput from '@/components/admin/image-input'
import TiptapEditor from '@/components/admin/tiptap-editor'
import { toast } from 'sonner'

interface BlogFormProps {
  post?: {
    id: string
    title: string
    slug: string
    excerpt?: string | null
    content: string
    image?: string | null
    published: boolean
    seoTitle?: string | null
    seoDesc?: string | null
    seoKeywords?: string | null
  }
}

export default function BlogForm({ post }: BlogFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: post?.title || '',
    slug: post?.slug || '',
    excerpt: post?.excerpt || '',
    content: post?.content || '',
    image: post?.image || '',
    published: post?.published || false,
    seoTitle: post?.seoTitle || '',
    seoDesc: post?.seoDesc || '',
    seoKeywords: post?.seoKeywords || '',
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
      slug: generateSlug(title),
    })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    try {
      const url = post ? `/api/blog/${post.id}` : '/api/blog'
      const method = post ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          id: post?.id, // ID'yi de gönder (update için gerekli)
        }),
      })

      if (!response.ok) throw new Error('Kayıt başarısız')

      toast.success(post ? 'Blog güncellendi' : 'Blog oluşturuldu')
      router.push('/karakar/blog')
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
              className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Slug *</label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              required
              className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Özet</label>
            <textarea
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">İçerik *</label>
            <TiptapEditor
              content={formData.content}
              onChange={(html) => setFormData({ ...formData, content: html })}
              placeholder="Blog içeriğinizi buraya yazın..."
            />
          </div>

          <div className="md:col-span-2">
            <ImageInput
              label="Görsel"
              value={formData.image}
              onChange={(url) => setFormData({ ...formData, image: url })}
            />
          </div>

          <div className="md:col-span-2">
            <label className="flex items-center gap-2">
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

      <div className="bg-white rounded-lg shadow p-6 space-y-6">
        <h3 className="text-lg font-semibold">SEO Ayarları</h3>

        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">SEO Başlık</label>
            <input
              type="text"
              value={formData.seoTitle}
              onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
              className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">SEO Açıklama</label>
            <textarea
              value={formData.seoDesc}
              onChange={(e) => setFormData({ ...formData, seoDesc: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">SEO Anahtar Kelimeler</label>
            <input
              type="text"
              value={formData.seoKeywords}
              onChange={(e) => setFormData({ ...formData, seoKeywords: e.target.value })}
              className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button type="submit" disabled={loading}>
          <Save className="w-4 h-4 mr-2" />
          {loading ? 'Kaydediliyor...' : 'Kaydet'}
        </Button>
        <Link href="/karakar/blog">
          <Button type="button" variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Geri
          </Button>
        </Link>
      </div>
    </form>
  )
}
