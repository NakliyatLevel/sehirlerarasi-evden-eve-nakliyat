import Link from 'next/link'
import { prisma } from '@/lib/db'
import { Button } from '@/components/ui/button'
import { Plus, Edit, Trash2, ExternalLink } from 'lucide-react'
import DeleteSolutionButton from '@/components/admin/delete-solution-button'

async function getSolutions() {
  return await prisma.solution.findMany({ orderBy: { order: 'asc' } })
}

export default async function SolutionsPage() {
  const solutions = await getSolutions()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Çözümler</h1>
          <p className="text-muted-foreground mt-2">Çözüm sayfalarını yönetin</p>
        </div>
        <Link href="/karakar/cozumler/yeni">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Yeni Çözüm
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {solutions.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">Henüz çözüm eklenmemiş</div>
        ) : (
          <table className="w-full">
            <thead className="bg-muted/50 border-b">
              <tr>
                <th className="text-left p-4 font-medium">Başlık</th>
                <th className="text-left p-4 font-medium">Slug</th>
                <th className="text-left p-4 font-medium">Sıra</th>
                <th className="text-left p-4 font-medium">Durum</th>
                <th className="text-right p-4 font-medium">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {solutions.map((s) => (
                <tr key={s.id} className="border-b last:border-0 hover:bg-muted/20 transition">
                  <td className="p-4 font-medium">{s.title}</td>
                  <td className="p-4 text-muted-foreground text-sm">/cozum/{s.slug}</td>
                  <td className="p-4 text-muted-foreground">{s.order}</td>
                  <td className="p-4">
                    <span className={`inline-flex px-2 py-1 text-xs rounded-full ${s.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {s.active ? 'Aktif' : 'Pasif'}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <a href={`/cozum/${s.slug}`} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="sm" title="Önizle">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </a>
                      <Link href={`/karakar/cozumler/${s.id}`}>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </Link>
                      <DeleteSolutionButton solutionId={s.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
