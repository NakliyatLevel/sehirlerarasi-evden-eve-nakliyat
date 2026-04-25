import { prisma } from '@/lib/db'
import { notFound } from 'next/navigation'
import FeatureForm from '@/components/admin/feature-form'

async function getFeature(id: string) {
  const feature = await prisma.feature.findUnique({
    where: { id },
  })

  if (!feature) notFound()
  return feature
}

export default async function EditFeaturePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const feature = await getFeature(id)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">Özellik Düzenle</h1>
        <p className="text-muted-foreground mt-2">
          Özellik bilgilerini güncelleyin
        </p>
      </div>

      <FeatureForm feature={feature} />
    </div>
  )
}
