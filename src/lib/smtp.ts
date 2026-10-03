import {
  buildContactEmailHtml,
  buildContactEmailSubject,
  buildContactEmailText,
  type SendContactEmailInput,
} from '#/lib/contact-email-template'
import nodemailer from 'nodemailer'

export type { SendContactEmailInput }

interface SmtpConfig {
  host: string
  port: number
  secure: boolean
  auth: {
    user: string
    pass: string
  }
  from: string
  to: string
}

function requireEnv(key: string): string {
  const value = process.env[key]
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`)
  }
  return value
}

/** Reads SMTP settings from env. Never expose this object to the client. */
export function getSmtpConfig(): SmtpConfig {
  return {
    host: requireEnv('SMTP_HOST'),
    port: parseInt(requireEnv('SMTP_PORT'), 10),
    secure: requireEnv('SMTP_SECURE') === 'true',
    auth: {
      user: requireEnv('SMTP_USERNAME'),
      pass: requireEnv('SMTP_PASSWORD'),
    },
    from: requireEnv('SMTP_FROM'),
    to: requireEnv('CONTACT_TO_EMAIL'),
  }
}

export async function sendContactEmail(
  input: SendContactEmailInput,
): Promise<void> {
  const config = getSmtpConfig()
  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: config.auth,
  })

  const receivedAt = new Date()
  const subject = buildContactEmailSubject(input.name)
  const text = buildContactEmailText(input, receivedAt)
  const html = buildContactEmailHtml(input, receivedAt)

  await transporter.sendMail({
    from: `"Portfólio Vitor Hugo" <${config.from}>`,
    to: config.to,
    replyTo: {
      name: input.name,
      address: input.email,
    },
    subject,
    text,
    html,
  })
}
