export type PasswordStrength = 'vacía' | 'débil' | 'media' | 'fuerte' | 'muy fuerte' | 'máximo'

export function passwordStrength(password: string): PasswordStrength {
  if (password.length === 0) {
    return 'vacía'
  }

  if (password.length < 8) {
    return 'débil'
  }

  const hasNumber = /\d/.test(password)
  const hasSymbol = /[^a-zA-Z0-9]/.test(password)
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)

  if (hasNumber && hasSymbol && hasUppercase && hasLowercase) {
    return 'máximo'
  }

  if (hasNumber && hasSymbol) {
    return 'muy fuerte'
  }

  if (hasNumber) {
    return 'fuerte'
  }

  return 'media'
}
