import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from '../test/axe.js';
import Welcome from './Welcome.jsx';
import { renderWithRouter } from '../test/renderWithRouter.jsx';
import { DEMO } from '../config/demo.js';

describe('Welcome screen', () => {
  it('shows the CVS Health logo, the Concept prototype label and the four benefits', () => {
    renderWithRouter(<Welcome />);
    expect(screen.getByRole('img', { name: 'CVS Health' })).toBeVisible();
    expect(screen.getByText('Concept prototype')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Caregiver Passport' })).toBeInTheDocument();
    expect(screen.getByText(/MinuteTwin, our AI care assistant/)).toBeInTheDocument();
    expect(
      screen.getByText('Your loved one stays in control of what you can see'),
    ).toBeInTheDocument();
    expect(screen.queryByText(/AI NP|nurse/i)).not.toBeInTheDocument();
  });

  it('has no Back button because it is the first screen', () => {
    renderWithRouter(<Welcome />);
    expect(screen.queryByRole('button', { name: 'Back' })).not.toBeInTheDocument();
  });

  it('Get started goes to My Fam', async () => {
    renderWithRouter(<Welcome />, { routes: { '/fam': <p>My Fam screen</p> } });
    await userEvent.click(screen.getByRole('link', { name: 'Get started' }));
    expect(screen.getByText('My Fam screen')).toBeInTheDocument();
  });

  it('plays the splash first, and a tap skips it', async () => {
    DEMO.showSplash = true;
    renderWithRouter(<Welcome />);
    const splash = screen.getByTestId('splash');
    expect(screen.getByAltText('CVS Health')).not.toBeVisible();
    await userEvent.click(splash);
    expect(screen.queryByTestId('splash')).not.toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'CVS Health' })).toBeVisible();
  });

  it('has no accessibility problems', async () => {
    const { container } = renderWithRouter(<Welcome />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
