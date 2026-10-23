import type {TestingLibraryMatchers, TestningLibraryMatchers} from '@testing-library/jest-dom/matchers';
import type { expect } from 'vitest';

declare module 'vitest' {
    interface Assertion<T = any> extends TestingLibraryMatchers<typeof expect.stringContaining, T> {}
    interface AsymmetricMacthersContaining extends TestingLibraryMatchers<typeof expect.stringContaining, any> {}
}