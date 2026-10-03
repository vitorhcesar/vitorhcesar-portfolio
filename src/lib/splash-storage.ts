export const SPLASH_BLOCKED_KEY = 'splash-blocked'
export const SPLASH_PROMPT_ANSWERED_KEY = 'splash-prompt-answered'

export function isSplashBlocked(): boolean {
  try {
    return localStorage.getItem(SPLASH_BLOCKED_KEY) === '1'
  } catch {
    return false
  }
}

export function shouldShowSplashPrompt(): boolean {
  try {
    return (
      localStorage.getItem(SPLASH_BLOCKED_KEY) !== '1' &&
      localStorage.getItem(SPLASH_PROMPT_ANSWERED_KEY) !== '1'
    )
  } catch {
    return false
  }
}

export function blockSplash(): void {
  try {
    localStorage.setItem(SPLASH_BLOCKED_KEY, '1')
    localStorage.setItem(SPLASH_PROMPT_ANSWERED_KEY, '1')
  } catch {
    /* localStorage unavailable */
  }
}

export function dismissSplashPrompt(): void {
  try {
    localStorage.setItem(SPLASH_PROMPT_ANSWERED_KEY, '1')
  } catch {
    /* localStorage unavailable */
  }
}
