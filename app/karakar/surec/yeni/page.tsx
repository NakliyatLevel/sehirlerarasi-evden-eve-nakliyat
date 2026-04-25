import ProcessForm from '@/components/admin/process-form'

export default function NewProcessPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">Yeni Süreç Adımı</h1>
        <p className="text-muted-foreground mt-2">Yeni süreç adımı ekleyin</p>
      </div>

      <ProcessForm />
    </div>
  )
}
