# Password Strength Meter

## Description

Password Strength Meter is a Vite, React, and TypeScript project that evaluates password strength as the user types and displays the result with a visual progress indicator.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Lazaroo1/lab-8v2-web
cd lab-8v2-web
```

2. Install dependencies with Bun:

```bash
bun install
```

## Running Tests

Tests run with Vitest via:

```bash
bun run test
```

Note: `bun test` runs Bun's native test runner which does not support jsdom.
Use `bun run test` to run Vitest with the correct environment.
``` ```

## Running In Development

Start the development server:

```bash
bun run dev
```

## TDD Flow

The project follows a red-green-refactor workflow. Tests were written first and confirmed to fail, then the implementation was added and refined until the tests passed.

## Coverage

Run the coverage report:

```bash
bun run test:coverage
```

## Lint

Run ESLint:

```bash
bun run lint
```
