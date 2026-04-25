import PartnerForm from '@/components/admin/partner-form'

export default function NewPartnerPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">Yeni Referans</h1>
        <p className="text-muted-foreground mt-2">
          Yeni bir referans ekleyin
        </p>
      </div>

      <PartnerForm />
    </div>
  )
}
