import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Hr,
} from '@react-email/components'

interface QuoteEmailProps {
  name: string
  email: string
  phone?: string
  type: 'local' | 'international'
  details: any
  price?: number
}

export default function QuoteEmail({ name, email, phone, type, details = {}, price }: QuoteEmailProps) {
  const boolLabel = (val?: boolean) => (val ? 'Evet' : 'Hayır')

  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Text style={heading}>Yeni Teklif Talebi</Text>
          </Section>

          <Section style={content}>
            <Section>
              <Text style={sectionTitle}>Müşteri Bilgileri</Text>
              <Text style={label}>İsim</Text>
              <Text style={value}>{name}</Text>
              <Text style={label}>Email</Text>
              <Text style={value}>{email}</Text>
              {phone && (
                <>
                  <Text style={label}>Telefon</Text>
                  <Text style={value}>{phone}</Text>
                </>
              )}
            </Section>

            <Hr style={hr} />

            <Section>
              <Text style={sectionTitle}>Taşınma Bilgileri</Text>
              {details.preferredDate && (
                <>
                  <Text style={label}>Tercih Edilen Tarih</Text>
                  <Text style={value}>{details.preferredDate}</Text>
                </>
              )}
              <Text style={label}>Nereden</Text>
              <Text style={value}>{details.fromAddress || '-'}</Text>
              <Text style={label}>Nereye</Text>
              <Text style={value}>{details.toAddress || '-'}</Text>
              <Text style={label}>Konut Tipi</Text>
              <Text style={value}>{details.propertyType || '-'}</Text>
              <Text style={label}>Oda / Eşya</Text>
              <Text style={value}>
                {details.rooms || '-'} oda · {details.furnitureCount || '-'} eşya
              </Text>
              <Text style={label}>Mesafe</Text>
              <Text style={value}>{details.distance ? `${details.distance} km` : '-'}</Text>
              <Text style={label}>Kat &amp; Asansör</Text>
              <Text style={value}>
                Çıkış: {details.fromFloor || '-'} / {boolLabel(details.fromElevator)} · Varış: {details.toFloor || '-'} / {boolLabel(details.toElevator)}
              </Text>
            </Section>

            <Hr style={hr} />

            <Section>
              <Text style={sectionTitle}>Özel Öğeler &amp; Ek Hizmetler</Text>
              <Text style={label}>Kırılabilir Eşyalar</Text>
              <Text style={value}>{boolLabel(details.hasFragileItems)}</Text>
              <Text style={label}>Piyano</Text>
              <Text style={value}>{boolLabel(details.hasPiano)}</Text>
              <Text style={label}>Antika / Koleksiyon</Text>
              <Text style={value}>{boolLabel(details.hasAntiques)}</Text>
              {details.specialItems && (
                <>
                  <Text style={label}>Özel Eşyalar</Text>
                  <Text style={value}>{details.specialItems}</Text>
                </>
              )}
              <Text style={label}>Paketleme</Text>
              <Text style={value}>{boolLabel(details.needsPacking)}</Text>
              <Text style={label}>Sökme - Takma</Text>
              <Text style={value}>{boolLabel(details.needsDisassembly)}</Text>
              <Text style={label}>Depolama</Text>
              <Text style={value}>{boolLabel(details.needsStorage)}</Text>
              <Text style={label}>Sigorta</Text>
              <Text style={value}>{boolLabel(details.needsInsurance)}</Text>
            </Section>

            {details.additionalNotes && (
              <>
                <Hr style={hr} />
                <Section>
                  <Text style={sectionTitle}>Ek Not</Text>
                  <Text style={value}>{details.additionalNotes}</Text>
                </Section>
              </>
            )}

            {price && (
              <>
                <Hr style={hr} />
                <Section>
                  <Text style={sectionTitle}>Hesaplanan Fiyat</Text>
                  <Text style={priceText}>
                    {price.toLocaleString('tr-TR')} {type === 'international' ? 'EUR' : 'TL'}
                  </Text>
                </Section>
              </>
            )}
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
}

const header = {
  padding: '32px',
  backgroundColor: '#1e455f',
}

const heading = {
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#ffffff',
  margin: '0',
}

const content = {
  padding: '0 32px',
}

const sectionTitle = {
  fontSize: '18px',
  fontWeight: '600',
  color: '#1e455f',
  margin: '16px 0 8px',
}

const label = {
  fontSize: '13px',
  fontWeight: '600',
  color: '#333333',
  marginBottom: '2px',
  marginTop: '12px',
}

const value = {
  fontSize: '15px',
  color: '#555555',
  margin: 0,
}

const priceText = {
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#1e455f',
  margin: '8px 0',
}

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
}

const detailsBox = {
  backgroundColor: '#f8f9fa',
  padding: '16px',
  borderRadius: '4px',
  marginTop: '8px',
}

const detailsText = {
  fontSize: '14px',
  color: '#555555',
  margin: '0',
  fontFamily: 'monospace',
}
