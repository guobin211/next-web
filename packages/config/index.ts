export function getCDNPath(pkg: Record<string, any>): string {
  const { name, version, cdn } = pkg || {};
  return `${cdn || 'https://unpkg.com'}/${name}@${version}`;
}
