import GalleryForm from '@/components/admin/gallery-form'

export default function NewGalleryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">Yeni Galeri Görseli</h1>
        <p className="text-muted-foreground mt-2">Yeni bir galeri görseli ekleyin</p>
      </div>

      <GalleryForm />
    </div>
  )
}
