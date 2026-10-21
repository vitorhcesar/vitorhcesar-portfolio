import sharp from 'sharp'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const output = join(root, 'public/images/og-image.jpg')
const portrait = join(root, 'public/images/vitorhcesar-pic.png')

const WIDTH = 1200
const HEIGHT = 630
const LEFT_WIDTH = 600
const RIGHT_WIDTH = WIDTH - LEFT_WIDTH

const cardSvg = `
<svg width="${LEFT_WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#f3efe8"/>
  <text
    x="${LEFT_WIDTH / 2}"
    y="210"
    text-anchor="middle"
    font-family="DejaVu Serif, Liberation Serif, Georgia, serif"
    font-size="22"
    font-weight="600"
    fill="#2563eb"
    letter-spacing="4"
  >DESENVOLVEDOR FULL STACK</text>
  <text
    x="${LEFT_WIDTH / 2}"
    y="310"
    text-anchor="middle"
    font-family="DejaVu Serif, Liberation Serif, Georgia, serif"
    font-size="78"
    font-weight="700"
    fill="#0f172a"
  >Vitor Hugo</text>
  <text
    x="${LEFT_WIDTH / 2}"
    y="380"
    text-anchor="middle"
    font-family="DejaVu Serif, Liberation Serif, Georgia, serif"
    font-size="30"
    font-style="italic"
    fill="#2563eb"
  >Web e mobile • alta performance</text>
  <text
    x="${LEFT_WIDTH / 2}"
    y="500"
    text-anchor="middle"
    font-family="DejaVu Sans, Liberation Sans, Arial, sans-serif"
    font-size="20"
    fill="#64748b"
  >React • Next.js • TypeScript • +2 anos</text>
</svg>
`

const portraitBuffer = await sharp(portrait)
  .resize(RIGHT_WIDTH, HEIGHT, {
    fit: 'cover',
    position: 'top',
  })
  .toBuffer()

await sharp({
  create: {
    width: WIDTH,
    height: HEIGHT,
    channels: 3,
    background: '#020617',
  },
})
  .composite([
    { input: Buffer.from(cardSvg), left: 0, top: 0 },
    { input: portraitBuffer, left: LEFT_WIDTH, top: 0 },
  ])
  .jpeg({ quality: 95, mozjpeg: true })
  .toFile(output)

console.log(`OG image generated: ${output}`)
