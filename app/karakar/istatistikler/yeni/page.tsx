import StatisticForm from '@/components/admin/statistic-form'

export default function NewStatisticPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">Yeni İstatistik</h1>
        <p className="text-muted-foreground mt-2">Yeni istatistik ekleyin</p>
      </div>

      <StatisticForm />
    </div>
  )
}
