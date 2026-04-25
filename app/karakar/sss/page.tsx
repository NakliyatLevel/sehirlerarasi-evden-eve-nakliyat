'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Plus, Edit, Trash2 } from 'lucide-react'
import { toast } from 'sonner'

export default function FAQPage() {
  const router = useRouter()
  const [faqs, setFaqs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFAQs()
  }, [])

  async function fetchFAQs() {
    try {
      const res = await fetch('/api/faqs')
      const data = await res.json()
      setFaqs(data.data || [])
    } catch (error) {
      toast.error('Veriler yüklenemedi')
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Bu soruyu silmek istediğinizden emin misiniz?')) return

    try {
      const res = await fetch(`/api/faqs/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Silme başarısız')
      
      toast.success('Soru silindi')
      fetchFAQs()
    } catch (error) {
      toast.error('Silme işlemi başarısız')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">SSS Yönetimi</h1>
          <p className="text-muted-foreground mt-2">Sıkça sorulan soruları yönetin</p>
        </div>
        <Link href="/karakar/sss/yeni">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Yeni Soru
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium">Soru</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Kategori</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Durum</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Sıra</th>
              <th className="px-6 py-3 text-right text-sm font-medium">İşlemler</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                  Yükleniyor...
                </td>
              </tr>
            ) : faqs.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                  Henüz SSS yok
                </td>
              </tr>
            ) : (
              faqs.map((faq) => (
                <tr key={faq.id}>
                  <td className="px-6 py-4">
                    <p className="font-medium line-clamp-2">{faq.question}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {faq.category || '-'}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2 py-1 text-xs rounded-full ${
                        faq.active
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {faq.active ? 'Aktif' : 'Pasif'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">{faq.order}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/karakar/sss/${faq.id}`}>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleDelete(faq.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
