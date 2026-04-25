'use client'

import { useState } from 'react'
import Image from 'next/image'
import Lightbox from '@/components/ui/lightbox'

interface GalleryItem {
  id: string
  image: string
  title: string
  description?: string | null
}

interface GalleryGridProps {
  items: GalleryItem[]
}

export default function GalleryGrid({ items }: GalleryGridProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const openLightbox = (index: number) => {
    setCurrentIndex(index)
    setLightboxOpen(true)
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {items.map((item, index) => (
          <div
            key={item.id}
            className="bg-white rounded-lg border border-border overflow-hidden hover:shadow-lg transition group cursor-pointer"
            onClick={() => openLightbox(index)}
          >
            <div className="relative aspect-square">
              <Image
                src={item.image}
                alt={item.title || 'Görsel'}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            {item.title && (
              <div className="p-4">
                <h3 className="font-semibold text-center">{item.title}</h3>
                {item.description && (
                  <p className="text-muted-foreground text-sm text-center mt-1">{item.description}</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {lightboxOpen && (
        <Lightbox
          images={items}
          currentIndex={currentIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </>
  )
}
