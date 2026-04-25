import { prisma } from '@/lib/db'
import { notFound } from 'next/navigation'
import PartnerForm from '@/components/admin/partner-form'

async function getPartner(id: string) {
  try {
    const partner = await prisma.partner.findUnique({
      where: { id },
    })
    return partner
  } catch (error) {
    return null
  }
}

export default async function EditPartnerPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const partner = await getPartner(id)

  if (!partner) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">Referans Düzenle</h1>
        <p className="text-muted-foreground mt-2">
          {partner.name} referansını düzenleyin
        </p>
      </div>

      <PartnerForm partner={partner} />
    </div>
  )
}
