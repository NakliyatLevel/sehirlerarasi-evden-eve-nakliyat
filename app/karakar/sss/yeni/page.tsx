import FAQForm from '@/components/admin/faq-form'

export default function NewFAQPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">Yeni SSS</h1>
        <p className="text-muted-foreground mt-2">Yeni bir soru ekleyin</p>
      </div>

      <FAQForm />
    </div>
  )
}
