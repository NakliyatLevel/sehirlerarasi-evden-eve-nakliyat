import Link from 'next/link'
import { prisma } from '@/lib/db'
import { Button } from '@/components/ui/button'
import { Plus, Edit, Trash2 } from 'lucide-react'

async function getCountries() {
  return await prisma.country.findMany({
    orderBy: { order: 'asc' },
  })
}

async function deleteCountry(formData: FormData) {
  'use server'
  const id = formData.get('id') as string
  await prisma.country.delete({ where: { id } })
}

export default async function CountriesPage() {
  const countries = await getCountries()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Ülke Yönetimi</h1>
          <p className="text-muted-foreground mt-2">Uluslararası nakliyat için ülke ayarları</p>
        </div>
        <Link href="/karakar/ulkeler/yeni">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Yeni Ülke
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium">Kod</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Ülke</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Temel Fiyat</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Km Başı</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Durum</th>
              <th className="px-6 py-3 text-right text-sm font-medium">İşlemler</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {countries.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">
                  Henüz ülke yok
                </td>
              </tr>
            ) : (
              countries.map((country) => (
                <tr key={country.id}>
                  <td className="px-6 py-4 font-mono text-sm">{country.code}</td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium">{country.nameTr}</p>
                      <p className="text-sm text-muted-foreground">{country.name}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">€{country.basePrice}</td>
                  <td className="px-6 py-4">€{country.pricePerKm}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2 py-1 text-xs rounded-full ${
                        country.active
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {country.active ? 'Aktif' : 'Pasif'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/karakar/ulkeler/${country.id}`}>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </Link>
                      <form action={deleteCountry}>
                        <input type="hidden" name="id" value={country.id} />
                        <Button
                          type="submit"
                          variant="outline"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </form>
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
