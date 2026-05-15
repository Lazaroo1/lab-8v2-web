import { passwordStrength } from './passwordStrength'

describe('passwordStrength', () => {
  describe('strength tiers', () => {
    it('returns "vacía" for an empty password', () => {
      expect(passwordStrength('')).toBe('vacía')
    })

    it('returns "débil" for a 3 character password', () => {
      expect(passwordStrength('abc')).toBe('débil')
    })

    it('returns "débil" for a 7 character password', () => {
      expect(passwordStrength('abcdefg')).toBe('débil')
    })

    it('returns "media" for 8 characters without a number or symbol', () => {
      expect(passwordStrength('abcdefgh')).toBe('media')
    })

    it('returns "fuerte" for 8 characters with a number', () => {
      expect(passwordStrength('abcdefg1')).toBe('fuerte')
    })

    it('returns "muy fuerte" for 8 characters with a number and symbol', () => {
      expect(passwordStrength('abcdefg1!')).toBe('muy fuerte')
    })

    it('returns "muy fuerte" for uppercase letters, numbers, and symbols', () => {
      expect(passwordStrength('ABCDE123!')).toBe('muy fuerte')
    })

    it('returns "máximo" for mixed case, number, and symbol', () => {
      expect(passwordStrength('abcABC1!')).toBe('máximo')
    })

    it('returns "débil" for symbols only with fewer than 8 characters', () => {
      expect(passwordStrength('!@#')).toBe('débil')
    })

    it('counts spaces as characters', () => {
      expect(passwordStrength('ab cd ef1')).toBe('muy fuerte')
    })
  })

  describe('boundary behavior', () => {
    it('does not return "débil" for exactly 8 characters without a number', () => {
      expect(passwordStrength('abcdefgh')).not.toBe('débil')
      expect(passwordStrength('abcdefgh')).toBe('media')
    })

    it('does not return "media" for exactly 7 characters', () => {
      expect(passwordStrength('abcdefg')).not.toBe('media')
      expect(passwordStrength('abcdefg')).toBe('débil')
    })
  })

  describe('mixed case rule', () => {
    it('returns "muy fuerte" for lowercase with a number and symbol', () => {
      expect(passwordStrength('abcdefg1!')).toBe('muy fuerte')
    })

    it('returns "máximo" for uppercase and lowercase with a number and symbol', () => {
      expect(passwordStrength('Abcdefg1!')).toBe('máximo')
    })

    it('returns "muy fuerte" for uppercase only with a number and symbol', () => {
      expect(passwordStrength('ABCDEFG1!')).toBe('muy fuerte')
    })

    it('returns "máximo" for alternating uppercase and lowercase with a number and symbol', () => {
      expect(passwordStrength('AbCdEfG1!')).toBe('máximo')
    })
  })

  describe('mixed case bonus rule', () => {
    it('does not return "muy fuerte+" for lowercase with a number and symbol', () => {
      expect(passwordStrength('abcdefg1!')).not.toBe('muy fuerte+')
    })
  })
})
