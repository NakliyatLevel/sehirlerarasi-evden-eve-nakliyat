'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Upload, Trash2, Copy, Check, Edit2, X } from 'lucide-react'
import Image from 'next/image'
import { toast } from 'sonner'

interface MediaFile {
  id: string
  filename: string
  originalName: string
  url: string
  alt: string | null
  size: number
  mimeType: string
  createdAt: Date
  updatedAt: Date
}

interface MediaGalleryProps {
  initialFiles: MediaFile[]
}

export default function MediaGallery({ initialFiles }: MediaGalleryProps) {
  const router = useRouter()
  const [files, setFiles] = useState(initialFiles)
  const [uploading, setUploading] = useState(false)
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null)
  const [editingAlt, setEditingAlt] = useState<string | null>(null)
  const [altValue, setAltValue] = useState('')

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Yükleme başarısız')
      }

      const data = await response.json()
      
      // Yeni dosyayı listeye ekle
      setFiles([data.media, ...files])
      toast.success('Resim başarıyla yüklendi')

      router.refresh()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Bir hata oluştu')
    } finally {
      setUploading(false)
      e.target.value = '' // Input'u temizle
    }
  }

  async function handleDelete(filename: string) {
    if (!confirm('Bu dosyayı silmek istediğinizden emin misiniz?')) return

    try {
      const response = await fetch(`/api/upload/${filename}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Silme başarısız')

      setFiles(files.filter(f => f.filename !== filename))
      toast.success('Resim silindi')
      router.refresh()
    } catch (error) {
      toast.error('Bir hata oluştu')
    }
  }

  function copyUrl(url: string) {
    const fullUrl = `${window.location.origin}${url}`
    navigator.clipboard.writeText(fullUrl)
    setCopiedUrl(url)
    toast.success('URL kopyalandı')
    setTimeout(() => setCopiedUrl(null), 2000)
  }

  function startEditAlt(file: MediaFile) {
    setEditingAlt(file.filename)
    setAltValue(file.alt || '')
  }

  function cancelEditAlt() {
    setEditingAlt(null)
    setAltValue('')
  }

  async function saveAlt(filename: string) {
    try {
      const response = await fetch(`/api/upload/${filename}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ alt: altValue }),
      })

      if (!response.ok) throw new Error('Güncelleme başarısız')

      const data = await response.json()
      setFiles(files.map(f => f.filename === filename ? data.media : f))
      setEditingAlt(null)
      setAltValue('')
      toast.success('Alt tag güncellendi')
      router.refresh()
    } catch (error) {
      toast.error('Bir hata oluştu')
    }
  }

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <div className="bg-white rounded-lg shadow p-6">
        <label className="block">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary transition cursor-pointer">
            <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-sm font-medium mb-2">
              {uploading ? 'Yükleniyor...' : 'Resim Yükle'}
            </p>
            <p className="text-xs text-muted-foreground">
              JPG, PNG, GIF, WEBP (Max 5MB)
            </p>
            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              disabled={uploading}
              className="hidden"
            />
          </div>
        </label>
      </div>

      {/* Media Grid */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">
          Medya Kütüphanesi ({files.length})
        </h2>

        {files.length === 0 ? (
          <p className="text-muted-foreground text-center py-12">
            Henüz yüklenmiş medya yok
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {files.map((file) => (
              <div
                key={file.filename}
                className="border border-gray-200 rounded-lg overflow-hidden hover:border-primary transition"
              >
                {/* Image */}
                <div className="relative aspect-video bg-gray-100">
                  <Image
                    src={file.url}
                    alt={file.alt || file.filename}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Info */}
                <div className="p-4 space-y-3">
                  {/* Filename */}
                  <div>
                    <p className="text-xs text-muted-foreground">Dosya Adı</p>
                    <p className="text-sm font-medium truncate">{file.filename}</p>
                  </div>

                  {/* Alt Tag */}
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Alt Tag (SEO)</p>
                    {editingAlt === file.filename ? (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={altValue}
                          onChange={(e) => setAltValue(e.target.value)}
                          className="flex-1 px-2 py-1 text-sm border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="Alt tag girin..."
                        />
                        <Button
                          size="sm"
                          onClick={() => saveAlt(file.filename)}
                          className="h-7"
                        >
                          <Check className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={cancelEditAlt}
                          className="h-7"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <p className="text-sm flex-1 truncate">
                          {file.alt || <span className="text-muted-foreground italic">Belirtilmemiş</span>}
                        </p>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => startEditAlt(file)}
                          className="h-7 w-7 p-0"
                        >
                          <Edit2 className="w-3 h-3" />
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2 border-t">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyUrl(file.url)}
                      className="flex-1"
                    >
                      {copiedUrl === file.url ? (
                        <>
                          <Check className="w-3 h-3 mr-1" />
                          Kopyalandı
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 mr-1" />
                          URL Kopyala
                        </>
                      )}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(file.filename)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
