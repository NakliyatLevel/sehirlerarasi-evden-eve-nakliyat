import { prisma } from '@/lib/db'
import { notFound } from 'next/navigation'
import PageForm from '@/components/admin/page-form'

async function getPage(id: string) {
  const page = await prisma.page.findUnique({ where: { id } })
  if (!page) notFound()
  return page
}

export default async function EditPagePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const page = await getPage(id)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">Sayfayı Düzenle</h1>
        <p className="text-muted-foreground mt-2">Sayfa içeriğini güncelleyin</p>
      </div>

      <PageForm page={page} />
    </div>
  )
}
