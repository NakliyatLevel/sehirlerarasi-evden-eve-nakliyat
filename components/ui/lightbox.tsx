'use client'

import { useState } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

interface LightboxProps {
  images: Array<{
    id: string
    image: string
    title?: string | null
    description?: string | null
  }>
  currentIndex: number
  onClose: () => void
}

export default function Lightbox({ images, currentIndex, onClose }: LightboxProps) {
  const [index, setIndex] = useState(currentIndex)

  const goToPrevious = () => {
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
    if (e.key === 'ArrowLeft') goToPrevious()
    if (e.key === 'ArrowRight') goToNext()
  }

  return (
    <div
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
      onClick={onClose}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300 transition z-10"
      >
        <X className="w-8 h-8" />
      </button>

      {/* Previous Button */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            goToPrevious()
          }}
          className="absolute left-4 text-white hover:text-gray-300 transition z-10"
        >
          <ChevronLeft className="w-12 h-12" />
        </button>
      )}

      {/* Image */}
      <div
        className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full h-full">
          <Image
            src={images[index].image}
            alt={images[index].title || 'Görsel'}
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Image Info */}
        {(images[index].title || images[index].description) && (
          <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-4">
            {images[index].title && (
              <h3 className="font-semibold text-lg">{images[index].title}</h3>
            )}
            {images[index].description && (
              <p className="text-sm text-gray-300 mt-1">{images[index].description}</p>
            )}
          </div>
        )}
      </div>

      {/* Next Button */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            goToNext()
          }}
          className="absolute right-4 text-white hover:text-gray-300 transition z-10"
        >
          <ChevronRight className="w-12 h-12" />
        </button>
      )}

      {/* Image Counter */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black/70 px-4 py-2 rounded-full">
          {index + 1} / {images.length}
        </div>
      )}
    </div>
  )
}
