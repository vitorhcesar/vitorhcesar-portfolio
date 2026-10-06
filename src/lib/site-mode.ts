export function isCurriculumMode(): boolean {
  return import.meta.env.VITE_CURRICULUM_MODE === 'true'
}

export function isCurriculumModeServer(): boolean {
  return process.env.CURRICULUM_MODE === 'true'
}
