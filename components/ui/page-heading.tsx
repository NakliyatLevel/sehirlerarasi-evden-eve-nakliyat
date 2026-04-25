import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface PageHeadingProps {
  title: string
  description?: string
  breadcrumbs?: BreadcrumbItem[]
}

export function PageHeading({ title, description, breadcrumbs }: PageHeadingProps) {
  return (
    <div className="bg-primary/5 border-b border-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
          
          {description && (
            <p className="text-lg text-muted-foreground mb-6">{description}</p>
          )}
          
          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav className="flex items-center justify-center gap-2 text-sm">
              <Link 
                href="/" 
                className="text-muted-foreground hover:text-primary transition"
              >
                Ana Sayfa
              </Link>
              {breadcrumbs.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  {item.href ? (
                    <Link 
                      href={item.href}
                      className="text-muted-foreground hover:text-primary transition"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span className="text-foreground font-medium">{item.label}</span>
                  )}
                </div>
              ))}
            </nav>
          )}
        </div>
      </div>
    </div>
  )
}
