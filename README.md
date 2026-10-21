<div align="center">

<img src="public/images/og-image.jpg" alt="Portfólio Vítor H. Cesar" width="100%"/>

# 💼 Portfólio — Vítor H. Cesar

Meu portfólio profissional como Desenvolvedor Full Stack: apresentação, projetos com galeria de screenshots, depoimentos e formulário de contato.

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white) ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![TanStack Start](https://img.shields.io/badge/TanStack_Start-FF4154?style=for-the-badge&logo=reactquery&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white) ![Bun](https://img.shields.io/badge/Bun-000000?style=for-the-badge&logo=bun&logoColor=white)

**[🌐 Ver ao vivo](https://portfolio.vitorhcesar.com.br)**

</div>

## ✨ Funcionalidades

- **Seções:** Hero (stack e experiência), Sobre (bio, formação, linha do tempo e valores), Projetos, Depoimentos e Contato
- **Galeria de projetos** com screenshots em carrossel e lightbox
- **Formulário de contato** validado com Zod, enviado por e-mail via SMTP (Nodemailer) na rota `/api/contact`, com rate limit em memória
- **Opção de contato por WhatsApp**, quando `VITE_WHATSAPP_NUMBER` está definido
- **Modo currículo** (`VITE_CURRICULUM_MODE` / `CURRICULUM_MODE`): oculta contato, redes sociais, currículo em PDF e formulário
- **Currículo em PDF** em português e inglês
- **SEO:** canonical, Open Graph, JSON-LD, `robots.txt` e `sitemap.xml` gerados por rota
- **Splash screen**, animações de scroll e imagens otimizadas (WebP)
- Script para gerar a imagem Open Graph (`bun run generate:og`)

## 🛠️ Stack

- **Framework:** TanStack Start (React + TanStack Router, SSR com Nitro)
- **Linguagem:** TypeScript
- **Estilo:** Tailwind CSS v4, Lucide Icons
- **Validação e e-mail:** Zod, Nodemailer
- **Build e runtime:** Vite, Bun
- **Qualidade:** ESLint, Prettier, React Compiler

## 📁 Estrutura

```
src/
├── components/   # sections/ (Hero, About, Projects, Testimonials, Contact), layout, ui, splash
├── hooks/        # scroll reveal, seção ativa, carrossel de screenshots
├── lib/          # conteúdo (projetos, sobre, depoimentos), SEO, SMTP, rate limit, modo currículo
└── routes/       # página inicial, 404, api/contact, robots.txt e sitemap.xml
public/           # imagens, ícones de tecnologias e currículos em PDF
scripts/          # geração de imagens (Open Graph)
```

## 🚀 Como rodar

```bash
bun install
cp .env.example .env   # preencha as variáveis
bun --bun run dev      # http://localhost:3000
```

| Script | O que faz |
|---|---|
| `dev` | Servidor de desenvolvimento na porta 3000 |
| `build` | Build de produção |
| `preview` | Pré-visualiza o build |
| `generate:og` | Gera a imagem Open Graph |
| `generate-routes` | Gera a árvore de rotas do TanStack Router |
| `lint` / `format` / `check` | ESLint e Prettier |

## 🔐 Variáveis de ambiente

Veja `.env.example`. Nunca versione valores reais.

| Variável | Uso |
|---|---|
| `VITE_SITE_URL` | URL pública (canonical, Open Graph, sitemap, JSON-LD) |
| `VITE_CURRICULUM_MODE` / `CURRICULUM_MODE` | Liga o modo currículo (cliente / servidor) |
| `VITE_CONTACT_EMAIL` | E-mail exibido na seção Contato (opcional) |
| `VITE_WHATSAPP_NUMBER` | Contato via WhatsApp (opcional) |
| `VITE_LINKEDIN_URL` | Perfil do LinkedIn no JSON-LD (opcional) |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USERNAME`, `SMTP_PASSWORD`, `SMTP_FROM`, `SMTP_SECURE` | Envio de e-mail (somente servidor) |
| `CONTACT_TO_EMAIL` | Caixa que recebe as mensagens do formulário |

## 📄 Licença

O código é público para consulta. Veja os termos em [LICENSE](LICENSE).

## 👤 Autor

Feito por **Vítor H. Cesar**, Desenvolvedor Full Stack.

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/vitorhcesar/) [![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/vitorhcesar)
