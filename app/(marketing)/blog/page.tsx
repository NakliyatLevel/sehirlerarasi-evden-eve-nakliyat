import { prisma } from '@/lib/db'
import { getSiteSettings } from '@/lib/settings'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar } from 'lucide-react'
import { PageHeading } from '@/components/ui/page-heading'

export const metadata = {
  title: 'Blog',
  description: 'Nakliyat, taşınma ipucları ve sektör haberleri hakkında yazılar.',
}

async function getPosts() {
  return await prisma.post.findMany({
    where: { published: true },
    orderBy: { publishedAt: 'desc' },
    select: {
      id: true,
      slug: true,
      title: true,
      excerpt: true,
      image: true,
      publishedAt: true,
    },
  })
}

export default async function BlogPage() {
  const [posts, settings] = await Promise.all([getPosts(), getSiteSettings()])

  return (
    <div className="min-h-screen">
      <PageHeading
        title="Blog"
        description={settings.page_desc_blog || 'Nakliyat ve taşımacılık hakkında faydalı bilgiler, ipuçları ve haberler'}
        breadcrumbs={[{ label: 'Blog' }]}
      />
      
      <div className="container mx-auto px-4 py-16 max-w-7xl">
          
          {posts.length === 0 ? (
            <p className="text-muted-foreground text-center py-12">Henüz blog yazısı yok</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:border-primary/50 transition"
                >
                  {post.image && (
                    <div className="relative h-48">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h2 className="text-xl font-semibold mb-2 hover:text-primary transition">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                    )}
                    {post.publishedAt && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.publishedAt).toLocaleDateString('tr-TR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
      </div>
    </div>
  )
}
