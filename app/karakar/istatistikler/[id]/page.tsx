import { prisma } from '@/lib/db'
import { notFound } from 'next/navigation'
import StatisticForm from '@/components/admin/statistic-form'

async function getStatistic(id: string) {
  try {
    const statistic = await prisma.statistic.findUnique({
      where: { id },
    })
    return statistic
  } catch (error) {
    return null
  }
}

export default async function EditStatisticPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const statistic = await getStatistic(id)

  if (!statistic) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">İstatistik Düzenle</h1>
        <p className="text-muted-foreground mt-2">
          {statistic.title} istatistiğini düzenleyin
        </p>
      </div>

      <StatisticForm statistic={statistic} />
    </div>
  )
}
