import { prisma } from '@/lib/db'
import { notFound } from 'next/navigation'
import GalleryForm from '@/components/admin/gallery-form'

async function getGalleryItem(id: string) {
  const item = await prisma.gallery.findUnique({
    where: { id },
  })

  if (!item) {
    notFound()
  }

  return item
}

export default async function EditGalleryPage({ params }: { params: { id: string } }) {
  const item = await getGalleryItem(params.id)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">Galeri Görselini Düzenle</h1>
        <p className="text-muted-foreground mt-2">Galeri görselini güncelleyin</p>
      </div>

      <GalleryForm item={item} />
    </div>
  )
}
