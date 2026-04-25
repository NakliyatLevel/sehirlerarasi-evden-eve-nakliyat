import ServiceForm from '@/components/admin/service-form'

export default function NewServicePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">Yeni Hizmet</h1>
        <p className="text-muted-foreground mt-2">
          Ana sayfada gösterilecek yeni bir hizmet ekleyin
        </p>
      </div>

      <ServiceForm />
    </div>
  )
}
