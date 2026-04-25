import { prisma } from '@/lib/db'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Plus, MapPin } from 'lucide-react'
import DeleteButton from '@/components/admin/delete-button'

async function getServiceAreas() {
  try {
    const areas = await prisma.serviceArea.findMany({
      orderBy: { order: 'asc' },
    })
    return areas
  } catch (error) {
    return []
  }
}

export default async function AdminServiceAreasPage() {
  const areas = await getServiceAreas()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Hizmet Bölgeleri</h1>
          <p className="text-muted-foreground mt-2">
            Hizmet verdiğiniz şehirleri yönetin
          </p>
        </div>
        <Link href="/karakar/hizmet-bolgeleri/yeni">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Yeni Bölge Ekle
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow">
        {areas.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground">
            Henüz hizmet bölgesi eklenmemiş
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium">Şehir</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Açıklama</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Sıra</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Durum</th>
                  <th className="px-6 py-3 text-right text-sm font-medium">İşlemler</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {areas.map((area) => (
                  <tr key={area.id} className="hover:bg-muted/50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span className="font-medium">{area.city}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground max-w-md truncate">
                      {area.description || '-'}
                    </td>
                    <td className="px-6 py-4 text-sm">{area.order}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          area.active
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {area.active ? 'Aktif' : 'Pasif'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/karakar/hizmet-bolgeleri/${area.slug}`}>
                          <Button variant="outline" size="sm">
                            Düzenle
                          </Button>
                        </Link>
                        <DeleteButton id={area.id} endpoint="/api/service-areas" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
