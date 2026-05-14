import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Hr,
} from '@react-email/components'

interface HeroQuickQuoteEmailProps {
  fullName: string
  phone: string
  fromCity: string
  toCity: string
  roomType: string
  priceMin?: number
  priceMax?: number
}

export default function HeroQuickQuoteEmail({
  fullName,
  phone,
  fromCity,
  toCity,
  roomType,
  priceMin,
  priceMax,
}: HeroQuickQuoteEmailProps) {
  const formattedPrice =
    typeof priceMin === 'number' && typeof priceMax === 'number'
      ? `${priceMin.toLocaleString('tr-TR')} TL - ${priceMax.toLocaleString('tr-TR')} TL`
      : null

  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Text style={heading}>Hero Hızlı Teklif Talebi</Text>
          </Section>

          <Section style={content}>
            <Text style={label}>Ad Soyad:</Text>
            <Text style={value}>{fullName}</Text>

            <Text style={label}>Telefon:</Text>
            <Text style={value}>{phone}</Text>

            <Hr style={hr} />

            <Text style={label}>Nereden:</Text>
            <Text style={value}>{fromCity}</Text>

            <Text style={label}>Nereye:</Text>
            <Text style={value}>{toCity}</Text>

            <Text style={label}>Ev Tipi:</Text>
            <Text style={value}>{roomType}</Text>

            {formattedPrice && (
              <>
                <Text style={label}>Tahmini Fiyat Aralığı:</Text>
                <Text style={value}>{formattedPrice}</Text>
              </>
            )}

            <Hr style={hr} />

            <Text style={messageText}>
              Not: Bu fiyat aralığı tahminidir. Daha net fiyat için ekibimiz müşteriyi arayıp detay alacaktır.
            </Text>
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
  fontSize: '22px',
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

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
}

const messageText = {
  fontSize: '14px',
  color: '#555555',
  lineHeight: '22px',
  whiteSpace: 'pre-wrap' as const,
}
