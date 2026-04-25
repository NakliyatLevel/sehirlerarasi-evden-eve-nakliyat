import ReviewForm from '@/components/admin/review-form'

export default function NewReviewPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">Yeni Yorum</h1>
        <p className="text-muted-foreground mt-2">Yeni bir müşteri yorumu ekleyin</p>
      </div>

      <ReviewForm />
    </div>
  )
}
