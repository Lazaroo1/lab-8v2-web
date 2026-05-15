import 'vitest'

declare module 'vitest' {
  interface Assertion<T = unknown> {
    toBeInTheDocument(): T
    toHaveAttribute(name: string, expectedValue?: string): T
    toHaveTextContent(expectedText: string): T
  }

  interface AsymmetricMatchersContaining {
    toBeInTheDocument(): unknown
    toHaveAttribute(name: string, expectedValue?: string): unknown
    toHaveTextContent(expectedText: string): unknown
  }
}
