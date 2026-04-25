import BlogForm from '@/components/admin/blog-form'

export default function NewBlogPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">Yeni Blog Yazısı</h1>
        <p className="text-muted-foreground mt-2">Yeni bir blog yazısı oluşturun</p>
      </div>

      <BlogForm />
    </div>
  )
}
