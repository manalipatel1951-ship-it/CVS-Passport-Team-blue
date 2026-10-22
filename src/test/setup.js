import '@testing-library/jest-dom/vitest';
import * as axeMatchers from 'vitest-axe/matchers';
import { expect } from 'vitest';

// Adds expect(...).toHaveNoViolations() for accessibility checks.
expect.extend(axeMatchers);
