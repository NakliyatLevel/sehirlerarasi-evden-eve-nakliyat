import { prisma } from '@/lib/db'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Calendar } from 'lucide-react'
import { PageHeading } from '@/components/ui/page-heading'
import BlogSidebar from '@/components/blog/BlogSidebar'

async function getPost(slug: string) {
  const post = await prisma.post.findFirst({
    where: { slug, published: true },
  })

  if (!post) {
    notFound()
  }

  return post
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPost(slug)

  return (
    <div className="min-h-screen">
      <PageHeading
        title={post.title}
        description={post.excerpt || undefined}
        breadcrumbs={[
          { label: 'Blog', href: '/blog' },
          { label: post.title }
        ]}
      />

      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Ana İçerik */}
          <div className="lg:col-span-2">
            {post.image && (
              <div className="relative h-96 rounded-lg overflow-hidden mb-8">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            {post.publishedAt && (
              <div className="flex items-center gap-2 text-muted-foreground mb-8">
                <Calendar className="w-4 h-4" />
                {new Date(post.publishedAt).toLocaleDateString('tr-TR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
            )}

            <div className="prose prose-lg max-w-none">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <BlogSidebar />
          </div>
        </div>
      </div>
    </div>
  )
}
