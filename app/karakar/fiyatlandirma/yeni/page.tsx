import { redirect } from 'next/navigation'
import { prisma } from '@/lib/db'

async function createPricing(formData: FormData) {
  'use server'
  const valueStr = formData.get('value') as string
  let value
  try {
    value = JSON.parse(valueStr)
  } catch {
    value = valueStr
  }

  await prisma.pricingSetting.create({
    data: {
      type: formData.get('type') as string,
      key: formData.get('key') as string,
      value: value,
    },
  })
  redirect('/karakar/fiyatlandirma')
}

export default function NewPricingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">Yeni Fiyatlandırma Ayarı</h1>
        <p className="text-muted-foreground mt-2">Yeni bir fiyatlandırma ayarı ekleyin</p>
      </div>

      <form action={createPricing} className="bg-white rounded-lg shadow p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Tip *</label>
            <select name="type" required className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="lokal">Lokal</option>
              <option value="international">Uluslararası</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Anahtar *</label>
            <input type="text" name="key" required className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary" placeholder="base_price" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Değer (JSON veya metin) *</label>
            <textarea name="value" required rows={5} className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary" placeholder='{"min": 100, "max": 500}' />
            <p className="text-xs text-muted-foreground mt-1">JSON formatında veya düz metin olarak girebilirsiniz</p>
          </div>
        </div>
        <button type="submit" className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">Kaydet</button>
      </form>
    </div>
  )
}
