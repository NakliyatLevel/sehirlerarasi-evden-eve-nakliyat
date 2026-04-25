import { prisma } from '@/lib/db'
import MediaGallery from '@/components/admin/media-gallery'

async function getMediaFiles() {
  try {
    const media = await prisma.media.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return media
  } catch (error) {
    return []
  }
}

export default async function MediaPage() {
  const files = await getMediaFiles()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">Medya Yönetimi</h1>
        <p className="text-muted-foreground mt-2">
          Resimleri yükleyin ve yönetin (SEO-friendly)
        </p>
      </div>

      <MediaGallery initialFiles={files} />
    </div>
  )
}
