'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Phone, Mail, Facebook, Instagram, Twitter, Linkedin, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Post {
  id: string
  title: string
  slug: string
  image: string | null
  publishedAt: Date | null
}

interface Settings {
  phone?: string
  email?: string
  whatsapp?: string
  facebook?: string
  instagram?: string
  twitter?: string
  linkedin?: string
}

export default function BlogSidebar() {
  const [recentPosts, setRecentPosts] = useState<Post[]>([])
  const [settings, setSettings] = useState<Settings>({})

  useEffect(() => {
    fetch('/api/blog?limit=5')
      .then(res => res.json())
      .then(data => setRecentPosts(data.posts || []))
      .catch(() => {})

    fetch('/api/settings')
      .then(res => res.json())
      .then(data => setSettings(data))
      .catch(() => {})
  }, [])

  return (
    <div className="space-y-6">
      {/* Hızlı İletişim Kartı - Sticky */}
      <div className="bg-primary text-white p-6 rounded-lg sticky top-4">
        <h3 className="text-xl font-bold mb-4">Hızlı İletişim</h3>
        <div className="space-y-3">
          {settings.phone && (
            <a
              href={`tel:${settings.phone}`}
              className="flex items-center gap-3 hover:text-white/80 transition"
            >
              <Phone className="w-5 h-5" />
              <span>{settings.phone}</span>
            </a>
          )}
          {settings.email && (
            <a
              href={`mailto:${settings.email}`}
              className="flex items-center gap-3 hover:text-white/80 transition"
            >
              <Mail className="w-5 h-5" />
              <span className="text-sm">{settings.email}</span>
            </a>
          )}
          {settings.whatsapp && (
            <a
              href={`https://wa.me/${settings.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 hover:text-white/80 transition"
            >
              <MessageCircle className="w-5 h-5" />
              <span>WhatsApp</span>
            </a>
          )}
        </div>
        <Link href="/teklif-al" className="mt-4 block">
          <Button className="w-full bg-secondary hover:bg-secondary/90 text-white">
            Ücretsiz Teklif Al
          </Button>
        </Link>
      </div>

      {/* Son Blog Yazıları */}
      {recentPosts.length > 0 && (
        <div className="bg-white p-6 rounded-lg border border-border">
          <h3 className="text-xl font-bold mb-4">Son Yazılar</h3>
          <div className="space-y-4">
            {recentPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="flex gap-3 group"
              >
                {post.image && (
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <h4 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition">
                    {post.title}
                  </h4>
                  {post.publishedAt && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(post.publishedAt).toLocaleDateString('tr-TR')}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Sosyal Medya */}
      <div className="bg-white p-6 rounded-lg border border-border">
        <h3 className="text-xl font-bold mb-4">Bizi Takip Edin</h3>
        <div className="flex gap-3">
          {settings.facebook && (
            <a
              href={settings.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition"
            >
              <Facebook className="w-5 h-5" />
            </a>
          )}
          {settings.instagram && (
            <a
              href={settings.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition"
            >
              <Instagram className="w-5 h-5" />
            </a>
          )}
          {settings.twitter && (
            <a
              href={settings.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition"
            >
              <Twitter className="w-5 h-5" />
            </a>
          )}
          {settings.linkedin && (
            <a
              href={settings.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
