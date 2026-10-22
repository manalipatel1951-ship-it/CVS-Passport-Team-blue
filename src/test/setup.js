import '@testing-library/jest-dom/vitest';
import * as axeMatchers from 'vitest-axe/matchers';
import { expect } from 'vitest';

// Adds expect(...).toHaveNoViolations() for accessibility checks.
expect.extend(axeMatchers);

// Skip the pretend waits (scanning, "typing…") so tests run instantly.
import { DELAYS } from '../config/demo.js';
DELAYS.scan = 0;
DELAYS.typing = 0;
DELAYS.approval = 0;
DELAYS.caption = 0;
DELAYS.flipCamera = 0;
