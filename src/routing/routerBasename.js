export function getRouterBasename(publicUrl) {
  if (!publicUrl) {
    return '/';
  }
  if (publicUrl.endsWith('/')) {
    return publicUrl.slice(0, -1);
  }
  return publicUrl;
}
