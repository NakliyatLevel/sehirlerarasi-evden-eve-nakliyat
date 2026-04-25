import { prisma } from '@/lib/db'
import { redirect, notFound } from 'next/navigation'

async function getCountry(id: string) {
  const country = await prisma.country.findUnique({ where: { id } })
  if (!country) notFound()
  return country
}

async function updateCountry(formData: FormData) {
  'use server'
  const id = formData.get('id') as string
  await prisma.country.update({
    where: { id },
    data: {
      code: formData.get('code') as string,
      name: formData.get('name') as string,
      nameTr: formData.get('nameTr') as string,
      basePrice: parseFloat(formData.get('basePrice') as string) || 0,
      pricePerKm: parseFloat(formData.get('pricePerKm') as string) || 0,
      customsFee: parseFloat(formData.get('customsFee') as string) || 0,
      insuranceRate: parseFloat(formData.get('insuranceRate') as string) || 0,
      active: formData.get('active') === 'on',
      order: parseInt(formData.get('order') as string) || 0,
    },
  })
  redirect('/karakar/ulkeler')
}

export default async function EditCountryPage({ params }: { params: { id: string } }) {
  const country = await getCountry(params.id)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">Ülkeyi Düzenle</h1>
        <p className="text-muted-foreground mt-2">Ülke bilgilerini güncelleyin</p>
      </div>

      <form action={updateCountry} className="bg-white rounded-lg shadow p-6 space-y-6">
        <input type="hidden" name="id" value={country.id} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Ülke Kodu (ISO) *</label>
            <input type="text" name="code" required maxLength={2} defaultValue={country.code} className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Ülke Adı (İngilizce) *</label>
            <input type="text" name="name" required defaultValue={country.name} className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Ülke Adı (Türkçe) *</label>
            <input type="text" name="nameTr" required defaultValue={country.nameTr} className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Temel Fiyat (€)</label>
            <input type="number" name="basePrice" step="0.01" defaultValue={country.basePrice} className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Km Başı Fiyat (€)</label>
            <input type="number" name="pricePerKm" step="0.01" defaultValue={country.pricePerKm} className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Gümrük Ücreti (€)</label>
            <input type="number" name="customsFee" step="0.01" defaultValue={country.customsFee} className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Sigorta Oranı (%)</label>
            <input type="number" name="insuranceRate" step="0.01" defaultValue={country.insuranceRate} className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Sıra</label>
            <input type="number" name="order" defaultValue={country.order} className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div>
            <label className="flex items-center gap-2 mt-8">
              <input type="checkbox" name="active" defaultChecked={country.active} className="w-4 h-4" />
              <span className="text-sm font-medium">Aktif</span>
            </label>
          </div>
        </div>
        <button type="submit" className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">Kaydet</button>
      </form>
    </div>
  )
}
