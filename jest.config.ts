import type { Config } from 'jest'

const config: Config = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: { jsx: 'react-jsx' } }],
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^next/image$': '<rootDir>/__mocks__/nextImage.tsx',
    '\\.(png|jpg|jpeg|svg|gif)$': '<rootDir>/__mocks__/fileMock.ts',
  },
}
export default config
