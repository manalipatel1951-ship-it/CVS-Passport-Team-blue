import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from './test/axe.js';
import App from './App.jsx';

function start(hash = '#/') {
  window.location.hash = hash;
  render(<App />);
  return userEvent.setup();
}

// Flow 1: add Sarah, verify the caregiver, send the request, wait for Sarah to approve.
async function addSarah(user, { manual = false } = {}) {
  await user.click(screen.getByRole('link', { name: 'Get started' }));
  await user.click(screen.getByRole('link', { name: /add someone/i }));
  expect(screen.getByText(/step 1 of 3/i)).toBeInTheDocument();
  await user.click(screen.getByRole('button', { name: 'Next' }));
  expect(screen.getByText(/step 2 of 3/i)).toBeInTheDocument();
  if (manual) {
    await user.click(screen.getByRole('link', { name: 'Fill it in myself' }));
    await user.click(screen.getByRole('button', { name: 'Verify me' }));
  } else {
    await user.click(screen.getByRole('button', { name: 'Scan front of ID' }));
    await user.click(await screen.findByRole('button', { name: 'Scan back of ID' }));
    await user.click(await screen.findByRole('button', { name: 'Take selfie' }));
  }
  expect(await screen.findByRole('heading', { name: "You're verified" })).toBeInTheDocument();
  await user.click(screen.getByRole('button', { name: 'Send request to Sarah' }));
}

async function openMinuteTwin(user) {
  await user.click(await screen.findByRole('link', { name: /sarah.*full access/i }));
  await user.click(screen.getByRole('link', { name: 'Start a MinuteTwin visit' }));
}

// Taps Send on whatever is pre-typed and waits for MinuteTwin's reply.
async function sendPrefilled(user, expectedReply) {
  await user.click(screen.getByRole('button', { name: 'Send' }));
  return screen.findByText(expectedReply);
}

describe('the whole demo, end to end', () => {
  it('Flow 1 then the full rash script: chat, photo, video, summary, Previous visits', async () => {
    const user = start();
    await addSarah(user);

    // My Fam: Sarah approves after a moment, then she's tappable.
    expect(await screen.findByText('Sarah approved your access')).toBeInTheDocument();
    await openMinuteTwin(user);

    expect(screen.getByRole('heading', { name: 'How can we help?' })).toBeInTheDocument();
    expect(screen.getByLabelText('Message')).toHaveValue(
      'Hi, my mother Sarah has a rash on her left upper arm.',
    );
    expect(screen.queryByRole('button', { name: /video call/i })).not.toBeInTheDocument();

    await sendPrefilled(user, /left upper arm, got it/);
    await sendPrefilled(user, /new soaps, lotions/);
    await sendPrefilled(user, /send a photo of the rash/);
    await user.click(screen.getByRole('button', { name: 'Send a photo' }));
    await user.click(await screen.findByRole('button', { name: 'Start video call' }));

    // Video: labeled as AI, never a nurse. End call returns to the chat.
    expect(screen.getByText(/minutetwin \(ai\)\. not a real person/i)).toBeInTheDocument();
    expect(await screen.findByText(/rash on Sarah's left upper arm/)).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'End call' }));

    expect(await screen.findByText(/contact dermatitis, a skin reaction/)).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'When to get more care' })).toBeInTheDocument();
    await sendPrefilled(user, /hope Sarah feels better soon/);

    await user.click(screen.getByRole('link', { name: 'View full summary' }));
    expect(screen.getByRole('heading', { name: 'Likely contact dermatitis' })).toBeInTheDocument();
    expect(screen.getByText('Switched laundry detergent last week')).toBeInTheDocument();
    expect(screen.getByText(/this is not a diagnosis/i)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Close' }));
    expect(screen.getByRole('heading', { name: "Sarah's Health" })).toBeInTheDocument();
    expect(screen.getByText('New')).toBeInTheDocument();
    await user.click(screen.getByRole('link', { name: /previous visits/i }));
    expect(
      screen.getByText('MinuteTwin visit today: rash. Summary sent to NP.'),
    ).toBeInTheDocument();
  });

  it('"Fill it in myself" verifies the caregiver without scanning', async () => {
    const user = start();
    await addSarah(user, { manual: true });
    expect(await screen.findByText('Sarah approved your access')).toBeInTheDocument();
  });

  it('follows another path when the message is not about a rash', async () => {
    const user = start();
    await addSarah(user);
    await openMinuteTwin(user);
    await user.clear(screen.getByLabelText('Message'));
    await user.type(screen.getByLabelText('Message'), 'She has a bad cough');
    await sendPrefilled(user, /coughing anything up/);
  });

  it('replies naturally when nothing matches, and shows 911 only when typed', async () => {
    const user = start();
    await addSarah(user);
    await openMinuteTwin(user);
    await user.clear(screen.getByLabelText('Message'));
    await user.type(screen.getByLabelText('Message'), 'She seems off today');
    await sendPrefilled(user, /what Sarah is experiencing/);
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    await user.type(screen.getByLabelText('Message'), 'Now she has chest pain');
    await user.click(screen.getByRole('button', { name: 'Send' }));
    expect(await screen.findByRole('alert')).toHaveTextContent('Call 911 or go to the ER now');
  });

  it('the form asks for missing details', async () => {
    const user = start('#/fam/add');
    await user.clear(screen.getByLabelText('First name'));
    await user.click(screen.getByRole('button', { name: 'Next' }));
    expect(screen.getByText('Please enter a first name')).toBeInTheDocument();
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
    await user.click(screen.getByRole('button', { name: 'Scan front of ID' }));
    await user.click(await screen.findByRole('button', { name: 'Scan back of ID' }));
    await user.click(await screen.findByRole('button', { name: 'Take selfie' }));
    await screen.findByRole('heading', { name: "You're verified" });
    expect(await axe(document.body)).toHaveNoViolations();
    await user.click(screen.getByRole('button', { name: 'Send request to Sarah' }));
    await screen.findByText('Sarah approved your access');
    expect(await axe(document.body)).toHaveNoViolations();
    await openMinuteTwin(user);
    await sendPrefilled(user, /left upper arm, got it/);
    expect(await axe(document.body)).toHaveNoViolations();
    await sendPrefilled(user, /new soaps/);
    await sendPrefilled(user, /send a photo/);
    await user.click(screen.getByRole('button', { name: 'Send a photo' }));
    await user.click(await screen.findByRole('button', { name: 'Start video call' }));
    expect(await axe(document.body)).toHaveNoViolations();
    await user.click(screen.getByRole('button', { name: 'End call' }));
    await screen.findByText(/contact dermatitis, a skin reaction/);
    await sendPrefilled(user, /feels better soon/);
    await user.click(screen.getByRole('link', { name: 'View full summary' }));
    expect(await axe(document.body)).toHaveNoViolations();
    await user.click(screen.getByRole('button', { name: 'Close' }));
    expect(await axe(document.body)).toHaveNoViolations();
  });
});
