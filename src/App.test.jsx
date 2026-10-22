import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from './test/axe.js';
import App from './App.jsx';

function start(hash = '#/') {
  window.location.hash = hash;
  render(<App />);
  return userEvent.setup();
}

async function addSarah(user, { manual = false } = {}) {
  await user.click(screen.getByRole('link', { name: 'Get started' }));
  await user.click(screen.getByRole('link', { name: /add someone/i }));
  await user.click(screen.getByRole('button', { name: 'Next' }));
  if (manual) {
    await user.click(screen.getByRole('link', { name: 'Fill it in myself' }));
    await user.click(screen.getByRole('button', { name: 'Add Sarah' }));
  } else {
    await user.click(screen.getByRole('button', { name: 'Scan ID' }));
    await user.click(await screen.findByRole('button', { name: 'Start face check' }));
    await user.click(await screen.findByRole('button', { name: 'Add Sarah' }));
  }
}

describe('the whole demo, end to end', () => {
  it('Flow 1 then Flow 2: add Sarah, chat, video, summary, back to dashboard', async () => {
    const user = start();
    await addSarah(user);

    // My Fam shows the confirmation and Sarah's avatar.
    expect(screen.getByText('Sarah has been added')).toBeInTheDocument();
    await user.click(screen.getByRole('link', { name: /sarah/i }));

    // Dashboard always says whose info this is.
    expect(screen.getByText("Viewing Sarah's dashboard as caregiver")).toBeInTheDocument();
    await user.click(screen.getByRole('link', { name: /talk to ai/i }));

    // Chat starts empty, then answers.
    expect(screen.getByRole('heading', { name: 'How can we help?' })).toBeInTheDocument();
    await user.type(screen.getByLabelText('Message'), 'She has a rash on her arm');
    await user.click(screen.getByRole('button', { name: 'Send' }));
    expect(await screen.findByText(/where on her body is the rash/i)).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Add a photo' }));
    expect(await screen.findByText(/that photo helps/i)).toBeInTheDocument();

    // Video visit, clearly labeled as AI.
    await user.click(screen.getByRole('link', { name: 'Video call' }));
    expect(screen.getByText(/show me where the rash is/i)).toBeInTheDocument();
    expect(screen.getByText(/not a real person/i)).toBeInTheDocument();
    await user.click(screen.getByRole('link', { name: 'End call' }));

    // Summary, then Close goes back to the dashboard.
    expect(screen.getByText(/sent to np/i)).toBeInTheDocument();
    expect(screen.getByText('Skin rash')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Close' }));
    expect(screen.getByRole('heading', { name: "Sarah's Dashboard" })).toBeInTheDocument();
  });

  it('"Fill it in myself" adds Sarah without scanning', async () => {
    const user = start();
    await addSarah(user, { manual: true });
    expect(screen.getByText('Sarah has been added')).toBeInTheDocument();
  });

  it('shows a hard-to-miss ER alert for emergencies', async () => {
    const user = start();
    await addSarah(user);
    await user.click(screen.getByRole('link', { name: /sarah/i }));
    await user.click(screen.getByRole('link', { name: /talk to ai/i }));
    await user.type(screen.getByLabelText('Message'), 'She has chest pain');
    await user.click(screen.getByRole('button', { name: 'Send' }));
    expect(await screen.findByRole('alert')).toHaveTextContent('Call 911 or go to the ER now');
  });

  it('the form asks for missing details', async () => {
    const user = start('#/fam/add');
    await user.clear(screen.getByLabelText('First name'));
    await user.click(screen.getByRole('button', { name: 'Next' }));
    expect(screen.getByText('Please enter a first name')).toBeInTheDocument();
  });

  it('Flow 2 is locked until Sarah has been added', () => {
    start('#/care/sarah/chat');
    expect(screen.getByRole('heading', { name: 'My Fam' })).toBeInTheDocument();
  });

  it('has no accessibility problems on the main screens', async () => {
    const user = start();
    await addSarah(user);
    expect(await axe(document.body)).toHaveNoViolations();
    await user.click(screen.getByRole('link', { name: /sarah/i }));
    expect(await axe(document.body)).toHaveNoViolations();
    await user.click(screen.getByRole('link', { name: /talk to ai/i }));
    await user.type(screen.getByLabelText('Message'), 'rash');
    await user.click(screen.getByRole('button', { name: 'Send' }));
    await screen.findByRole('link', { name: 'Video call' });
    expect(await axe(document.body)).toHaveNoViolations();
    await user.click(screen.getByRole('link', { name: 'Video call' }));
    expect(await axe(document.body)).toHaveNoViolations();
    await user.click(screen.getByRole('link', { name: 'End call' }));
    expect(await axe(document.body)).toHaveNoViolations();
  });
});
