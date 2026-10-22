// The caregiver using the app: Manali, a mom of two, now also caring for her mother Sarah.
export const caregiver = {
  firstName: 'Manali',
  icon: 'star', // her own profile icon ("You" on My Fam)
  // Pre-filled answers for "Enter your ID details manually" (her own ID). Dummy data.
  id: { fullName: 'Manali Miller', number: 'D123-4567-8901', state: 'RI', expires: '04/12/2029' },
};

// Manali's kids, already in "My Fam" with full access (she's their parent).
// Their health pages aren't part of this demo.
export const existingFamily = [
  { id: 'alex', firstName: 'Alex', relationship: 'Son', icon: 'rocket' },
  { id: 'maya', firstName: 'Maya', relationship: 'Daughter', icon: 'sunflower' },
];

// Pre-filled answers for "Who are you adding?", so the demo is quick to click through.
// Everything stays editable. The icon is picked later, on the "You're verified" screen.
export const demoLovedOne = {
  firstName: 'Sarah',
  lastName: 'Miller',
  dateOfBirth: '04/12/1958', // US format MM/DD/YYYY
  relationship: 'Mom',
  icon: 'airplane',
};

export const relationships = ['Mom', 'Dad', 'Spouse', 'Child', 'Other'];
