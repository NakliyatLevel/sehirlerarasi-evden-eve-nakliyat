import { redirect } from 'next/navigation'
import AdminSidebar from '@/components/admin/admin-sidebar'
import AdminHeader from '@/components/admin/admin-header'
import { Toaster } from '@/components/ui/toaster'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Session kontrolü middleware'de yapılıyor
  const user = {
    name: 'Admin',
    email: 'admin@example.com',
  }

  return (
    <div className="min-h-screen bg-muted/50">
      <AdminHeader user={user} />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-6">{children}</main>
      </div>
      <Toaster />
    </div>
  )
}
