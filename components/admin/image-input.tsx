'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ImagePlus, X } from 'lucide-react'
import Image from 'next/image'
import MediaPicker from './media-picker'

interface ImageInputProps {
  value: string
  onChange: (value: string) => void
  label?: string
  required?: boolean
}

export default function ImageInput({ value, onChange, label, required }: ImageInputProps) {
  const [isPickerOpen, setIsPickerOpen] = useState(false)

  function handleRemove() {
    onChange('')
  }

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium mb-2">
          {label} {required && <span className="text-destructive">*</span>}
        </label>
      )}

      {value ? (
        <div className="relative border border-gray-200 rounded-lg overflow-hidden">
          <div className="relative aspect-video bg-gray-100">
            <Image
              src={value}
              alt="Seçili resim"
              fill
              className="object-cover"
            />
          </div>
          <div className="p-3 bg-gray-50 flex items-center justify-between">
            <p className="text-sm text-muted-foreground truncate flex-1">
              {value}
            </p>
            <div className="flex gap-2 ml-3">
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => setIsPickerOpen(true)}
              >
                Değiştir
              </Button>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={handleRemove}
                className="text-destructive hover:text-destructive"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <Button
          type="button"
          variant="outline"
          onClick={() => setIsPickerOpen(true)}
          className="w-full h-32 border-2 border-dashed hover:border-primary"
        >
          <div className="flex flex-col items-center gap-2">
            <ImagePlus className="w-8 h-8 text-muted-foreground" />
            <span className="text-sm font-medium">Resim Seç</span>
          </div>
        </Button>
      )}

      <MediaPicker
        isOpen={isPickerOpen}
        onClose={() => setIsPickerOpen(false)}
        onSelect={onChange}
        currentImage={value}
      />
    </div>
  )
}
