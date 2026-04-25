import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '@/lib/db'
import { Button } from '@/components/ui/button'
import { Plus, Edit, Trash2 } from 'lucide-react'
import DeleteGalleryButton from '@/components/admin/delete-gallery-button'

async function getGalleryItems() {
  return await prisma.gallery.findMany({
    orderBy: { order: 'asc' },
  })
}

const categories = [
  { value: 'all', label: 'Tümü' },
  { value: 'vehicles', label: 'Araçlarımız' },
  { value: 'packaging', label: 'Paketleme' },
  { value: 'other', label: 'Diğer' },
]

export default async function GalleryPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const allItems = await getGalleryItems()
  const { category } = await searchParams
  const selectedCategory = category || 'all'
  
  const items = selectedCategory === 'all' 
    ? allItems 
    : allItems.filter(item => item.category === selectedCategory)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Galeri Yönetimi</h1>
          <p className="text-muted-foreground mt-2">Galeri görsellerini yönetin</p>
        </div>
        <Link href="/karakar/galeri/yeni">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Yeni Görsel
          </Button>
        </Link>
      </div>

      {/* Kategori Filtreleme */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Kategori:</span>
          {categories.map((cat) => (
            <Link
              key={cat.value}
              href={`/karakar/galeri${cat.value !== 'all' ? `?category=${cat.value}` : ''}`}
              className={`px-4 py-2 rounded-lg text-sm transition ${
                selectedCategory === cat.value
                  ? 'bg-primary text-white'
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              {cat.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.length === 0 ? (
          <div className="col-span-full bg-white rounded-lg shadow p-8 text-center text-muted-foreground">
            Henüz galeri görseli yok
          </div>
        ) : (
          items.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="relative h-48">
                <Image
                  src={item.image || '/placeholder-logo.svg'}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  {item.description && (
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {item.description}
                    </p>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex px-2 py-1 text-xs rounded-full ${
                        item.active
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {item.active ? 'Aktif' : 'Pasif'}
                    </span>
                    {item.category && (
                      <span className="text-xs text-muted-foreground">
                        {item.category}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Link href={`/karakar/galeri/${item.id}`}>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </Link>
                    <DeleteGalleryButton itemId={item.id} />
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
