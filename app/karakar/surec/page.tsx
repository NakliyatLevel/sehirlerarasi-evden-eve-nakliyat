'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

export default function ProcessPage() {
  const router = useRouter()
  const [processes, setProcesses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProcesses()
  }, [])

  async function fetchProcesses() {
    try {
      const res = await fetch('/api/processes')
      const data = await res.json()
      setProcesses(data.data || [])
    } catch (error) {
      toast.error('Veriler yüklenemedi')
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Bu süreç adımını silmek istediğinizden emin misiniz?')) return

    try {
      const res = await fetch(`/api/processes/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Silme başarısız')
      
      toast.success('Süreç adımı silindi')
      fetchProcesses()
    } catch (error) {
      toast.error('Silme işlemi başarısız')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Süreç Adımları</h1>
          <p className="text-muted-foreground mt-2">
            &quot;Nasıl Çalışır?&quot; bölümünde gösterilecek adımları yönetin
          </p>
        </div>
        <Link href="/karakar/surec/yeni">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Yeni Adım
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium">Adım</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Başlık</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Açıklama</th>
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
              ) : processes.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                    Henüz süreç adımı eklenmemiş
                  </td>
                </tr>
              ) : (
                processes.map((process) => (
                  <tr key={process.id} className="hover:bg-muted/30">
                    <td className="px-6 py-4">
                      <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                        {process.step}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium">{process.title}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-muted-foreground line-clamp-2 max-w-md">
                        {process.description}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          process.active
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {process.active ? 'Aktif' : 'Pasif'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <Link href={`/karakar/surec/${process.id}`}>
                        <Button variant="outline" size="sm">
                          <Pencil className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleDelete(process.id)}
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
