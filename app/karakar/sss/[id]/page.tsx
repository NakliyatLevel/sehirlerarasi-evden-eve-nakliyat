import { prisma } from '@/lib/db'
import { notFound } from 'next/navigation'
import FAQForm from '@/components/admin/faq-form'

async function getFAQ(id: string) {
  const faq = await prisma.fAQ.findUnique({ where: { id } })
  if (!faq) notFound()
  return faq
}

export default async function EditFAQPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const faq = await getFAQ(id)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">SSS Düzenle</h1>
        <p className="text-muted-foreground mt-2">Soruyu güncelleyin</p>
      </div>

      <FAQForm faq={faq} />
    </div>
  )
}
