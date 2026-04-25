import Image from 'next/image'

interface Partner {
  id: string
  name: string
  logo: string | null
}

interface LogoMarqueeProps {
  partners: Partner[]
  title?: string
}

function MarqueeRow({ items, direction }: { items: Partner[]; direction: 'left' | 'right' }) {
  const doubled = [...items, ...items]

  return (
    <div className="overflow-hidden relative w-full">
      {/* Kenar fade efekti */}
      <div className="absolute inset-y-0 left-0 w-52 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-52 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

      <div
        className={`flex gap-4 w-max ${
          direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'
        }`}
      >
        {doubled.map((partner, idx) => (
          <div
            key={`${partner.id}-${idx}`}
            className="flex-shrink-0 w-40 h-20 bg-white border border-gray-200 rounded-xl shadow-sm flex items-center justify-center p-3 hover:shadow-md hover:border-primary/30 transition-all duration-300"
          >
            {partner.logo ? (
              <div className="relative w-full h-full">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  className="object-contain"
                  sizes="160px"
                />
              </div>
            ) : (
              <span className="text-xs font-semibold text-center text-muted-foreground leading-tight">
                {partner.name}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function LogoMarquee({ partners, title }: LogoMarqueeProps) {
  if (!partners || partners.length === 0) return null

  const mid = Math.ceil(partners.length / 2)
  const row1 = partners.slice(0, mid)
  const row2 = partners.slice(mid)

  return (
    <section className="py-12 bg-white border-b border-gray-100">
      <div className="space-y-4">
        <MarqueeRow items={row1} direction="left" />
        <MarqueeRow items={row2} direction="right" />
      </div>
    </section>
  )
}
