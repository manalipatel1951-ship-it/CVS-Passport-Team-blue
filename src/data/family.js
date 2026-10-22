// The caregiver using the app: Manali, a mom of two, now also caring for her mother Sarah.
export const caregiver = {
  firstName: 'Manali',
  // Pre-filled answers for "Fill it in myself" (her own ID details). Dummy data.
  id: { fullName: 'Manali Miller', number: 'D123-4567-8901', state: 'RI', expires: '2029-04-12' },
};

// Manali's kids, already in "My Fam" with full access (she's their parent).
// Their health pages aren't part of this demo.
export const existingFamily = [
  { id: 'alex', firstName: 'Alex', relationship: 'Son', icon: 'rocket' },
  { id: 'maya', firstName: 'Maya', relationship: 'Daughter', icon: 'sunflower' },
];

// Pre-filled answers for the Add family member form, so the demo is quick to click through.
// Everything stays editable.
export const demoLovedOne = {
  hasCvsAccount: 'yes',
  firstName: 'Sarah',
  lastName: 'Miller',
  dateOfBirth: '1958-04-12',
  phone: '(555) 014-2290',
  relationship: 'Mom',
  icon: 'airplane',
};

export const relationships = ['Mom', 'Dad', 'Spouse/Partner', 'Child', 'Grandparent', 'Other'];
