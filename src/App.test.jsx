import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from './test/axe.js';
import App from './App.jsx';

function start(hash = '#/') {
  window.location.hash = hash;
  render(<App />);
  return userEvent.setup();
}

// Verify it's you: front → back → selfie (liveness) → success screen.
async function scanAndSelfie(user) {
  await user.click(screen.getByRole('button', { name: 'Scan front' }));
  await user.click(await screen.findByRole('button', { name: 'Scan back' }));
  expect(await screen.findByText('Movement detected')).toBeInTheDocument();
  // On the selfie step, only "Verify in store" is offered.
  expect(screen.queryByRole('link', { name: 'Enter manually' })).not.toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Verify in store' })).toBeInTheDocument();
  await user.click(screen.getByRole('button', { name: 'Take selfie' }));
}

// Flow 1: who are you adding → is this Sarah? → verify yourself → pick an icon → send request.
async function addSarah(user, { manual = false, icon } = {}) {
  await user.click(screen.getByRole('link', { name: 'Get started' }));
  await user.click(screen.getByRole('link', { name: /add someone/i }));
  expect(screen.getByRole('heading', { name: 'Who are you adding?' })).toBeInTheDocument();
  expect(screen.getByText('Step 1 of 3')).toBeInTheDocument();
  expect(screen.getByLabelText(/date of birth/i)).toHaveValue('04/12/1958');
  await user.click(screen.getByRole('button', { name: 'Next' }));
  expect(screen.getByRole('heading', { name: 'Is this Sarah?' })).toBeInTheDocument();
  expect(await screen.findByText("We found Sarah's account")).toBeInTheDocument();
  expect(screen.getByText('Born April 1958')).toBeInTheDocument();
  expect(screen.getByText('Chicago, IL area')).toBeInTheDocument();
  await user.click(screen.getByRole('link', { name: "Yes, that's her" }));
  expect(screen.getByText('Step 2 of 3')).toBeInTheDocument();
  if (manual) {
    await user.click(screen.getByRole('link', { name: 'Enter manually' }));
    await user.click(screen.getByRole('button', { name: 'Verify me' }));
  } else {
    await scanAndSelfie(user);
  }
  expect(await screen.findByRole('heading', { name: "You're verified" })).toBeInTheDocument();
  expect(
    screen.getByText(manual ? 'ID details matched' : 'ID and selfie matched'),
  ).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: 'Back' })).not.toBeInTheDocument();
  if (icon) await user.click(screen.getByRole('radio', { name: icon }));
  await user.click(screen.getByRole('button', { name: 'Send request to Sarah' }));
}

const sarahTile = () => screen.findByRole('link', { name: /sarah.*full access/i });

async function openSarahsHealth(user) {
  await user.click(await sarahTile());
}

describe('the whole demo, end to end', () => {
  it('Flow 1, then the rash visit: message, photo + caption, video, summary, Previous visits', async () => {
    const user = start();
    await addSarah(user);

    // My Fam: Pending first, then Sarah approves after a moment and becomes tappable.
    expect(await screen.findByText('Sarah approved your access')).toBeInTheDocument();
    await openSarahsHealth(user);
    expect(screen.getByRole('heading', { name: "Sarah's Health" })).toBeInTheDocument();
    await user.click(screen.getByRole('link', { name: 'Start a MinuteTwin visit' }));

    // Chat: greeting says it's AI; quick starts are all outlined; the first message is pre-typed.
    expect(screen.getByText(/I'm AI, not a real person/)).toBeInTheDocument();
    expect(screen.getByText('For emergencies, call 911.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Rash or skin issue' })).toHaveAttribute(
      'aria-pressed',
      'false',
    );
    expect(screen.getByLabelText('Message')).toHaveValue(
      'Hi, my mother Sarah has a rash on her left upper arm.',
    );
    await user.click(screen.getByRole('button', { name: 'Send' }));
    expect(await screen.findByText(/Could you send a photo of the rash/)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Rash or skin issue' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Start video call' })).not.toBeInTheDocument();

    // Photo + pre-filled caption, sent together; then the medication card and video call.
    await user.click(screen.getByRole('button', { name: 'Add a photo' }));
    expect(screen.getByLabelText('Message')).toHaveValue(
      "Started yesterday and it's really itchy. No fever. She switched detergents last week.",
    );
    await user.click(screen.getByRole('button', { name: 'Send' }));
    expect(
      await screen.findByText("Checked Sarah's medications: no recent changes."),
    ).toBeInTheDocument();
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
    expect(screen.getByText('Thu, Oct 22, 2026, 2:15 PM')).toBeInTheDocument();
    expect(screen.getByText('NP review: Pending')).toBeInTheDocument();
    expect(screen.getByText('Photo and video reviewed')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /find hydrocortisone cream at cvs pharmacy/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'When to get more care' })).toBeInTheDocument();
    expect(screen.getByText(/this is not a diagnosis/i)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Close' }));
    expect(screen.getByRole('heading', { name: "Sarah's Health" })).toBeInTheDocument();
    expect(screen.getByText('Visit summary saved')).toBeInTheDocument();
    await user.click(screen.getByRole('link', { name: /previous visits/i }));
    expect(
      screen.getByText('MinuteTwin visit, Oct 22, 2:15 PM: rash. Summary sent to NP.'),
    ).toBeInTheDocument();
  });

  it('"Enter manually" lets the caregiver type their ID details', async () => {
    const user = start();
    await addSarah(user, { manual: true });
    expect(await screen.findByText('Sarah approved your access')).toBeInTheDocument();
  });

  it('keeps the default airplane icon for Sarah when nothing else is picked', async () => {
    const user = start();
    await addSarah(user);
    const tile = await sarahTile();
    expect(tile.querySelector('[data-icon]')).toHaveAttribute('data-icon', 'airplane');
  });

  it('uses the icon picked for Sarah on My Fam, the dashboard header and the banner', async () => {
    const user = start();
    await addSarah(user, { icon: 'Moon' });
    const tile = await sarahTile();
    expect(tile.querySelector('[data-icon]')).toHaveAttribute('data-icon', 'moon');
    await user.click(tile);
    const header = screen.getByRole('link', { name: /switch profile/i });
    expect(header.querySelector('[data-icon]')).toHaveAttribute('data-icon', 'moon');
    const banner = screen.getByText(/as caregiver/).closest('p');
    expect(banner.querySelector('[data-icon]')).toHaveAttribute('data-icon', 'moon');
  });

  it('My Fam: You tile first, the picker opens Sarah’s visit, header icons are demo-only', async () => {
    const user = start();
    await addSarah(user);
    await screen.findByText('Sarah approved your access');
    const tiles = screen.getAllByRole('listitem');
    expect(tiles[0]).toHaveTextContent('You');
    expect(tiles[0]).toHaveTextContent('Your health');
    expect(tiles[0]).toHaveTextContent('Account owner');
    expect(screen.getByText('Add a parent or loved one')).toBeInTheDocument();
    expect(screen.queryByText(/AI NP/)).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Cart' }));
    expect(screen.getByText('Not part of this demo')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Start a MinuteTwin visit' }));
    const sheet = screen.getByRole('dialog', { name: 'Who needs care?' });
    await user.click(within(sheet).getByRole('button', { name: /sarah/i }));
    expect(screen.getByText(/What's going on with Sarah today/)).toBeInTheDocument();
  });

  it('quick start "Cold or flu" fills in only after a tap, then follows the cold path', async () => {
    const user = start();
    await addSarah(user);
    await openSarahsHealth(user);
    await user.click(screen.getByRole('link', { name: 'Start a MinuteTwin visit' }));
    const cold = screen.getByRole('button', { name: 'Cold or flu' });
    expect(cold).toHaveAttribute('aria-pressed', 'false');
    await user.click(cold);
    expect(cold).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByLabelText('Message')).toHaveValue(
      'Hi, my mother Sarah has a cough and a runny nose.',
    );
    await user.click(screen.getByRole('button', { name: 'Send' }));
    await screen.findByText(/coughing anything up/);
    await user.click(screen.getByRole('button', { name: 'Send' }));
    expect(
      await screen.findByText("Checked Sarah's medications: no recent changes."),
    ).toBeInTheDocument();
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
    await screen.findByText("We found Sarah's account");
    expect(await axe(document.body)).toHaveNoViolations();
    await user.click(screen.getByRole('link', { name: "Yes, that's her" }));
    expect(await axe(document.body)).toHaveNoViolations();
    await scanAndSelfie(user);
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
