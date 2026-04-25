'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Check, X } from 'lucide-react'
import { toast } from 'sonner'

export default function ApproveReviewButton({
  reviewId,
  approved,
}: {
  reviewId: string
  approved: boolean
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleToggle() {
    setLoading(true)
    try {
      const response = await fetch(`/api/reviews/${reviewId}/approve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ approved: !approved }),
      })

      if (!response.ok) throw new Error('İşlem başarısız')

      router.refresh()
      toast.success('Yorum onaylandı')
    } catch (error) {
      toast.error('Bir hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleToggle}
      disabled={loading}
      className={approved ? 'text-yellow-600' : 'text-green-600'}
    >
      {approved ? <X className="w-4 h-4" /> : <Check className="w-4 h-4" />}
    </Button>
  )
}
