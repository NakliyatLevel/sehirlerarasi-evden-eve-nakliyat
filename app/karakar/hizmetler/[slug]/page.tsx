import { prisma } from '@/lib/db'
import { notFound } from 'next/navigation'
import ServiceForm from '@/components/admin/service-form'

async function getService(slug: string) {
  const service = await prisma.service.findUnique({
    where: { slug },
  })

  if (!service) notFound()
  return service
}

export default async function EditServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = await getService(slug)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">Hizmet Düzenle</h1>
        <p className="text-muted-foreground mt-2">
          Hizmet bilgilerini güncelleyin
        </p>
      </div>

      <ServiceForm service={service} />
    </div>
  )
}
