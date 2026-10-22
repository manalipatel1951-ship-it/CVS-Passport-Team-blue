import '@testing-library/jest-dom/vitest';
import * as axeMatchers from 'vitest-axe/matchers';
import { beforeEach, expect } from 'vitest';
import { DELAYS, DEMO } from '../config/demo.js';
import { CALL } from '../screens/Video.jsx';

// Adds expect(...).toHaveNoViolations() for accessibility checks.
expect.extend(axeMatchers);
// The test browser has no canvas; tell the accessibility checker so instead of logging errors.
HTMLCanvasElement.prototype.getContext = () => null;

// Skip the pretend waits (scanning, "typing…", approval, …) so tests run instantly.
Object.keys(DELAYS).forEach((key) => {
  DELAYS[key] = 0;
});
DELAYS.notice = 2000; // keep "Not part of this demo" up long enough to check
DELAYS.bannerVisible = 60000; // keep banners up long enough to check

// Video call: captions straight away, but don't hang up on its own during a test.
Object.assign(CALL, { firstCaption: 0, flipCamera: 0, secondCaption: 0, autoEnd: 60000 });

// No splash animation unless a test turns it on.
beforeEach(() => {
  DEMO.showSplash = false;
});
