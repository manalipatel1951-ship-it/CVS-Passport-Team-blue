// The "smart fake" AI nurse's pre-written replies. No real AI is used.
// To add a topic: copy one block, change the keywords, replies and summary.
// `{name}` is replaced with the loved one's first name.

// Words that mean "go to the ER now". Checked first, every message.
export const emergencyKeywords = [
  'chest pain',
  'trouble breathing',
  "can't breathe",
  'cannot breathe',
  'short of breath',
  'face drooping',
  'drooping',
  'slurred',
  'stroke',
  'heart attack',
  'fainted',
  'passed out',
  'unconscious',
  'seizure',
  'severe bleeding',
  "won't stop bleeding",
  'confused',
];

// Words that mean "get seen in person soon".
export const warningKeywords = [
  'high fever',
  '103',
  '104',
  'spreading',
  'getting worse',
  'worse',
  'several days',
  'a week',
  'swollen',
  'swelling',
  'pus',
];

export const emergencyReply =
  "What you're describing could be serious. Please call 911 or go to the nearest emergency room right now. Don't wait.";

export const warningReply =
  "Thanks for telling me. Because of that, {name} should be seen in person today, at urgent care or a MinuteClinic. I'll add this to the summary.";

export const photoReply = {
  withTopic: "Thanks, that photo helps. I can see what you mean. Let's keep going.",
  noTopic: 'Thanks for the photo. Can you tell me in a few words what is going on?',
};

export const fallbackReplies = [
  'I want to make sure I understand. Can you tell me what {name} is feeling, and when it started?',
  "I'm not sure I can help with that here. It's best for {name} to be seen in person, at a MinuteClinic or by her doctor.",
];

export const closingReply =
  'Thanks. I have what I need. Tap "See summary" for your next steps, or start a video call if you\'d like me to take a look.';

export const topics = [
  {
    id: 'rash',
    label: 'Skin rash',
    keywords: ['rash', 'itch', 'itchy', 'bumps', 'hives', 'red spots', 'skin'],
    replies: [
      "I'm sorry {name} is dealing with that. Where on her body is the rash, and when did it start? A photo would help too.",
      'Has she started any new medicine, soap, lotion or food lately? Does she have a fever?',
    ],
    videoLine: 'Hi there, can you show me where the rash is?',
    summary: {
      notes: ['Itchy rash, likely from contact with something new (like a soap or lotion)'],
      recommendations: [
        'Wash the area gently with mild soap and cool water',
        'Use an over-the-counter anti-itch cream (1% hydrocortisone) twice a day',
        'Stop using any new soaps or lotions',
      ],
      warnSigns: ['The rash spreads fast', 'She gets a fever', 'Her face, lips or tongue swell'],
    },
  },
  {
    id: 'throat',
    label: 'Sore throat',
    keywords: ['sore throat', 'throat', 'swallow', 'strep'],
    replies: [
      'That sounds uncomfortable for {name}. How long has her throat been sore, and does she have a fever?',
      'Is it hard for her to swallow, or do you see white spots at the back of her throat?',
    ],
    videoLine: 'Hi there, can you help her open wide so I can see her throat?',
    summary: {
      notes: ['Sore throat, likely from a virus'],
      recommendations: [
        'Warm drinks, honey and throat lozenges',
        'Acetaminophen (Tylenol) for pain, as directed',
        'Rest and plenty of fluids',
      ],
      warnSigns: [
        'Trouble swallowing or breathing',
        'Fever above 101°F for more than 2 days',
        'White spots on the throat',
      ],
    },
  },
  {
    id: 'cold',
    label: 'Cough or cold',
    keywords: ['cough', 'cold', 'congestion', 'stuffy', 'runny nose', 'sneeze', 'sneezing', 'flu'],
    replies: [
      'Got it. How long has {name} had the cough or cold, and is she coughing anything up?',
      'Does she have a fever, or any wheezing when she breathes?',
    ],
    videoLine: 'Hi there, can she cough for me so I can hear it?',
    summary: {
      notes: ['Cold symptoms, likely from a virus'],
      recommendations: [
        'Rest and plenty of fluids',
        'Honey in warm tea to ease the cough',
        'Saline nose spray for stuffiness',
      ],
      warnSigns: [
        'Trouble breathing or wheezing',
        'Fever above 101°F',
        'Cough lasts more than 10 days',
      ],
    },
  },
  {
    id: 'fever',
    label: 'Fever',
    keywords: ['fever', 'temperature', 'chills'],
    replies: [
      "Let's figure this out. What was {name}'s temperature, and how long has she had it?",
      'Any other symptoms, like a cough, pain when peeing, or a rash?',
    ],
    videoLine: 'Hi there, how is she feeling right now?',
    summary: {
      notes: ['Mild fever'],
      recommendations: [
        'Acetaminophen (Tylenol) as directed',
        'Plenty of fluids and rest',
        'Check her temperature every 4–6 hours',
      ],
      warnSigns: [
        'Temperature of 103°F or higher',
        'Fever lasts more than 3 days',
        'She seems confused or very sleepy',
      ],
    },
  },
  {
    id: 'wound',
    label: 'Minor cut or burn',
    keywords: ['cut', 'burn', 'scrape', 'wound', 'scratch', 'blister'],
    replies: [
      "I'm sorry that happened. Where is it, and how big is it? A photo would help.",
      'Have you been able to clean it? Is it still bleeding?',
    ],
    videoLine: 'Hi there, can you show me the injury?',
    summary: {
      notes: ['Small cut or burn'],
      recommendations: [
        'Rinse with cool water for a few minutes',
        'Cover with a clean bandage and change it daily',
        'Use petroleum jelly to keep it moist',
      ],
      warnSigns: [
        'Redness, warmth or pus around it',
        'It is bigger than 3 inches or very deep',
        "It won't stop bleeding",
      ],
    },
  },
  {
    id: 'eye',
    label: 'Pink eye',
    keywords: ['pink eye', 'eye', 'eyes', 'crusty'],
    replies: [
      'Okay. Is the eye red, itchy, or crusty in the morning? Is it one eye or both?',
      'Does she have any eye pain or trouble seeing?',
    ],
    videoLine: 'Hi there, can you bring the camera close to her eye?',
    summary: {
      notes: ['Red, irritated eye (possible pink eye)'],
      recommendations: [
        'Wipe the eye with a clean, warm, wet cloth',
        "Wash hands often and don't share towels",
        'Lubricating eye drops for comfort',
      ],
      warnSigns: ['Eye pain or blurry vision', 'Sensitivity to light', 'No better after 3 days'],
    },
  },
  {
    id: 'ear',
    label: 'Earache',
    keywords: ['ear', 'earache'],
    replies: [
      'How long has {name} had ear pain? Is there any fluid coming out?',
      'Does she have a fever or any trouble hearing?',
    ],
    videoLine: 'Hi there, can you show me which ear hurts?',
    summary: {
      notes: ['Ear pain'],
      recommendations: [
        'A warm compress on the ear',
        'Acetaminophen (Tylenol) for pain, as directed',
      ],
      warnSigns: [
        'Fluid or blood from the ear',
        'Fever above 101°F',
        'Pain lasts more than 2 days',
      ],
    },
  },
  {
    id: 'stomach',
    label: 'Upset stomach',
    keywords: ['stomach', 'nausea', 'vomit', 'throwing up', 'diarrhea', 'belly'],
    replies: [
      "I'm sorry she's not feeling well. How long has this been going on, and can she keep fluids down?",
      'Any fever, or blood in her stool or vomit?',
    ],
    videoLine: 'Hi there, how is her stomach feeling right now?',
    summary: {
      notes: ['Upset stomach, likely a stomach bug'],
      recommendations: [
        'Small sips of water or an electrolyte drink',
        'Bland foods like toast, rice or bananas',
        'Rest',
      ],
      warnSigns: [
        "She can't keep fluids down for 24 hours",
        'Signs of dehydration (very little pee, dizziness)',
        'Blood in stool or vomit',
      ],
    },
  },
  {
    id: 'headache',
    label: 'Headache',
    keywords: ['headache', 'head hurts', 'migraine'],
    replies: [
      'When did the headache start, and how bad is it from 1 to 10?',
      'Has she had headaches like this before? Any changes in her vision?',
    ],
    videoLine: 'Hi there, how is her headache right now?',
    summary: {
      notes: ['Headache'],
      recommendations: [
        'Rest in a quiet, dark room',
        'Acetaminophen (Tylenol) as directed',
        'Drink water',
      ],
      warnSigns: [
        '"Worst headache of her life"',
        'Confusion, weakness or trouble speaking',
        'Headache after a fall',
      ],
    },
  },
  {
    id: 'meds',
    label: 'Medication question',
    keywords: ['medicine', 'medication', 'pill', 'dose', 'prescription', 'side effect', 'refill'],
    replies: [
      'Happy to help. Which medicine is it, and what is your question about it?',
      "Thanks. I'll pass this to her CVS pharmacist too, so they can double-check.",
    ],
    videoLine: 'Hi there, can you show me the medicine bottle?',
    summary: {
      notes: ['Question about a medicine'],
      recommendations: [
        'Keep taking her medicines as prescribed unless her doctor says otherwise',
        'A CVS pharmacist will follow up',
      ],
      warnSigns: [
        'Trouble breathing or swelling after a new medicine',
        'She took too much of a medicine',
      ],
    },
  },
];

// Used when the visit ended without a clear topic.
export const generalSummary = {
  notes: ['General health question'],
  recommendations: [
    'Keep an eye on how she feels',
    'Book a MinuteClinic visit if anything changes',
  ],
  warnSigns: ['Any trouble breathing, chest pain, or confusion: call 911'],
};
