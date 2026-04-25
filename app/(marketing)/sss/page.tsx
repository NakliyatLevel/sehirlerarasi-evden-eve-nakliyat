import { prisma } from '@/lib/db'
import { getSiteSettings } from '@/lib/settings'
import { generateFAQSchema } from '@/lib/seo/schema'
import { ChevronDown } from 'lucide-react'
import { PageHeading } from '@/components/ui/page-heading'

async function getFAQs() {
  return await prisma.fAQ.findMany({
    where: { active: true },
    orderBy: { order: 'asc' },
  })
}

export default async function FAQPage() {
  const [faqs, settings] = await Promise.all([getFAQs(), getSiteSettings()])
  const faqSchema = faqs.length > 0 ? generateFAQSchema(faqs) : null

  return (
    <>
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <div className="min-h-screen">
        <PageHeading
          title="Sıkça Sorulan Sorular"
          description={settings.page_desc_sss || 'Nakliyat hizmetlerimiz hakkında merak ettiğiniz soruların cevapları'}
          breadcrumbs={[{ label: 'SSS' }]}
        />
        
        <div className="container mx-auto px-4 py-16 max-w-7xl">
          <div className="max-w-3xl mx-auto">
          
          {faqs.length === 0 ? (
            <p className="text-muted-foreground text-center py-12">Henüz SSS yok</p>
          ) : (
            <div className="space-y-4">
              {faqs.map((faq) => (
                <details key={faq.id} className="bg-white rounded-lg border border-gray-200 p-6 group">
                  <summary className="flex items-center justify-between cursor-pointer font-semibold text-lg">
                    <span>{faq.question}</span>
                    <ChevronDown className="w-5 h-5 text-muted-foreground group-open:rotate-180 transition" />
                  </summary>
                  <div className="mt-4 text-muted-foreground">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  )
}
