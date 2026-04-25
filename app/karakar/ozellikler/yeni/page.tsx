import FeatureForm from '@/components/admin/feature-form'

export default function NewFeaturePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">Yeni Özellik</h1>
        <p className="text-muted-foreground mt-2">
          Ana sayfada gösterilecek yeni bir özellik ekleyin
        </p>
      </div>

      <FeatureForm />
    </div>
  )
}
