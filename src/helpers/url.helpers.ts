export function replaceRegionInUrl(url: string, region: string) {
  return url.replace(/--insert/, `--${region}`);
}
