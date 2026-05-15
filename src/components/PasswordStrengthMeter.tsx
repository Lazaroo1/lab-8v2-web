import { useState } from 'react'
import { passwordStrength, type PasswordStrength } from '../utils/passwordStrength'

function progressValueFor(strength: PasswordStrength): number {
  switch (strength) {
    case 'débil':
      return 1
    case 'media':
      return 2
    case 'fuerte':
      return 3
    case 'muy fuerte':
      return 4
    case 'máximo':
      return 5
    default:
      return 0
  }
}

export default function PasswordStrengthMeter() {
  const [password, setPassword] = useState('')
  const strength = passwordStrength(password)
  const progressValue = progressValueFor(strength)

  return (
    <div>
      <label htmlFor="password">Contraseña</label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <p role="status">{strength}</p>
      <progress max={5} value={progressValue} />
    </div>
  )
}
