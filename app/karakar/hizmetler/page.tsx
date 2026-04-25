import { prisma } from '@/lib/db'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import DeleteServiceButton from '@/components/admin/delete-service-button'

async function getServices() {
  return await prisma.service.findMany({
    orderBy: { order: 'asc' },
  })
}

export default async function ServicesPage() {
  const services = await getServices()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Hizmetler</h1>
          <p className="text-muted-foreground mt-2">
            Ana sayfada gösterilecek hizmetleri yönetin
          </p>
        </div>
        <Link href="/karakar/hizmetler/yeni">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Yeni Hizmet
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">Sıra</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Başlık</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">İkon</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Durum</th>
                <th className="px-6 py-3 text-right text-sm font-semibold">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {services.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                    Henüz hizmet eklenmemiş
                  </td>
                </tr>
              ) : (
                services.map((service) => (
                  <tr key={service.id} className="hover:bg-muted/30">
                    <td className="px-6 py-4 text-sm">{service.order}</td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium">{service.name}</p>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {service.description}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">{service.icon}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full w-fit ${
                            service.active
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {service.active ? 'Aktif' : 'Pasif'}
                        </span>
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full w-fit ${
                            service.showOnHomepage
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-orange-100 text-orange-800'
                          }`}
                        >
                          {service.showOnHomepage ? 'Ana Sayfada' : 'Ana Sayfa Gizli'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <Link href={`/karakar/hizmetler/${service.slug}`}>
                        <Button variant="outline" size="sm">
                          Düzenle
                        </Button>
                      </Link>
                      <DeleteServiceButton id={service.id} />
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
