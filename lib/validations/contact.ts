import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().min(2, 'İsim en az 2 karakter olmalı'),
  company: z.string().optional(),
  phone: z.string().min(10, 'Geçerli bir telefon numarası girin'),
  email: z.string().email('Geçerli bir email adresi girin'),
  message: z.string().min(10, 'Mesaj en az 10 karakter olmalı'),
})

export type ContactFormData = z.infer<typeof contactSchema>
