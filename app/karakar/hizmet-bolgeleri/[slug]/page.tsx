import { prisma } from '@/lib/db'
import { notFound } from 'next/navigation'
import ServiceAreaForm from '@/components/admin/service-area-form'

async function getServiceArea(slug: string) {
  try {
    const area = await prisma.serviceArea.findUnique({
      where: { slug },
    })
    return area
  } catch (error) {
    return null
  }
}

export default async function EditServiceAreaPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const area = await getServiceArea(slug)

  if (!area) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">Hizmet Bölgesi Düzenle</h1>
        <p className="text-muted-foreground mt-2">
          {area.city} bölgesini düzenleyin
        </p>
      </div>

      <ServiceAreaForm area={area} />
    </div>
  )
}
