'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { toast } from 'sonner'

export default function DeleteButton({ id, endpoint }: { id: string; endpoint: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleDelete() {
    if (!confirm('Silmek istediğinizden emin misiniz?')) return

    setLoading(true)
    try {
      const response = await fetch(`/api/${endpoint}/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        toast.success('Başarıyla silindi')
        router.refresh()
      } else {
        toast.error('Silinemedi')
      }
    } catch (error) {
      toast.error('Silinemedi')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      variant="destructive"
      size="sm"
      onClick={handleDelete}
      disabled={loading}
    >
      <Trash2 className="w-4 h-4" />
    </Button>
  )
}
