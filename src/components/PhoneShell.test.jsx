import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from '../test/axe.js';
import PhoneShell from './PhoneShell.jsx';
import { renderWithRouter } from '../test/renderWithRouter.jsx';

describe('PhoneShell', () => {
  it('shows the screen title and a Back button', () => {
    renderWithRouter(<PhoneShell title="My Fam">content</PhoneShell>);
    expect(screen.getByRole('heading', { name: 'My Fam' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Back' })).toBeInTheDocument();
  });

  it('Back goes to the screen it is given', async () => {
    renderWithRouter(<PhoneShell title="Form" back="/fam" />, {
      path: '/form',
      routes: { '/fam': <p>My Fam screen</p> },
    });
    await userEvent.click(screen.getByRole('button', { name: 'Back' }));
    expect(screen.getByText('My Fam screen')).toBeInTheDocument();
  });

  it('can hide Back on the very first screen', () => {
    renderWithRouter(<PhoneShell title="Welcome" back={false} />);
    expect(screen.queryByRole('button', { name: 'Back' })).not.toBeInTheDocument();
  });

  it('has no accessibility problems', async () => {
    const { container } = renderWithRouter(
      <PhoneShell title="My Fam" footer={<nav aria-label="Main">nav</nav>}>
        <p>content</p>
      </PhoneShell>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
