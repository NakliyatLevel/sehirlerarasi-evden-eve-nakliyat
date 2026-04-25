'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { X, Upload, Check, Search } from 'lucide-react'
import Image from 'next/image'
import { toast } from 'sonner'

interface Media {
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

interface MediaPickerProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (url: string) => void
  currentImage?: string
}

export default function MediaPicker({ isOpen, onClose, onSelect, currentImage }: MediaPickerProps) {
  const [media, setMedia] = useState<Media[]>([])
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedUrl, setSelectedUrl] = useState(currentImage || '')

  useEffect(() => {
    if (isOpen) {
      fetchMedia()
      setSelectedUrl(currentImage || '')
    }
  }, [isOpen, currentImage])

  async function fetchMedia() {
    setLoading(true)
    try {
      const response = await fetch('/api/media')
      if (!response.ok) throw new Error('Medya yüklenemedi')
      const data = await response.json()
      setMedia(data)
    } catch (error) {
      toast.error('Medya yüklenemedi')
    } finally {
      setLoading(false)
    }
  }

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
      setMedia([data.media, ...media])
      toast.success('Resim başarıyla yüklendi')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Bir hata oluştu')
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  function handleSelect() {
    if (selectedUrl) {
      onSelect(selectedUrl)
      onClose()
      toast.success('Resim seçildi')
    }
  }

  const filteredMedia = media.filter(m =>
    m.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.alt?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-5xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-primary">Medya Seç</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Upload Area */}
        <div className="p-6 border-b">
          <label className="block">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition cursor-pointer">
              <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm font-medium mb-1">
                {uploading ? 'Yükleniyor...' : 'Yeni Resim Yükle'}
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

        {/* Search */}
        <div className="p-6 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Resim ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Media Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <p className="text-center text-muted-foreground py-12">Yükleniyor...</p>
          ) : filteredMedia.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">
              {searchTerm ? 'Sonuç bulunamadı' : 'Henüz medya yok'}
            </p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredMedia.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedUrl(item.url)}
                  className={`relative aspect-square border-2 rounded-lg overflow-hidden cursor-pointer transition ${
                    selectedUrl === item.url
                      ? 'border-primary ring-2 ring-primary'
                      : 'border-gray-200 hover:border-primary'
                  }`}
                >
                  <Image
                    src={item.url}
                    alt={item.alt || item.filename}
                    fill
                    className="object-cover"
                  />
                  {selectedUrl === item.url && (
                    <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        <Check className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs p-2 truncate">
                    {item.filename}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t bg-gray-50">
          <p className="text-sm text-muted-foreground">
            {selectedUrl ? 'Resim seçildi' : 'Bir resim seçin'}
          </p>
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose}>
              İptal
            </Button>
            <Button onClick={handleSelect} disabled={!selectedUrl}>
              Seç ve Kullan
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
