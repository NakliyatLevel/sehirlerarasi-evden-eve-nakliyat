import { prisma } from '@/lib/db'
import { notFound } from 'next/navigation'
import ProcessForm from '@/components/admin/process-form'

async function getProcess(id: string) {
  try {
    const process = await prisma.process.findUnique({
      where: { id },
    })
    return process
  } catch (error) {
    return null
  }
}

export default async function EditProcessPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const process = await getProcess(id)

  if (!process) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">Süreç Adımı Düzenle</h1>
        <p className="text-muted-foreground mt-2">
          {process.title} adımını düzenleyin
        </p>
      </div>

      <ProcessForm process={process} />
    </div>
  )
}
