import { prisma } from '@/lib/db'
import SettingsForm from '@/components/admin/settings-form'

async function getSettings() {
  const settings = await prisma.siteSetting.findMany({
    orderBy: { key: 'asc' },
  })

  return settings.reduce(
    (acc, setting) => {
      acc[setting.key] = setting.value
      return acc
    },
    {} as Record<string, string>
  )
}

export default async function SettingsPage() {
  const settings = await getSettings()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">Site Ayarları</h1>
        <p className="text-muted-foreground mt-2">
          Site genelinde kullanılan ayarları buradan yönetebilirsiniz
        </p>
      </div>

      <SettingsForm initialSettings={settings} />
    </div>
  )
}
