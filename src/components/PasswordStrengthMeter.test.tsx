import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PasswordStrengthMeter from './PasswordStrengthMeter'

describe('PasswordStrengthMeter', () => {
  describe('rendering', () => {
    it('renders a password input', () => {
      render(<PasswordStrengthMeter />)

      expect(screen.getByLabelText(/contraseña/i)).toHaveAttribute('type', 'password')
    })

    it('renders the strength indicator with initial text "vacía"', () => {
      render(<PasswordStrengthMeter />)

      expect(screen.getByRole('status')).toHaveTextContent('vacía')
    })
  })

  describe('behavior', () => {
    it('shows "débil" after typing a short password', async () => {
      const user = userEvent.setup()
      render(<PasswordStrengthMeter />)

      await user.type(screen.getByLabelText(/contraseña/i), 'abc')

      expect(screen.getByRole('status')).toHaveTextContent('débil')
    })

    it('shows "media" after typing 8 or more characters without numbers or symbols', async () => {
      const user = userEvent.setup()
      render(<PasswordStrengthMeter />)

      await user.type(screen.getByLabelText(/contraseña/i), 'abcdefgh')

      expect(screen.getByRole('status')).toHaveTextContent('media')
    })

    it('shows "fuerte" after typing 8 or more characters with a number', async () => {
      const user = userEvent.setup()
      render(<PasswordStrengthMeter />)

      await user.type(screen.getByLabelText(/contraseña/i), 'abcdefg1')

      expect(screen.getByRole('status')).toHaveTextContent('fuerte')
    })

    it('shows "muy fuerte" after typing 8 or more characters with a number and symbol', async () => {
      const user = userEvent.setup()
      render(<PasswordStrengthMeter />)

      await user.type(screen.getByLabelText(/contraseña/i), 'abcdefg1!')

      expect(screen.getByRole('status')).toHaveTextContent('muy fuerte')
    })

    it('shows "máximo" after typing mixed case with a number and symbol', async () => {
      const user = userEvent.setup()
      render(<PasswordStrengthMeter />)

      await user.type(screen.getByLabelText(/contraseña/i), 'Abcdefg1!')

      expect(screen.getByRole('status')).toHaveTextContent('máximo')
    })

    it('shows "vacía" again after clearing the input', async () => {
      const user = userEvent.setup()
      render(<PasswordStrengthMeter />)
      const passwordInput = screen.getByLabelText(/contraseña/i)

      await user.type(passwordInput, 'abcdefg1!')
      await user.clear(passwordInput)

      expect(screen.getByRole('status')).toHaveTextContent('vacía')
    })
  })

  describe('progress bar', () => {
    it('shows value 0 when strength is "vacía"', () => {
      render(<PasswordStrengthMeter />)

      expect(screen.getByRole('progressbar')).toHaveAttribute('value', '0')
    })

    it('shows 1 out of 5 when strength is "débil"', async () => {
      const user = userEvent.setup()
      render(<PasswordStrengthMeter />)

      await user.type(screen.getByLabelText(/contraseña/i), 'abc')

      expect(screen.getByRole('progressbar')).toHaveAttribute('value', '1')
    })

    it('shows 2 out of 5 when strength is "media"', async () => {
      const user = userEvent.setup()
      render(<PasswordStrengthMeter />)

      await user.type(screen.getByLabelText(/contraseña/i), 'abcdefgh')

      expect(screen.getByRole('progressbar')).toHaveAttribute('value', '2')
    })

    it('shows 3 out of 5 when strength is "fuerte"', async () => {
      const user = userEvent.setup()
      render(<PasswordStrengthMeter />)

      await user.type(screen.getByLabelText(/contraseña/i), 'abcdefg1')

      expect(screen.getByRole('progressbar')).toHaveAttribute('value', '3')
    })

    it('shows 4 out of 5 when strength is "muy fuerte"', async () => {
      const user = userEvent.setup()
      render(<PasswordStrengthMeter />)

      await user.type(screen.getByLabelText(/contraseña/i), 'abcdefg1!')

      expect(screen.getByRole('progressbar')).toHaveAttribute('value', '4')
    })

    it('shows 5 out of 5 when strength is "máximo"', async () => {
      const user = userEvent.setup()
      render(<PasswordStrengthMeter />)

      await user.type(screen.getByLabelText(/contraseña/i), 'Abcdefg1!')

      expect(screen.getByRole('progressbar')).toHaveAttribute('value', '5')
    })
  })

  describe('edge cases', () => {
    it('does not show "débil" for exactly 8 characters without a number', async () => {
      const user = userEvent.setup()
      render(<PasswordStrengthMeter />)

      await user.type(screen.getByLabelText(/contraseña/i), 'abcdefgh')

      expect(screen.getByRole('status')).not.toHaveTextContent('débil')
      expect(screen.getByRole('status')).toHaveTextContent('media')
    })

    it('does not show "media" for exactly 7 characters', async () => {
      const user = userEvent.setup()
      render(<PasswordStrengthMeter />)

      await user.type(screen.getByLabelText(/contraseña/i), 'abcdefg')

      expect(screen.getByRole('status')).not.toHaveTextContent('media')
      expect(screen.getByRole('status')).toHaveTextContent('débil')
    })

    it('shows "débil" for only symbols with fewer than 8 characters', async () => {
      const user = userEvent.setup()
      render(<PasswordStrengthMeter />)

      await user.type(screen.getByLabelText(/contraseña/i), '!@#')

      expect(screen.getByRole('status')).toHaveTextContent('débil')
    })
  })

  describe('accessibility', () => {
    it('makes the password input accessible by label text', () => {
      render(<PasswordStrengthMeter />)

      expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument()
    })
  })
})
