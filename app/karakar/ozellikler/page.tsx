import { prisma } from '@/lib/db'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import DeleteButton from '@/components/admin/delete-button'

async function getFeatures() {
  return await prisma.feature.findMany({
    orderBy: { order: 'asc' },
  })
}

export default async function FeaturesPage() {
  const features = await getFeatures()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Özellikler</h1>
          <p className="text-muted-foreground mt-2">
            Ana sayfada &quot;Neden Biz?&quot; bölümünde gösterilecek özellikleri yönetin
          </p>
        </div>
        <Link href="/karakar/ozellikler/yeni">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Yeni Özellik
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
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
              {features.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                    Henüz özellik eklenmemiş
                  </td>
                </tr>
              ) : (
                features.map((feature) => (
                  <tr key={feature.id} className="hover:bg-muted/30">
                    <td className="px-6 py-4 text-sm">{feature.order}</td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium">{feature.title}</p>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {feature.description}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">{feature.icon}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          feature.active
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {feature.active ? 'Aktif' : 'Pasif'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <Link href={`/karakar/ozellikler/${feature.id}`}>
                        <Button variant="outline" size="sm">
                          Düzenle
                        </Button>
                      </Link>
                      <DeleteButton id={feature.id} endpoint="features" />
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
