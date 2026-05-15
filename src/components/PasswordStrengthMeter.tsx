import { useState } from 'react'
import { passwordStrength } from '../utils/passwordStrength'

export default function PasswordStrengthMeter() {
  const [password, setPassword] = useState('')
  const strength = passwordStrength(password)

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
    </div>
  )
}
