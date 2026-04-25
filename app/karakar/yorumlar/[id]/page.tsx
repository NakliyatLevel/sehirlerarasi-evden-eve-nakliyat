import { prisma } from '@/lib/db'
import { notFound } from 'next/navigation'
import ReviewForm from '@/components/admin/review-form'

async function getReview(id: string) {
  const review = await prisma.review.findUnique({
    where: { id },
  })

  if (!review) {
    notFound()
  }

  return review
}

export default async function EditReviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const review = await getReview(id)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">Yorumu Düzenle</h1>
        <p className="text-muted-foreground mt-2">Müşteri yorumunu güncelleyin</p>
      </div>

      <ReviewForm review={review} />
    </div>
  )
}
