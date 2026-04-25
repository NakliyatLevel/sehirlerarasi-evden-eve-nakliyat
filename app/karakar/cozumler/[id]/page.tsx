import { prisma } from '@/lib/db'
import { notFound } from 'next/navigation'
import SolutionForm from '@/components/admin/solution-form'

async function getSolution(id: string) {
  try {
    return await prisma.solution.findUnique({ where: { id } })
  } catch {
    return null
  }
}

export default async function EditSolutionPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const solution = await getSolution(id)

  if (!solution) notFound()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">Çözüm Düzenle</h1>
        <p className="text-muted-foreground mt-2">{solution.title}</p>
      </div>
      <SolutionForm solution={solution} />
    </div>
  )
}
