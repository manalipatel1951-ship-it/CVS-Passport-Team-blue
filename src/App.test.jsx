import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from './test/axe.js';
import App from './App.jsx';

function start(hash = '#/') {
  window.location.hash = hash;
  render(<App />);
  return userEvent.setup();
}

// Flow 1: who are you adding → found account → verify yourself → pick an icon → send request.
async function addSarah(user, { manual = false, icon } = {}) {
  await user.click(screen.getByRole('link', { name: 'Get started' }));
  await user.click(screen.getByRole('link', { name: /add someone/i }));
  expect(screen.getByRole('heading', { name: 'Who are you adding?' })).toBeInTheDocument();
  expect(screen.getByText('Step 1 of 3')).toBeInTheDocument();
  expect(screen.getByLabelText(/date of birth/i)).toHaveValue('04/12/1958');
  await user.click(screen.getByRole('button', { name: 'Next' }));
  expect(screen.getByText("We found Sarah's account")).toBeInTheDocument();
  expect(screen.getByText('Born April 1958')).toBeInTheDocument();
  await user.click(screen.getByRole('link', { name: "Yes, that's her" }));
  expect(screen.getByText('Step 2 of 3')).toBeInTheDocument();
  if (manual) {
    await user.click(screen.getByRole('button', { name: 'Verify another way' }));
    await user.click(screen.getByRole('link', { name: 'Enter your ID details manually' }));
    await user.click(screen.getByRole('button', { name: 'Verify me' }));
  } else {
    await user.click(screen.getByRole('button', { name: 'Scan front of ID' }));
    await user.click(await screen.findByRole('button', { name: 'Scan back of ID' }));
    await user.click(await screen.findByRole('button', { name: 'Take selfie' }));
  }
  expect(await screen.findByRole('heading', { name: "You're verified" })).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: 'Back' })).not.toBeInTheDocument();
  if (icon) await user.click(screen.getByRole('radio', { name: icon }));
  await user.click(screen.getByRole('button', { name: 'Send request to Sarah' }));
}

async function openSarahsHealth(user) {
  await user.click(await screen.findByRole('link', { name: /sarah.*full access/i }));
}

describe('the whole demo, end to end', () => {
  it('Flow 1, then the rash visit: message, photo + caption, video, summary, Previous visits', async () => {
    const user = start();
    await addSarah(user);

    // My Fam: Sarah approves after a moment, then she's tappable.
    expect(await screen.findByText('Sarah approved your access')).toBeInTheDocument();
    await openSarahsHealth(user);
    expect(screen.getByRole('heading', { name: "Sarah's Health" })).toBeInTheDocument();
    await user.click(screen.getByRole('link', { name: 'Start a MinuteTwin visit' }));

    // Chat: greeting says it's AI; the first message is pre-typed.
    expect(screen.getByText(/I'm AI, not a real person/)).toBeInTheDocument();
    expect(screen.getByText('For emergencies, call 911.')).toBeInTheDocument();
    expect(screen.getByLabelText('Message')).toHaveValue(
      'Hi, my mother Sarah has a rash on her left upper arm.',
    );
    await user.click(screen.getByRole('button', { name: 'Send' }));
    expect(await screen.findByText(/Could you send a photo of the rash/)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Start video call' })).not.toBeInTheDocument();

    // Photo + pre-filled caption, sent together.
    await user.click(screen.getByRole('button', { name: 'Add a photo' }));
    expect(screen.getByLabelText('Message')).toHaveValue(
      "Started yesterday and it's really itchy. No fever. She switched detergents last week.",
    );
    await user.click(screen.getByRole('button', { name: 'Send' }));
    await user.click(await screen.findByRole('button', { name: 'Start video call' }));

    // Video: labeled as AI, never a nurse. End call → preparing → summary.
    expect(screen.getByText(/minutetwin \(ai\)\. not a real person/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/I'll put together Sarah's visit summary now/),
    ).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'End call' }));

    expect(
      await screen.findByRole('heading', { name: 'Likely contact dermatitis' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Photo and video reviewed')).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'When to get more care' })).toBeInTheDocument();
    expect(screen.getByText(/this is not a diagnosis/i)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Close' }));
    expect(screen.getByRole('heading', { name: "Sarah's Health" })).toBeInTheDocument();
    expect(screen.getByText('Visit summary saved')).toBeInTheDocument();
    await user.click(screen.getByRole('link', { name: /previous visits/i }));
    expect(
      screen.getByText('MinuteTwin visit today: rash. Summary sent to NP.'),
    ).toBeInTheDocument();
  });

  it('"Verify another way" lets the caregiver enter their ID details', async () => {
    const user = start();
    await addSarah(user, { manual: true });
    expect(await screen.findByText('Sarah approved your access')).toBeInTheDocument();
  });

  it('uses the icon picked for Sarah everywhere', async () => {
    const user = start();
    await addSarah(user, { icon: 'Moon' });
    await openSarahsHealth(user);
    expect(screen.getByRole('link', { name: /switch profile/i })).toBeInTheDocument();
  });

  it('My Fam: You tile first, the picker opens Sarah’s visit, header icons are demo-only', async () => {
    const user = start();
    await addSarah(user);
    await screen.findByText('Sarah approved your access');
    const tiles = screen.getAllByRole('listitem');
    expect(tiles[0]).toHaveTextContent('You');
    expect(screen.getByText('Add a parent or anyone you care for')).toBeInTheDocument();
    expect(screen.queryByText(/AI NP/)).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Cart' }));
    expect(screen.getByText('Not part of this demo')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Start a MinuteTwin visit' }));
    const sheet = screen.getByRole('dialog', { name: 'Who needs care?' });
    await user.click(within(sheet).getByRole('button', { name: /sarah/i }));
    expect(screen.getByText(/What's going on with Sarah today/)).toBeInTheDocument();
  });

  it('quick start "Cold or flu" follows the cold path to a summary card', async () => {
    const user = start();
    await addSarah(user);
    await openSarahsHealth(user);
    await user.click(screen.getByRole('link', { name: 'Start a MinuteTwin visit' }));
    await user.click(screen.getByRole('button', { name: 'Cold or flu' }));
    expect(screen.getByLabelText('Message')).toHaveValue(
      'Hi, my mother Sarah has a cough and a runny nose.',
    );
    await user.click(screen.getByRole('button', { name: 'Send' }));
    await screen.findByText(/coughing anything up/);
    await user.click(screen.getByRole('button', { name: 'Send' }));
    await user.click(await screen.findByRole('link', { name: 'View summary' }));
    expect(screen.getByRole('heading', { name: 'Likely common cold' })).toBeInTheDocument();
  });

  it('replies naturally when nothing matches, and shows 911 only when typed', async () => {
    const user = start();
    await addSarah(user);
    await openSarahsHealth(user);
    await user.click(screen.getByRole('link', { name: 'Start a MinuteTwin visit' }));
    await user.click(screen.getByRole('button', { name: 'Something else' }));
    await user.type(screen.getByLabelText('Message'), 'She seems off today');
    await user.click(screen.getByRole('button', { name: 'Send' }));
    await screen.findByText(/what Sarah is experiencing/);
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    await user.type(screen.getByLabelText('Message'), 'Now she has chest pain');
    await user.click(screen.getByRole('button', { name: 'Send' }));
    expect(await screen.findByRole('alert')).toHaveTextContent('Call 911 or go to the ER now');
  });

  it('the form asks for missing details and a US date', async () => {
    const user = start('#/fam/add');
    await user.clear(screen.getByLabelText('First name'));
    await user.clear(screen.getByLabelText(/date of birth/i));
    await user.type(screen.getByLabelText(/date of birth/i), '0412');
    await user.click(screen.getByRole('button', { name: 'Next' }));
    expect(screen.getByText('Please enter a first name')).toBeInTheDocument();
    expect(screen.getByText('Please enter a date like 04/12/1958')).toBeInTheDocument();
  });

  it('MinuteTwin is locked until Sarah has been added and approved', () => {
    start('#/care/sarah/chat');
    expect(screen.getByRole('heading', { name: 'My Fam' })).toBeInTheDocument();
  });

  it('has no accessibility problems on the main screens', async () => {
    const user = start();
    await user.click(screen.getByRole('link', { name: 'Get started' }));
    expect(await axe(document.body)).toHaveNoViolations();
    await user.click(screen.getByRole('link', { name: /add someone/i }));
    expect(await axe(document.body)).toHaveNoViolations();
    await user.click(screen.getByRole('button', { name: 'Next' }));
    expect(await axe(document.body)).toHaveNoViolations();
    await user.click(screen.getByRole('link', { name: "Yes, that's her" }));
    expect(await axe(document.body)).toHaveNoViolations();
    await user.click(screen.getByRole('button', { name: 'Scan front of ID' }));
    await user.click(await screen.findByRole('button', { name: 'Scan back of ID' }));
    await user.click(await screen.findByRole('button', { name: 'Take selfie' }));
    await screen.findByRole('heading', { name: "You're verified" });
    expect(await axe(document.body)).toHaveNoViolations();
    await user.click(screen.getByRole('button', { name: 'Send request to Sarah' }));
    await screen.findByText('Sarah approved your access');
    expect(await axe(document.body)).toHaveNoViolations();
    await openSarahsHealth(user);
    expect(await axe(document.body)).toHaveNoViolations();
    await user.click(screen.getByRole('link', { name: 'Start a MinuteTwin visit' }));
    expect(await axe(document.body)).toHaveNoViolations();
    await user.click(screen.getByRole('button', { name: 'Send' }));
    await screen.findByText(/send a photo/);
    await user.click(screen.getByRole('button', { name: 'Add a photo' }));
    await user.click(screen.getByRole('button', { name: 'Send' }));
    await user.click(await screen.findByRole('button', { name: 'Start video call' }));
    expect(await axe(document.body)).toHaveNoViolations();
    await user.click(screen.getByRole('button', { name: 'End call' }));
    await screen.findByRole('heading', { name: 'Likely contact dermatitis' });
    expect(await axe(document.body)).toHaveNoViolations();
    await user.click(screen.getByRole('button', { name: 'Close' }));
    expect(await axe(document.body)).toHaveNoViolations();
  });
});
