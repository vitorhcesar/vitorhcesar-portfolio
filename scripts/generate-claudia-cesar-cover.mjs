import sharp from 'sharp'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { mkdirSync } from 'node:fs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const portraitPath = join(
  root,
  '../lp-claudia-cesar/public/claudia-cesar-hero.webp',
)
const outputDir = join(root, 'public/images/projects/claudia-cesar')
const output = join(outputDir, '01.webp')

const WIDTH = 1920
const HEIGHT = 1080
const BG = '#f8f5f0'
const INK = '#40362f'
const WINE = '#8e4b3f'
const MUTED = '#766b62'

const PORTRAIT_WIDTH = 500
const PORTRAIT_HEIGHT = 760
const GROUP_WIDTH = 1180
const GROUP_LEFT = Math.round((WIDTH - GROUP_WIDTH) / 2)
const PORTRAIT_LEFT = GROUP_LEFT
const TEXT_LEFT = GROUP_LEFT + PORTRAIT_WIDTH + 72
const PORTRAIT_TOP = Math.round((HEIGHT - PORTRAIT_HEIGHT) / 2)

mkdirSync(outputDir, { recursive: true })

const portraitMask = Buffer.from(`
<svg width="${PORTRAIT_WIDTH}" height="${PORTRAIT_HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" rx="250" ry="250" fill="white"/>
</svg>
`)

const portraitBuffer = await sharp(portraitPath)
  .resize(PORTRAIT_WIDTH, PORTRAIT_HEIGHT, {
    fit: 'cover',
    position: 'top',
  })
  .modulate({ saturation: 0.86, brightness: 1.02 })
  .composite([{ input: portraitMask, blend: 'dest-in' }])
  .png()
  .toBuffer()

const backgroundSvg = `
<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="glow" cx="35%" cy="45%" r="55%">
      <stop offset="0%" stop-color="#eadccf" stop-opacity="0.85"/>
      <stop offset="100%" stop-color="#eadccf" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="100%" height="100%" fill="${BG}"/>
  <rect width="100%" height="100%" fill="url(#glow)"/>
</svg>
`

const textSvg = `
<svg width="${GROUP_WIDTH - PORTRAIT_WIDTH - 72}" height="${PORTRAIT_HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <text
    x="0"
    y="270"
    font-family="DejaVu Serif, Liberation Serif, Georgia, serif"
    font-size="38"
    font-weight="600"
    fill="${WINE}"
    letter-spacing="7"
  >PSICÓLOGA</text>
  <text
    x="0"
    y="400"
    font-family="DejaVu Serif, Liberation Serif, Georgia, serif"
    font-size="124"
    font-weight="500"
    fill="${INK}"
    letter-spacing="-3"
  >Claudia</text>
  <text
    x="0"
    y="540"
    font-family="DejaVu Serif, Liberation Serif, Georgia, serif"
    font-size="124"
    font-weight="500"
    fill="${INK}"
    letter-spacing="-3"
  >Cesar</text>
  <text
    x="0"
    y="620"
    font-family="DejaVu Sans, Liberation Sans, Arial, sans-serif"
    font-size="32"
    fill="${MUTED}"
    letter-spacing="1"
  >Psicologia clínica · TCC</text>
</svg>
`

await sharp(Buffer.from(backgroundSvg))
  .composite([
    { input: portraitBuffer, left: PORTRAIT_LEFT, top: PORTRAIT_TOP },
    {
      input: Buffer.from(textSvg),
      left: TEXT_LEFT,
      top: PORTRAIT_TOP,
    },
  ])
  .webp({ quality: 92 })
  .toFile(output)

console.log(`Cover image generated: ${output}`)
