import { prisma } from '@/lib/db'
import { getSiteSettings } from '@/lib/settings'
import { notFound } from 'next/navigation'
import { PageHeading } from '@/components/ui/page-heading'
import { CheckCircle, Phone, Mail, Clock, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

async function getSolution(slug: string) {
  try {
    return await prisma.solution.findFirst({
      where: { slug, active: true },
    })
  } catch {
    return null
  }
}

async function getOtherSolutions(currentSlug: string) {
  try {
    return await prisma.solution.findMany({
      where: { active: true, NOT: { slug: currentSlug } },
      orderBy: { order: 'asc' },
      select: { slug: true, title: true },
    })
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const solution = await getSolution(slug)
  if (!solution) return { title: 'Çözüm Bulunamadı' }
  return {
    title: solution.metaTitle || solution.title,
    description: solution.metaDescription || solution.description || '',
  }
}

export default async function SolutionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const [solution, settings, otherSolutions] = await Promise.all([
    getSolution(slug),
    getSiteSettings(),
    getOtherSolutions(slug),
  ])

  if (!solution) notFound()

  const defaultBenefits = [
    'Profesyonel ve deneyimli ekip',
    'Sigortalı taşımacılık hizmeti',
    'Modern araç filosu',
    'Uygun fiyat garantisi',
    '7/24 müşteri desteği',
    'Zamanında teslimat',
  ]

  return (
    <>
      <PageHeading
        title={solution.title}
        description={solution.description || ''}
        breadcrumbs={[
          { label: 'Çözümlerimiz', href: '/' },
          { label: solution.title },
        ]}
      />

      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Ana İçerik */}
          <div className="lg:col-span-2 space-y-8">
            {solution.image && (
              <div className="relative h-80 rounded-2xl overflow-hidden">
                <Image
                  src={solution.image}
                  alt={solution.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              {solution.content ? (
                <div
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: solution.content }}
                />
              ) : (
                <div className="prose max-w-none">
                  <h3>{solution.title} Hakkında</h3>
                  <p>{solution.description}</p>
                </div>
              )}
            </div>

            {/* Avantajlar */}
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6">Neden Bizi Tercih Etmelisiniz?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {defaultBenefits.map((benefit, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* İletişim Kartı */}
            <div className="bg-primary text-white rounded-2xl p-6 sticky top-6">
              <h3 className="text-xl font-bold mb-4">Hızlı İletişim</h3>
              <p className="text-primary-foreground/90 mb-6 text-sm">
                {solution.title} hizmeti için hemen teklif alın
              </p>
              <div className="space-y-3">
                {settings.phone && (
                  <a
                    href={`tel:${settings.phone}`}
                    className="flex items-center gap-3 p-3 bg-white/10 rounded-lg hover:bg-white/20 transition"
                  >
                    <Phone className="w-5 h-5" />
                    <div>
                      <div className="text-xs text-primary-foreground/70">Telefon</div>
                      <div className="font-medium">{settings.phone}</div>
                    </div>
                  </a>
                )}
                {settings.email && (
                  <a
                    href={`mailto:${settings.email}`}
                    className="flex items-center gap-3 p-3 bg-white/10 rounded-lg hover:bg-white/20 transition"
                  >
                    <Mail className="w-5 h-5" />
                    <div>
                      <div className="text-xs text-primary-foreground/70">E-posta</div>
                      <div className="font-medium text-sm">{settings.email}</div>
                    </div>
                  </a>
                )}
                <div className="flex items-center gap-3 p-3 bg-white/10 rounded-lg">
                  <Clock className="w-5 h-5" />
                  <div>
                    <div className="text-xs text-primary-foreground/70">Çalışma Saatleri</div>
                    <div className="font-medium">7/24 Hizmet</div>
                  </div>
                </div>
              </div>
              <Link
                href="/teklif-al"
                className="block w-full mt-6 bg-white text-primary text-center py-3 rounded-lg font-semibold hover:bg-white/90 transition"
              >
                Ücretsiz Teklif Al
              </Link>
            </div>

            {/* Diğer Çözümler */}
            {otherSolutions.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h3 className="text-lg font-bold mb-4">Diğer Çözümlerimiz</h3>
                <ul className="space-y-2">
                  {otherSolutions.map((s: { slug: string; title: string }) => (
                    <li key={s.slug}>
                      <Link
                        href={`/cozum/${s.slug}`}
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition"
                      >
                        <ArrowRight className="w-3.5 h-3.5 flex-shrink-0" />
                        {s.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
