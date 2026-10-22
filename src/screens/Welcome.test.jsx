import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from '../test/axe.js';
import Welcome from './Welcome.jsx';
import { renderWithRouter } from '../test/renderWithRouter.jsx';

describe('Welcome screen', () => {
  it('shows the CVS Health logo and the Concept prototype label', () => {
    renderWithRouter(<Welcome />);
    expect(screen.getByRole('img', { name: 'CVS Health' })).toBeInTheDocument();
    expect(screen.getByText('Concept prototype')).toBeInTheDocument();
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

  it('has no accessibility problems', async () => {
    const { container } = renderWithRouter(<Welcome />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
