export function expiry() {
  return (new Date()).getTime() / 1000 + 60 * 15 // 15 minutes
}
