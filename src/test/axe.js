import { configureAxe } from 'vitest-axe';

// Accessibility checker for tests. Color contrast is turned off here because the
// test browser (jsdom) can't measure colors; contrast is checked in a real browser instead.
export const axe = configureAxe({
  rules: { 'color-contrast': { enabled: false } },
});
