import { getSiteSettings } from '@/lib/settings'
import { Metadata } from 'next'
import { PageHeading } from '@/components/ui/page-heading'
import { Users, Award, Shield, Clock } from 'lucide-react'

const STAT_ICONS = [Users, Award, Shield, Clock]

const NEDEN_ICONS = [Shield, Users, Clock]

const HAKKIMIZDA_DEFAULTS = {
  pageDesc:
    'Yılların deneyimi ile güvenilir ve profesyonel nakliyat hizmetleri sunuyoruz.',
  bizKimiz1:
    'Firmamız, evden eve nakliyat sektöründe 15 yılı aşkın deneyimi ile müşterilerine en kaliteli hizmeti sunmayı ilke edinmiş bir firmadır.',
  bizKimiz2:
    "Profesyonel ekibimiz ve modern araç filomuz ile Türkiye'nin her yerine güvenli, hızlı ve ekonomik nakliyat hizmetleri sağlıyoruz.",
  bizKimiz3:
    'Müşteri memnuniyetini ön planda tutarak, eşyalarınızın güvenliğini %100 garanti altına alıyoruz. Sigortalı taşımacılık hizmetimiz ile taşıma sürecinde oluşabilecek her türlü riskin karşılığını veriyoruz.',
  misyon:
    'Müşterilerimize en kaliteli, güvenilir ve ekonomik nakliyat hizmetlerini sunarak, taşınma sürecini stressiz ve sorunsuz bir deneyime dönüştürmek. Profesyonel ekibimiz ve modern teknolojimiz ile sektörde standartları belirlemek.',
  vizyon:
    "Türkiye'nin en güvenilir ve tercih edilen nakliyat firması olmak. Sürekli gelişen hizmet kalitemiz ve müşteri memnuniyeti odaklı yaklaşımımız ile sektörde lider konuma ulaşmak.",
  stat1Value: '10,000+',
  stat1Label: 'Mutlu Müşteri',
  stat2Value: '15+',
  stat2Label: 'Yıl Tecrübe',
  stat3Value: '%100',
  stat3Label: 'Sigortalı',
  stat4Value: '7/24',
  stat4Label: 'Hizmet',
  neden1Title: 'Güvenli Taşıma',
  neden1Desc:
    'Tüm eşyalarınız sigorta güvencesi altında taşınır. Profesyonel paketleme ve taşıma teknikleri kullanırız.',
  neden2Title: 'Deneyimli Ekip',
  neden2Desc: '15 yılı aşkın sektör deneyimi olan profesyonel ekibimiz ile hizmetinizdeyiz.',
  neden3Title: '7/24 Destek',
  neden3Desc: 'Haftanın her günü, günün her saati müşteri hizmetlerimize ulaşabilirsiniz.',
}

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()

  return {
    title: `Hakkımızda | ${settings.site_title}`,
    description: 'Profesyonel nakliyat hizmetleri sunan firmamız hakkında bilgi edinin.',
  }
}

export default async function HakkimizdaPage() {
  const settings = await getSiteSettings()

  let content = HAKKIMIZDA_DEFAULTS
  if (settings.hakkimizda_content) {
    try {
      content = { ...HAKKIMIZDA_DEFAULTS, ...JSON.parse(settings.hakkimizda_content) }
    } catch {}
  }

  const stats = [
    { value: content.stat1Value, label: content.stat1Label },
    { value: content.stat2Value, label: content.stat2Label },
    { value: content.stat3Value, label: content.stat3Label },
    { value: content.stat4Value, label: content.stat4Label },
  ]

  const nedenBiz = [
    { title: content.neden1Title, desc: content.neden1Desc },
    { title: content.neden2Title, desc: content.neden2Desc },
    { title: content.neden3Title, desc: content.neden3Desc },
  ]

  return (
    <div className="min-h-screen">
      <PageHeading
        title="Hakkımızda"
        description={content.pageDesc}
        breadcrumbs={[{ label: 'Hakkımızda' }]}
      />

      {/* Biz Kimiz */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-foreground">Biz Kimiz?</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>{content.bizKimiz1}</p>
                <p>{content.bizKimiz2}</p>
                <p>{content.bizKimiz3}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, i) => {
                const Icon = STAT_ICONS[i]
                return (
                  <div key={i} className="bg-primary/10 p-6 rounded-lg text-center">
                    <Icon className="w-12 h-12 text-primary mx-auto mb-3" />
                    <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Misyon & Vizyon */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-lg border border-border">
              <h3 className="text-2xl font-bold mb-4 text-foreground">Misyonumuz</h3>
              <p className="text-muted-foreground">{content.misyon}</p>
            </div>
            <div className="bg-white p-8 rounded-lg border border-border">
              <h3 className="text-2xl font-bold mb-4 text-foreground">Vizyonumuz</h3>
              <p className="text-muted-foreground">{content.vizyon}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Neden Biz */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            Neden Bizi Tercih Etmelisiniz?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {nedenBiz.map((item, i) => {
              const Icon = NEDEN_ICONS[i]
              return (
                <div key={i} className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16" style={{backgroundColor: 'rgb(243 244 246 / 0.3)'}}>
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <h2 className="text-3xl font-bold mb-4 text-foreground">Ücretsiz Fiyat Teklifi Alın</h2>
          <p className="text-xl mb-8 text-muted-foreground">
            Profesyonel nakliyat hizmetlerimiz hakkında detaylı bilgi almak için hemen iletişime geçin.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/teklif-al"
              className="px-8 py-4 bg-secondary text-white rounded-lg font-semibold hover:bg-secondary/90 transition"
            >
              Teklif Al
            </a>
            <a
              href={`tel:${settings.phone}`}
              className="px-8 py-4 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition"
            >
              {settings.phone || '444 65 02'}
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
