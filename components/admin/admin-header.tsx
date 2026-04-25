'use client'

import { signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { LogOut, User } from 'lucide-react'

interface AdminHeaderProps {
  user: {
    name?: string | null
    email?: string | null
  }
}

export default function AdminHeader({ user }: AdminHeaderProps) {
  return (
    <header className="bg-white border-b border-border sticky top-0 z-10">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <h1 className="text-xl font-bold text-primary">Admin Panel</h1>
          <p className="text-sm text-muted-foreground">Evden Eve Nakliyat Yönetimi</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-muted-foreground" />
            <div className="text-sm">
              <p className="font-medium">{user.name}</p>
              <p className="text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => signOut({ callbackUrl: '/karakar/login' })}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Çıkış
          </Button>
        </div>
      </div>
    </header>
  )
}
