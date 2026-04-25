import Link from 'next/link'
import { prisma } from '@/lib/db'
import { Button } from '@/components/ui/button'
import { Plus, Edit, Trash2, Check, X } from 'lucide-react'
import DeleteReviewButton from '@/components/admin/delete-review-button'
import ApproveReviewButton from '@/components/admin/approve-review-button'

async function getReviews() {
  return await prisma.review.findMany({
    orderBy: { createdAt: 'desc' },
  })
}

export default async function ReviewsPage() {
  const reviews = await getReviews()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Yorum Yönetimi</h1>
          <p className="text-muted-foreground mt-2">Müşteri yorumlarını yönetin</p>
        </div>
        <Link href="/karakar/yorumlar/yeni">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Yeni Yorum
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium">İsim</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Yorum</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Puan</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Durum</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Tarih</th>
              <th className="px-6 py-3 text-right text-sm font-medium">İşlemler</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {reviews.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">
                  Henüz yorum yok
                </td>
              </tr>
            ) : (
              reviews.map((review) => (
                <tr key={review.id}>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium">{review.name}</p>
                      {review.location && (
                        <p className="text-sm text-muted-foreground">{review.location}</p>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm line-clamp-2">{review.comment}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">★</span>
                      <span className="font-medium">{review.rating}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2 py-1 text-xs rounded-full ${
                        review.approved
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {review.approved ? 'Onaylı' : 'Bekliyor'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {new Date(review.createdAt).toLocaleDateString('tr-TR')}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <ApproveReviewButton reviewId={review.id} approved={review.approved} />
                      <Link href={`/karakar/yorumlar/${review.id}`}>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </Link>
                      <DeleteReviewButton reviewId={review.id} />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
