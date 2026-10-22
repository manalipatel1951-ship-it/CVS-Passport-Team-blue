// Fake family members already in Manali's "My Fam" list.
// They exist for realism, but caregiver access isn't set up for them.
export const existingFamily = [
  { id: 'alex', firstName: 'Alex', relationship: 'Brother', color: 'bg-sky-700' },
  { id: 'maya', firstName: 'Maya', relationship: 'Daughter', color: 'bg-emerald-700' },
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
};

export const relationships = ['Mom', 'Dad', 'Spouse/Partner', 'Child', 'Grandparent', 'Other'];
