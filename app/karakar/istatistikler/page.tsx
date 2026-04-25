'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

export default function StatisticsPage() {
  const router = useRouter()
  const [statistics, setStatistics] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStatistics()
  }, [])

  async function fetchStatistics() {
    try {
      const res = await fetch('/api/statistics')
      const data = await res.json()
      setStatistics(data.data || [])
    } catch (error) {
      toast.error('Veriler yüklenemedi')
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Bu istatistiği silmek istediğinizden emin misiniz?')) return

    try {
      const res = await fetch(`/api/statistics/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Silme başarısız')
      
      toast.success('İstatistik silindi')
      fetchStatistics()
    } catch (error) {
      toast.error('Silme işlemi başarısız')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">İstatistikler</h1>
          <p className="text-muted-foreground mt-2">
            Ana sayfada gösterilecek istatistikleri yönetin
          </p>
        </div>
        <Link href="/karakar/istatistikler/yeni">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Yeni İstatistik
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium">Başlık</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Değer</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Sıra</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Durum</th>
                <th className="px-6 py-3 text-right text-sm font-medium">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                    Yükleniyor...
                  </td>
                </tr>
              ) : statistics.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                    Henüz istatistik eklenmemiş
                  </td>
                </tr>
              ) : (
                statistics.map((stat) => (
                  <tr key={stat.id} className="hover:bg-muted/30">
                    <td className="px-6 py-4">
                      <div className="font-medium">{stat.title}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-2xl font-bold text-primary">{stat.value}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-muted-foreground">{stat.order}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          stat.active
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {stat.active ? 'Aktif' : 'Pasif'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <Link href={`/karakar/istatistikler/${stat.id}`}>
                        <Button variant="outline" size="sm">
                          <Pencil className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleDelete(stat.id)}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
