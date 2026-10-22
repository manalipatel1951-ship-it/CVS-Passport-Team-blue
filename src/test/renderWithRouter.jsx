import { render } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

/**
 * Renders a screen inside a router for tests.
 * `routes` maps extra paths to simple stand-ins so tests can check where a button leads.
 */
export function renderWithRouter(ui, { path = '/', routes = {} } = {}) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path={path} element={ui} />
        {Object.entries(routes).map(([p, el]) => (
          <Route key={p} path={p} element={el} />
        ))}
      </Routes>
    </MemoryRouter>,
  );
}
