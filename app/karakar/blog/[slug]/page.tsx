import { prisma } from '@/lib/db'
import { notFound } from 'next/navigation'
import BlogForm from '@/components/admin/blog-form'

async function getPost(slug: string) {
  const post = await prisma.post.findUnique({
    where: { slug },
  })

  if (!post) {
    notFound()
  }

  return post
}

export default async function EditBlogPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPost(slug)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">Blog Yazısını Düzenle</h1>
        <p className="text-muted-foreground mt-2">Blog yazısını güncelleyin</p>
      </div>

      <BlogForm post={post} />
    </div>
  )
}
