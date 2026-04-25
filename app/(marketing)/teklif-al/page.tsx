import { getSiteSettings } from '@/lib/settings'
import { Metadata } from 'next'
import { PageHeading } from '@/components/ui/page-heading'
import QuoteForm from '@/components/forms/QuoteForm'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  
  return {
    title: `Ücretsiz Teklif Al | ${settings.site_title}`,
    description: 'Profesyonel nakliyat hizmetlerimiz için ücretsiz ve yükümlülüksüz teklif alın.',
  }
}

export default async function TeklifAlPage() {
  const settings = await getSiteSettings()

  return (
    <div className="min-h-screen bg-gradient-to-b from-muted/30 to-white">
      <PageHeading
        title="Ücretsiz Teklif Al"
        description={settings.page_desc_teklif_al || 'Profesyonel nakliyat hizmetlerimiz için detaylı ve ücretsiz teklif alın'}
        breadcrumbs={[{ label: 'Teklif Al' }]}
      />

      <div className="container mx-auto px-4 py-16 max-w-5xl">
        <QuoteForm />
      </div>
    </div>
  )
}
