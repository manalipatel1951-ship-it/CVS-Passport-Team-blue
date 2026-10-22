import { render } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AppStateProvider } from '../state/AppState.jsx';

/**
 * Renders a screen inside the app's memory and a router, for tests.
 * `routes` maps extra paths to simple stand-ins so tests can check where a button leads.
 */
export function renderWithRouter(ui, { path = '/', routes = {} } = {}) {
  return render(
    <AppStateProvider>
      <MemoryRouter
        initialEntries={[path]}
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <Routes>
          <Route path={path} element={ui} />
          {Object.entries(routes).map(([p, el]) => (
            <Route key={p} path={p} element={el} />
          ))}
        </Routes>
      </MemoryRouter>
    </AppStateProvider>,
  );
}
