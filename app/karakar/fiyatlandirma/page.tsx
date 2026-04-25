import Link from 'next/link'
import { prisma } from '@/lib/db'
import { Button } from '@/components/ui/button'
import { Plus, Edit, Trash2 } from 'lucide-react'

async function getPricingSettings() {
  return await prisma.pricingSetting.findMany({
    orderBy: { type: 'asc' },
  })
}

async function deletePricing(formData: FormData) {
  'use server'
  const id = formData.get('id') as string
  await prisma.pricingSetting.delete({ where: { id } })
}

export default async function PricingPage() {
  const settings = await getPricingSettings()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Fiyatlandırma Yönetimi</h1>
          <p className="text-muted-foreground mt-2">Lokal ve uluslararası fiyatlandırma ayarları</p>
        </div>
        <Link href="/karakar/fiyatlandirma/yeni">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Yeni Ayar
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium">Tip</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Anahtar</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Değer</th>
              <th className="px-6 py-3 text-right text-sm font-medium">İşlemler</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {settings.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">
                  Henüz fiyatlandırma ayarı yok
                </td>
              </tr>
            ) : (
              settings.map((setting) => (
                <tr key={setting.id}>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                      setting.type === 'lokal' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-purple-100 text-purple-800'
                    }`}>
                      {setting.type === 'lokal' ? 'Lokal' : 'Uluslararası'}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium">{setting.key}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {typeof setting.value === 'object' 
                      ? JSON.stringify(setting.value).substring(0, 50) + '...'
                      : setting.value}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/karakar/fiyatlandirma/${setting.id}`}>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </Link>
                      <form action={deletePricing}>
                        <input type="hidden" name="id" value={setting.id} />
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
