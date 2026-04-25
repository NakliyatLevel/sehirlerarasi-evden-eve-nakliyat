import { prisma } from '@/lib/db'
import { LayoutDashboard, FileText, ImageIcon, MessageSquare, Star } from 'lucide-react'

async function getDashboardStats() {
  const [postsCount, galleryCount, reviewsCount, faqCount, avgRating] = await Promise.all([
    prisma.post.count(),
    prisma.gallery.count(),
    prisma.review.count({ where: { approved: true } }),
    prisma.fAQ.count(),
    prisma.review.aggregate({
      where: { approved: true },
      _avg: { rating: true },
    }),
  ])

  return {
    postsCount,
    galleryCount,
    reviewsCount,
    faqCount,
    avgRating: avgRating._avg.rating || 0,
  }
}

export default async function DashboardPage() {
  const stats = await getDashboardStats()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">Dashboard</h1>
        <p className="text-muted-foreground mt-2">Hoş geldiniz! İşte sitenizin genel durumu.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Blog Yazıları</p>
              <p className="text-3xl font-bold text-primary">{stats.postsCount}</p>
            </div>
            <FileText className="w-12 h-12 text-primary opacity-20" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Galeri Görselleri</p>
              <p className="text-3xl font-bold text-primary">{stats.galleryCount}</p>
            </div>
            <ImageIcon className="w-12 h-12 text-primary opacity-20" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Onaylı Yorumlar</p>
              <p className="text-3xl font-bold text-primary">{stats.reviewsCount}</p>
            </div>
            <MessageSquare className="w-12 h-12 text-primary opacity-20" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Ortalama Puan</p>
              <p className="text-3xl font-bold text-primary">{stats.avgRating.toFixed(1)}</p>
            </div>
            <Star className="w-12 h-12 text-primary opacity-20" />
          </div>
        </div>
      </div>
    </div>
  )
}
