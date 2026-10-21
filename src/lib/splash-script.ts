import { SPLASH_BLOCKED_KEY } from '#/lib/splash-storage'

export const splashSkipScript = `
try {
  if (localStorage.getItem('${SPLASH_BLOCKED_KEY}') === '1') {
    document.documentElement.dataset.splash = 'skip';
  }
} catch (e) {}
`
