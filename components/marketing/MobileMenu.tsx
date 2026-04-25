'use client'

import { useState } from 'react'
import Link from 'next/link'
import { X, ChevronDown, ChevronUp } from 'lucide-react'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [isCozumlerOpen, setIsCozumlerOpen] = useState(false)

  if (!isOpen) return null

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40 md:hidden"
        onClick={onClose}
      />
      <div className="fixed top-0 right-0 bottom-0 w-64 bg-white z-50 border-l border-gray-200 md:hidden overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="font-semibold">Menü</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Link
                href="/"
                onClick={onClose}
                className="block py-2 px-4 hover:bg-gray-100 rounded-md transition"
              >
                Ana Sayfa
              </Link>
            </li>
            
            <li>
              <Link
                href="/hakkimizda"
                onClick={onClose}
                className="block py-2 px-4 hover:bg-gray-100 rounded-md transition"
              >
                Hakkımızda
              </Link>
            </li>

            <li>
              <button
                onClick={() => setIsCozumlerOpen(!isCozumlerOpen)}
                className="w-full flex items-center justify-between py-2 px-4 hover:bg-gray-100 rounded-md transition"
              >
                Çözümlerimiz
                {isCozumlerOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {isCozumlerOpen && (
                <ul className="ml-4 mt-2 space-y-1">
                  <li>
                    <Link
                      href="/cozum/ucretsiz-ekspertiz"
                      onClick={onClose}
                      className="block py-2 px-4 hover:bg-gray-100 rounded-md transition text-sm"
                    >
                      Ücretsiz Ekspertiz
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/cozum/sozlesmeli-nakliyat"
                      onClick={onClose}
                      className="block py-2 px-4 hover:bg-gray-100 rounded-md transition text-sm"
                    >
                      Sözleşmeli Evden Eve Nakliyat
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/cozum/sigortali-nakliyat"
                      onClick={onClose}
                      className="block py-2 px-4 hover:bg-gray-100 rounded-md transition text-sm"
                    >
                      Sigortalı Evden Eve Nakliyat
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/cozum/asansorlu-nakliyat"
                      onClick={onClose}
                      className="block py-2 px-4 hover:bg-gray-100 rounded-md transition text-sm"
                    >
                      Asansörlü Evden Eve Nakliyat
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/cozum/ambalaj-paketleme"
                      onClick={onClose}
                      className="block py-2 px-4 hover:bg-gray-100 rounded-md transition text-sm"
                    >
                      Ambalaj ve Paketleme
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <li>
              <Link
                href="/hizmetlerimiz"
                onClick={onClose}
                className="block py-2 px-4 hover:bg-gray-100 rounded-md transition"
              >
                Hizmetlerimiz
              </Link>
            </li>
            <li>
              <Link
                href="/referanslar"
                onClick={onClose}
                className="block py-2 px-4 hover:bg-gray-100 rounded-md transition"
              >
                Referanslar
              </Link>
            </li>
            <li>
              <Link
                href="/hizmet-bolgeleri"
                onClick={onClose}
                className="block py-2 px-4 hover:bg-gray-100 rounded-md transition"
              >
                Hizmet Bölgeleri
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                onClick={onClose}
                className="block py-2 px-4 hover:bg-gray-100 rounded-md transition"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="/iletisim"
                onClick={onClose}
                className="block py-2 px-4 hover:bg-gray-100 rounded-md transition"
              >
                İletişim
              </Link>
            </li>
            <li className="pt-4">
              <Link
                href="/teklif-al"
                onClick={onClose}
                className="block py-3 px-4 bg-secondary text-white text-center rounded-md font-semibold hover:bg-secondary/90 transition"
              >
                Teklif Al
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  )
}
