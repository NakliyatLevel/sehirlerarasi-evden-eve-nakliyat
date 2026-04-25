import { prisma } from '@/lib/db'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Plus, Building2 } from 'lucide-react'
import DeleteButton from '@/components/admin/delete-button'
import Image from 'next/image'

async function getPartners() {
  try {
    const partners = await prisma.partner.findMany({
      orderBy: { order: 'asc' },
    })
    return partners
  } catch (error) {
    return []
  }
}

export default async function AdminPartnersPage() {
  const partners = await getPartners()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Referanslar</h1>
          <p className="text-muted-foreground mt-2">
            Çalıştığınız kurumları ve referansları yönetin
          </p>
        </div>
        <Link href="/karakar/referanslar/yeni">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Yeni Referans Ekle
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow">
        {partners.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground">
            Henüz referans eklenmemiş
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium">Logo</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Firma Adı</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Website</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Sıra</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Durum</th>
                  <th className="px-6 py-3 text-right text-sm font-medium">İşlemler</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {partners.map((partner) => (
                  <tr key={partner.id} className="hover:bg-muted/50">
                    <td className="px-6 py-4">
                      <div className="w-16 h-16 relative bg-gray-50 rounded-lg overflow-hidden">
                        {partner.logo ? (
                          <Image
                            src={partner.logo}
                            alt={partner.name}
                            fill
                            className="object-contain p-2"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Building2 className="w-6 h-6 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium">{partner.name}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {partner.website ? (
                        <a
                          href={partner.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          {partner.website.replace(/^https?:\/\//, '')}
                        </a>
                      ) : (
                        '-'
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm">{partner.order}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          partner.active
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {partner.active ? 'Aktif' : 'Pasif'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/karakar/referanslar/${partner.id}`}>
                          <Button variant="outline" size="sm">
                            Düzenle
                          </Button>
                        </Link>
                        <DeleteButton id={partner.id} endpoint="/api/partners" />
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
