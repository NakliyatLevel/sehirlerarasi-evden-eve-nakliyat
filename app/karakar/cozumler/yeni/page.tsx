import SolutionForm from '@/components/admin/solution-form'

export default function NewSolutionPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">Yeni Çözüm</h1>
        <p className="text-muted-foreground mt-2">Yeni bir çözüm sayfası oluşturun</p>
      </div>
      <SolutionForm />
    </div>
  )
}
