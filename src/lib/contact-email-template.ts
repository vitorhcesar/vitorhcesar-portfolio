export interface SendContactEmailInput {
  name: string
  email: string
  phone: string
  reason: string
}

const SITE_NAME = 'Vitor Hugo'
const SITE_URL = process.env.VITE_SITE_URL ?? 'https://vitorhcesar.dev'

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function formatReceivedAt(date: Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'long',
    timeStyle: 'short',
    timeZone: 'America/Sao_Paulo',
  }).format(date)
}

function fieldRow(label: string, value: string, isLink = false): string {
  const safeValue = escapeHtml(value)
  const displayValue = isLink
    ? `<a href="mailto:${safeValue}" class="email-link" style="color:#2563eb;text-decoration:none;font-weight:600;">${safeValue}</a>`
    : `<span class="email-value" style="color:#0f172a;font-weight:600;">${safeValue}</span>`

  return `
    <tr>
      <td class="email-field-label" style="padding:14px 0;border-bottom:1px solid #e2e8f0;vertical-align:top;width:120px;">
        <span style="font-size:12px;font-weight:600;letter-spacing:0.04em;text-transform:uppercase;color:#64748b;">${label}</span>
      </td>
      <td class="email-field-value" style="padding:14px 0 14px 16px;border-bottom:1px solid #e2e8f0;vertical-align:top;">
        <span style="font-size:15px;line-height:1.5;">${displayValue}</span>
      </td>
    </tr>
  `
}

export function buildContactEmailSubject(name: string): string {
  return `Novo contato: ${name} — ${SITE_NAME}`
}

export function buildContactEmailText(
  input: SendContactEmailInput,
  receivedAt: Date,
): string {
  const divider = '─'.repeat(48)

  return [
    `NOVO CONTATO — ${SITE_NAME}`,
    divider,
    '',
    `Recebido em: ${formatReceivedAt(receivedAt)}`,
    '',
    'DADOS DO CONTATO',
    divider,
    `Nome:     ${input.name}`,
    `E-mail:   ${input.email}`,
    `Celular:  ${input.phone}`,
    '',
    'MOTIVO DO CONTATO',
    divider,
    input.reason,
    '',
    divider,
    `Responder: ${input.email}`,
    `Portfólio: ${SITE_URL}`,
    '',
    `Mensagem enviada automaticamente pelo formulário de contato em ${SITE_URL}`,
  ].join('\n')
}

export function buildContactEmailHtml(
  input: SendContactEmailInput,
  receivedAt: Date,
): string {
  const receivedLabel = formatReceivedAt(receivedAt)
  const reasonHtml = escapeHtml(input.reason).replaceAll('\n', '<br>')

  return `<!DOCTYPE html>
<html lang="pt-BR" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <title>Novo contato — ${escapeHtml(SITE_NAME)}</title>
  <style>
    :root { color-scheme: light dark; }

    @media (prefers-color-scheme: dark) {
      .email-body { background-color: #020617 !important; }
      .email-card { background-color: #0f172a !important; border-color: #1e293b !important; }
      .email-header { background-color: #0f172a !important; border-bottom-color: #1e293b !important; }
      .email-accent-bar { background-color: #3b82f6 !important; }
      .email-kicker { color: #60a5fa !important; }
      .email-title { color: #f8fafc !important; }
      .email-subtitle { color: #94a3b8 !important; }
      .email-meta-box { background-color: #1e293b !important; border-color: #334155 !important; }
      .email-meta-text { color: #94a3b8 !important; }
      .email-meta-strong { color: #e2e8f0 !important; }
      .email-section-label { color: #94a3b8 !important; }
      .email-field-label, .email-field-value { border-bottom-color: #334155 !important; }
      .email-value { color: #f1f5f9 !important; }
      .email-link { color: #60a5fa !important; }
      .email-message-box { background-color: #1e293b !important; border-color: #334155 !important; border-left-color: #3b82f6 !important; }
      .email-message-text { color: #e2e8f0 !important; }
      .email-site-link { color: #94a3b8 !important; }
      .email-footer { background-color: #020617 !important; border-top-color: #1e293b !important; }
      .email-footer-text { color: #64748b !important; }
      .email-footer-strong { color: #94a3b8 !important; }
    }
  </style>
</head>
<body class="email-body" style="margin:0;padding:0;background-color:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;-webkit-font-smoothing:antialiased;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">
    Novo contato de ${escapeHtml(input.name)} via portfólio. Responda em ${escapeHtml(input.email)}.
  </div>

  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" class="email-body" style="background-color:#f1f5f9;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" class="email-card" style="max-width:600px;background-color:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e2e8f0;box-shadow:0 4px 24px rgba(15,23,42,0.06);">

          <!-- Accent bar -->
          <tr>
            <td class="email-accent-bar" style="height:4px;background-color:#2563eb;font-size:0;line-height:0;">&nbsp;</td>
          </tr>

          <!-- Header — light-first for Gmail/Outlook inversion safety -->
          <tr>
            <td class="email-header" style="background-color:#ffffff;padding:28px 32px 24px;border-bottom:1px solid #e2e8f0;">
              <p class="email-kicker" style="margin:0 0 8px;font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#2563eb;">
                Portfólio · Novo contato
              </p>
              <h1 class="email-title" style="margin:0;font-size:24px;font-weight:700;line-height:1.3;color:#0f172a;letter-spacing:-0.02em;">
                Mensagem recebida
              </h1>
              <p class="email-subtitle" style="margin:10px 0 0;font-size:14px;line-height:1.5;color:#64748b;">
                ${escapeHtml(input.name)} entrou em contato pelo formulário do site.
              </p>
            </td>
          </tr>

          <!-- Meta -->
          <tr>
            <td style="padding:20px 32px 0;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" class="email-meta-box" style="background-color:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;">
                <tr>
                  <td style="padding:12px 16px;">
                    <p class="email-meta-text" style="margin:0;font-size:13px;color:#64748b;">
                      <strong class="email-meta-strong" style="color:#334155;">Recebido em:</strong> ${receivedLabel}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Contact details -->
          <tr>
            <td style="padding:24px 32px 8px;">
              <p class="email-section-label" style="margin:0 0 16px;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#64748b;">
                Dados do contato
              </p>
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                ${fieldRow('Nome', input.name)}
                ${fieldRow('E-mail', input.email, true)}
                ${fieldRow('Celular', input.phone)}
              </table>
            </td>
          </tr>

          <!-- Message -->
          <tr>
            <td style="padding:16px 32px 28px;">
              <p class="email-section-label" style="margin:0 0 12px;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#64748b;">
                Motivo do contato
              </p>
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" class="email-message-box" style="background-color:#f8fafc;border:1px solid #e2e8f0;border-left:4px solid #3b82f6;border-radius:10px;">
                <tr>
                  <td style="padding:20px;">
                    <p class="email-message-text" style="margin:0;font-size:15px;line-height:1.7;color:#334155;">${reasonHtml}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding:0 32px 32px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td align="center" style="padding-bottom:16px;">
                    <a href="mailto:${escapeHtml(input.email)}?subject=Re:%20Contato%20pelo%20portf%C3%B3lio"
                       style="display:inline-block;background-color:#2563eb;color:#ffffff;font-size:15px;font-weight:600;text-decoration:none;padding:14px 28px;border-radius:10px;box-shadow:0 4px 14px rgba(37,99,235,0.35);">
                      Responder para ${escapeHtml(input.name)}
                    </a>
                  </td>
                </tr>
                <tr>
                  <td align="center">
                    <a href="${escapeHtml(SITE_URL)}" class="email-site-link" style="font-size:13px;color:#64748b;text-decoration:none;">
                      ${escapeHtml(SITE_URL.replace(/^https?:\/\//, ''))}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td class="email-footer" style="background-color:#f8fafc;border-top:1px solid #e2e8f0;padding:20px 32px;">
              <p class="email-footer-text" style="margin:0;font-size:12px;line-height:1.6;color:#94a3b8;text-align:center;">
                Este e-mail foi enviado automaticamente pelo formulário de contato do portfólio
                <strong class="email-footer-strong" style="color:#64748b;">${escapeHtml(SITE_NAME)}</strong>.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}
