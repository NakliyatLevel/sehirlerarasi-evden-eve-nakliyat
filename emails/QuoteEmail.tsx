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

export default function QuoteEmail({
  name,
  email,
  phone,
  type,
  details,
  price,
}: QuoteEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Text style={heading}>Yeni Teklif Talebi</Text>
          </Section>

          <Section style={content}>
            <Text style={label}>İsim:</Text>
            <Text style={value}>{name}</Text>

            <Text style={label}>Email:</Text>
            <Text style={value}>{email}</Text>

            {phone && (
              <>
                <Text style={label}>Telefon:</Text>
                <Text style={value}>{phone}</Text>
              </>
            )}

            <Text style={label}>Teklif Tipi:</Text>
            <Text style={value}>
              {type === 'local' ? 'Lokal Nakliyat' : 'Uluslararası Nakliyat'}
            </Text>

            {price && (
              <>
                <Text style={label}>Hesaplanan Fiyat:</Text>
                <Text style={priceText}>
                  {price.toLocaleString('tr-TR')} {type === 'international' ? 'EUR' : 'TL'}
                </Text>
              </>
            )}

            <Hr style={hr} />

            <Text style={label}>Detaylar:</Text>
            <Section style={detailsBox}>
              <pre style={detailsText}>{JSON.stringify(details, null, 2)}</pre>
            </Section>
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

const label = {
  fontSize: '14px',
  fontWeight: 'bold',
  color: '#333333',
  marginBottom: '4px',
  marginTop: '16px',
}

const value = {
  fontSize: '16px',
  color: '#555555',
  margin: '0',
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
