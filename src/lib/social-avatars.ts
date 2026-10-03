export function getGithubUsername(githubUrl: string) {
  return githubUrl.replace(/\/$/, '').split('/').pop() ?? ''
}
