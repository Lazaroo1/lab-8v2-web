export function passwordStrength(password: string): string {
  if (password.length === 0) {
    return 'vacía'
  }

  if (password.length < 8) {
    return 'débil'
  }

  const hasNumber = /\d/.test(password)
  const hasSymbol = /[^a-zA-Z0-9]/.test(password)

  if (hasNumber && hasSymbol) {
    return 'muy fuerte'
  }

  if (hasNumber) {
    return 'fuerte'
  }

  return 'media'
}
