import Link from 'next/link'
import { prisma } from '@/lib/db'
import { Button } from '@/components/ui/button'
import { Plus, Edit, Trash2 } from 'lucide-react'
import DeletePostButton from '@/components/admin/delete-post-button'

async function getPosts() {
  return await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      title: true,
      slug: true,
      published: true,
      publishedAt: true,
      createdAt: true,
    },
  })
}

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Blog Yönetimi</h1>
          <p className="text-muted-foreground mt-2">Blog yazılarını yönetin</p>
        </div>
        <Link href="/karakar/blog/yeni">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Yeni Yazı
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium">Başlık</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Slug</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Durum</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Tarih</th>
              <th className="px-6 py-3 text-right text-sm font-medium">İşlemler</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {posts.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                  Henüz blog yazısı yok
                </td>
              </tr>
            ) : (
              posts.map((post) => (
                <tr key={post.id}>
                  <td className="px-6 py-4">{post.title}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{post.slug}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2 py-1 text-xs rounded-full ${
                        post.published
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {post.published ? 'Yayında' : 'Taslak'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {new Date(post.createdAt).toLocaleDateString('tr-TR')}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/karakar/blog/${post.slug}`}>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </Link>
                      <DeletePostButton postId={post.id} />
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
