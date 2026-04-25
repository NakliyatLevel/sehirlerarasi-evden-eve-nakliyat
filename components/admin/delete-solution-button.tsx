'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { toast } from 'sonner'

export default function DeleteSolutionButton({ solutionId }: { solutionId: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleDelete() {
    if (!confirm('Bu çözümü silmek istediğinize emin misiniz?')) return
    setLoading(true)
    try {
      const res = await fetch(`/api/solutions/${solutionId}`, { method: 'DELETE' })
      if (res.ok) {
        toast.success('Çözüm silindi')
        router.refresh()
      } else {
        toast.error('Çözüm silinemedi')
      }
    } catch {
      toast.error('Bir hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={handleDelete} disabled={loading}>
      <Trash2 className="w-4 h-4 text-destructive" />
    </Button>
  )
}
