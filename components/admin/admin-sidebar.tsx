'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  FileText,
  Image,
  MessageSquare,
  HelpCircle,
  DollarSign,
  Globe,
  Settings,
  Newspaper,
  Briefcase,
  Star,
  TrendingUp,
  GitBranch,
  ImagePlus,
  Building2,
  Info,
  Lightbulb,
} from 'lucide-react'

const menuItems = [
  {
    title: 'Dashboard',
    href: '/karakar/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Hizmetler',
    href: '/karakar/hizmetler',
    icon: Briefcase,
  },
  {
    title: 'Çözümler',
    href: '/karakar/cozumler',
    icon: Lightbulb,
  },
  {
    title: 'Özellikler',
    href: '/karakar/ozellikler',
    icon: Star,
  },
  {
    title: 'İstatistikler',
    href: '/karakar/istatistikler',
    icon: TrendingUp,
  },
  {
    title: 'Süreç Adımları',
    href: '/karakar/surec',
    icon: GitBranch,
  },
  {
    title: 'Hakkımızda Sayfası',
    href: '/karakar/hakkimizda',
    icon: Info,
  },
  {
    title: 'Sayfalar',
    href: '/karakar/sayfalar',
    icon: FileText,
  },
  {
    title: 'Blog',
    href: '/karakar/blog',
    icon: Newspaper,
  },
  {
    title: 'Medya',
    href: '/karakar/medya',
    icon: ImagePlus,
  },
  {
    title: 'Galeri',
    href: '/karakar/galeri',
    icon: Image,
  },
  {
    title: 'Referanslar',
    href: '/karakar/referanslar',
    icon: Building2,
  },
  {
    title: 'Yorumlar',
    href: '/karakar/yorumlar',
    icon: MessageSquare,
  },
  {
    title: 'SSS',
    href: '/karakar/sss',
    icon: HelpCircle,
  },
  {
    title: 'Fiyatlandırma',
    href: '/karakar/fiyatlandirma',
    icon: DollarSign,
  },
  {
    title: 'Ülkeler',
    href: '/karakar/ulkeler',
    icon: Globe,
  },
  {
    title: 'Hizmet Bölgeleri',
    href: '/karakar/hizmet-bolgeleri',
    icon: Globe,
  },
  {
    title: 'Ayarlar',
    href: '/karakar/ayarlar',
    icon: Settings,
  },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-white border-r border-border min-h-[calc(100vh-73px)]">
      <nav className="p-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-md transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.title}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
