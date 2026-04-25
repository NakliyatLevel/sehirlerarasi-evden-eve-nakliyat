import ServiceAreaForm from '@/components/admin/service-area-form'

export default function NewServiceAreaPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">Yeni Hizmet Bölgesi</h1>
        <p className="text-muted-foreground mt-2">
          Yeni bir hizmet bölgesi ekleyin
        </p>
      </div>

      <ServiceAreaForm />
    </div>
  )
}
