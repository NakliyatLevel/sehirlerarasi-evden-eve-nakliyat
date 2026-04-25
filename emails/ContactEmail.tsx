import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Hr,
} from '@react-email/components'

interface ContactEmailProps {
  name: string
  email: string
  phone?: string
  message: string
}

export default function ContactEmail({
  name,
  email,
  phone,
  message,
}: ContactEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Text style={heading}>Yeni İletişim Formu Mesajı</Text>
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

            <Hr style={hr} />

            <Text style={label}>Mesaj:</Text>
            <Text style={messageText}>{message}</Text>
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

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
}

const messageText = {
  fontSize: '16px',
  color: '#555555',
  lineHeight: '24px',
  whiteSpace: 'pre-wrap' as const,
}
