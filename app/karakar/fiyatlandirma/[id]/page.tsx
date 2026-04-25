import { prisma } from '@/lib/db'
import { redirect, notFound } from 'next/navigation'

async function getPricing(id: string) {
  const pricing = await prisma.pricingSetting.findUnique({ where: { id } })
  if (!pricing) notFound()
  return pricing
}

async function updatePricing(formData: FormData) {
  'use server'
  const id = formData.get('id') as string
  const valueStr = formData.get('value') as string
  let value
  try {
    value = JSON.parse(valueStr)
  } catch {
    value = valueStr
  }

  await prisma.pricingSetting.update({
    where: { id },
    data: {
      type: formData.get('type') as string,
      key: formData.get('key') as string,
      value: value,
    },
  })
  redirect('/karakar/fiyatlandirma')
}

export default async function EditPricingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const pricing = await getPricing(id)
  const valueStr = typeof pricing.value === 'object' 
    ? JSON.stringify(pricing.value, null, 2) 
    : String(pricing.value)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">Fiyatlandırma Ayarını Düzenle</h1>
        <p className="text-muted-foreground mt-2">Fiyatlandırma ayarını güncelleyin</p>
      </div>

      <form action={updatePricing} className="bg-white rounded-lg shadow p-6 space-y-6">
        <input type="hidden" name="id" value={pricing.id} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Tip *</label>
            <select name="type" required defaultValue={pricing.type} className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="lokal">Lokal</option>
              <option value="international">Uluslararası</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Anahtar *</label>
            <input type="text" name="key" required defaultValue={pricing.key} className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Değer (JSON veya metin) *</label>
            <textarea name="value" required rows={8} defaultValue={valueStr} className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
        </div>
        <button type="submit" className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">Kaydet</button>
      </form>
    </div>
  )
}
