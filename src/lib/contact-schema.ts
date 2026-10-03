import { getPhoneDigits } from '#/lib/phone-mask'
import { z } from 'zod'

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Nome muito curto')
    .max(100, 'Nome muito longo'),
  email: z.string().trim().email('E-mail inválido').max(254),
  phone: z
    .string()
    .trim()
    .refine(
      (value) => getPhoneDigits(value).length === 11,
      'Celular inválido',
    ),
  reason: z
    .string()
    .trim()
    .min(5, 'Motivo muito curto')
    .max(5000, 'Motivo muito longo'),
  /** Honeypot — obscure name to avoid browser autofill. */
  _hp: z.string().max(200).optional().default(''),
})

export type ContactFormInput = z.infer<typeof contactFormSchema>
