// Fake health records shown on the loved one's "Your Health" dashboard. Plain language, no jargon.
// "Previous visits" also lists any MinuteTwin visit finished during the demo.
export const records = [
  {
    id: 'prescriptions',
    title: 'Prescriptions',
    icon: 'pill',
    lines: [
      'Blood pressure pill (Lisinopril 10mg): refill ready Nov 2',
      'Cholesterol pill (Atorvastatin 20mg): 14 days left',
    ],
  },
  {
    id: 'appointments',
    title: 'Upcoming appointments',
    icon: 'calendar',
    lines: ['Flu shot at MinuteClinic: Nov 8, 10:30 AM'],
  },
  {
    id: 'vaccines',
    title: 'Vaccine history',
    icon: 'syringe',
    lines: ['COVID-19 booster: Sept 14', 'Shingles: 1st dose done, 2nd dose due'],
  },
  {
    id: 'visits',
    title: 'Previous visits',
    icon: 'clinic',
    lines: ['MinuteClinic visit, Mar 3: flu shot'],
  },
];
