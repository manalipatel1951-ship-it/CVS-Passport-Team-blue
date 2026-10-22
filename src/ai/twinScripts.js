// MinuteTwin's scripted conversations. No real AI is used.
// `{name}` is replaced with the loved one's first name.
//
// Every path has the same short shape:
//   caregiver's first message → MinuteTwin asks everything in one message →
//   caregiver's pre-filled answer → MinuteTwin wraps up.
// The rash path (the main demo) adds a photo and a video call; the others end with a
// "View summary" card in the chat. "When to get more care" lives only on the summary screen.
//
// Each turn is MinuteTwin's reply, plus what happens next:
//   next.prefill: the caregiver's next message, pre-typed so the presenter just taps Send
//   next.waiting: 'text' (a message), 'photo' (photo + caption), 'video' (start video call), or 'done'
// Reply parts: { text } a message · { text, action: 'video' } adds "Start video call" ·
//   { medsCheck } a small pill-icon card ("Checked Sarah's medications: …") · { summaryCard: true }

export const GREETING =
  "Hi, I'm MinuteTwin, a digital twin of a MinuteClinic nurse practitioner. I'm AI, not a real person. I can see {name}'s medications and visit history. What's going on with {name} today?";

export const FALLBACK_REPLY =
  'I can help with that. Can you tell me what {name} is experiencing and when it started?';

export const EMERGENCY_REPLY =
  "What you're describing could be serious. Please call 911 or go to the nearest emergency room now. Don't wait.";

// Only words the caregiver actually types trigger the 911 alert.
export const EMERGENCY_KEYWORDS = [
  'chest pain',
  'trouble breathing',
  "can't breathe",
  'cannot breathe',
  'short of breath',
  'face swelling',
  'swelling in her face',
  'swollen face',
  'face is swollen',
  'lips swelling',
  'swollen lips',
  'tongue swelling',
  'swollen tongue',
  'face drooping',
  'slurred speech',
  'stroke',
  'heart attack',
  'fainted',
  'passed out',
  'unconscious',
  'seizure',
  'severe bleeding',
];

export const PHOTO_REPLIES = {
  noPath: 'Thanks for the photo. Can you tell me what {name} is experiencing and when it started?',
  extra: "Thanks, I've added that photo to {name}'s visit.",
};

export const NUDGES = {
  photo: 'When you can, tap the camera button to add a photo, then tap Send.',
  video: 'Tap "Start video call" when you\'re ready.',
  done: "I've already put together {name}'s visit summary. If anything changes, start a new MinuteTwin visit anytime.",
};

const MEDS_OK = { medsCheck: "Checked {name}'s medications: no recent changes." };

const SUMMARY_SENT =
  "I've put together a visit summary with what to do and when to get more care. It's been sent to {name}'s account, and a MinuteClinic nurse practitioner will review it too.";

// Quick-start buttons on the empty chat. `pathId: null` = "Something else" (type freely).
export const QUICK_STARTS = [
  { label: 'Rash or skin issue', pathId: 'rash' },
  { label: 'Cold or flu', pathId: 'cold' },
  { label: 'Allergies', pathId: 'allergy' },
  { label: 'Something else', pathId: null },
];

// Order matters: the first path whose keywords match wins
// (allergies before rash, so "itchy eyes" isn't treated as a skin rash).
export const paths = [
  {
    id: 'allergy',
    firstMessage:
      "Hi, my mother {name}'s allergies are acting up. She's sneezing and her eyes are itchy.",
    keywords: [
      'allergy',
      'allergies',
      'allergic',
      'hay fever',
      'pollen',
      'itchy eyes',
      'watery eyes',
      'seasonal',
    ],
    turns: [
      {
        reply: [
          {
            text: "I'm sorry {name} is dealing with that. A few quick questions: When did it start, and does it happen around the same time each year? Is she wheezing at all? And is she taking any allergy medicine?",
          },
        ],
        next: {
          waiting: 'text',
          prefill:
            "It started a few days ago, and it happens every spring and fall. No wheezing. She isn't taking anything for it yet.",
        },
      },
      {
        reply: [
          {
            medsCheck: "Checked {name}'s medications: no conflicts expected with allergy medicine.",
          },
          {
            text: `Thanks, that helps. A common non-drowsy allergy medicine shouldn't interact with her prescriptions. This sounds like seasonal allergies. ${SUMMARY_SENT}`,
          },
          { summaryCard: true },
        ],
        next: { waiting: 'done' },
      },
    ],
    summary: {
      short: 'allergies',
      condition: 'Likely seasonal allergies',
      visitType: 'MinuteTwin chat visit',
      notes: [
        'Sneezing and itchy eyes',
        'Started a few days ago',
        'Happens every spring and fall',
        'No wheezing',
        'Not taking allergy medicine yet',
        'Checked her medication list: no conflicts expected',
      ],
      whatToDo: [
        'Try a non-drowsy allergy medicine like loratadine (Claritin), as directed on the label',
        'Use a saline nose spray or rinse',
        'Keep windows closed on high-pollen days, and wash up after being outside',
      ],
      careLevels: {
        minuteClinic: "If it isn't better after a week of allergy medicine",
        urgentCare: 'If she starts wheezing or has trouble sleeping because of her breathing',
        call911: 'Swelling of face, lips, or tongue, or trouble breathing',
      },
      actions: [
        'Find allergy relief at CVS Pharmacy',
        'Book a MinuteClinic visit',
        'Share summary',
      ],
    },
  },
  {
    id: 'cut',
    keywords: ['cut', 'scrape', 'scraped', 'scratch', 'wound', 'infected', 'infection', 'pus'],
    turns: [
      {
        reply: [
          {
            text: "I'm sorry {name} is dealing with that. A few quick questions: Where is it, and when did it happen? Is the area red, swollen, or warm? Is there any pus, or red streaks spreading from it? And does she have a fever?",
          },
        ],
        next: {
          waiting: 'text',
          prefill:
            "It's a scrape on her right knee from three days ago. It's red, a little swollen, and warm. No pus or red streaks, and no fever.",
        },
      },
      {
        reply: [
          {
            ...MEDS_OK,
          },
          {
            text: `Thanks, that helps. This looks like a mildly infected scrape. Because of the redness and warmth, I recommend a MinuteClinic visit in the next day or two in case she needs an antibiotic. ${SUMMARY_SENT}`,
          },
          { summaryCard: true },
        ],
        next: { waiting: 'done' },
      },
    ],
    summary: {
      short: 'infected scrape',
      condition: 'Possible mild skin infection (infected scrape)',
      visitType: 'MinuteTwin chat visit',
      notes: [
        'Scrape on right knee',
        'Happened three days ago',
        'Red, a little swollen, and warm',
        'No pus or red streaks',
        'No fever',
        'No recent medication changes',
      ],
      whatToDo: [
        'Book a MinuteClinic visit in the next day or two',
        'Gently wash it with soap and water twice a day',
        'Cover it with a clean bandage and change it daily',
        'Draw a pen line around the redness to see if it spreads',
      ],
      careLevels: {
        minuteClinic: 'In the next day or two, to check if she needs an antibiotic',
        urgentCare: 'If the redness spreads past the pen line, there is pus, or she gets a fever',
        call911: 'Red streaks spreading fast with a high fever, confusion, or trouble breathing',
      },
      actions: ['Book a MinuteClinic visit', 'Find bandages at CVS Pharmacy', 'Share summary'],
    },
  },
  {
    id: 'rash',
    firstMessage: 'Hi, my mother {name} has a rash on her left upper arm.',
    keywords: ['rash', 'itch', 'itchy', 'hives', 'bumps', 'red spots', 'skin'],
    // What MinuteTwin says on the video call (first caption, then second caption).
    videoLines: [
      "Thanks for the photo. Can you hold the camera closer to the rash on {name}'s left upper arm? I want to check if it's raised or spreading.",
      "Thanks, I've got what I need. I'll put together {name}'s visit summary now.",
    ],
    turns: [
      {
        reply: [
          {
            text: "I'm sorry {name} is dealing with that. Could you send a photo of the rash? And let me know when it started, if it's itchy or painful, if she has a fever, and if she's used any new soaps, lotions, or laundry detergent.",
          },
        ],
        next: {
          waiting: 'photo',
          prefill:
            "Started yesterday and it's really itchy. No fever. She switched detergents last week.",
        },
      },
      {
        reply: [
          {
            ...MEDS_OK,
          },
          {
            text: "Thanks, that helps. There are no recent changes to {name}'s medications, so a reaction is less likely. I'd like to take a closer look to be sure. Can we do a quick video call?",
            action: 'video',
          },
        ],
        next: { waiting: 'video' },
      },
    ],
    summary: {
      short: 'rash',
      condition: 'Likely contact dermatitis',
      visitType: 'MinuteTwin chat and video visit',
      notes: [
        'Rash on left upper arm',
        'Started yesterday',
        'Itchy',
        'No fever',
        'Switched laundry detergent last week',
        'No recent medication changes',
        'Photo and video reviewed',
      ],
      whatToDo: [
        'Switch back to her old laundry detergent',
        'Use a cool compress',
        'Use an over-the-counter hydrocortisone cream as directed on the label',
      ],
      careLevels: {
        minuteClinic: "If it isn't improving in 3 to 5 days",
        urgentCare: 'If it spreads quickly, blisters, or she gets a fever',
        call911: 'Swelling of face, lips, or tongue, or trouble breathing',
      },
      actions: [
        'Find hydrocortisone cream at CVS Pharmacy',
        'Book a MinuteClinic visit',
        'Share summary',
      ],
    },
  },
  {
    id: 'cold',
    firstMessage: 'Hi, my mother {name} has a cough and a runny nose.',
    keywords: [
      'cough',
      'coughing',
      'cold',
      'flu',
      'congestion',
      'congested',
      'stuffy',
      'runny nose',
      'sneeze',
      'sneezing',
      'sore throat',
    ],
    turns: [
      {
        reply: [
          {
            text: "I'm sorry {name} isn't feeling well. A few quick questions: How long has she had these symptoms? Is she coughing anything up? And does she have a fever, or any wheezing when she breathes?",
          },
        ],
        next: {
          waiting: 'text',
          prefill:
            'About three days. A little clear mucus. No fever and no wheezing. She just feels tired.',
        },
      },
      {
        reply: [
          {
            ...MEDS_OK,
          },
          {
            text: `Thanks, that helps. This sounds like a common cold. It's caused by a virus, so antibiotics won't help, and most colds get better in 7 to 10 days. ${SUMMARY_SENT}`,
          },
          { summaryCard: true },
        ],
        next: { waiting: 'done' },
      },
    ],
    summary: {
      short: 'cold',
      condition: 'Likely common cold',
      visitType: 'MinuteTwin chat visit',
      notes: [
        'Cough and runny nose for about three days',
        'A little clear mucus',
        'No fever or wheezing',
        'Feels tired',
        'No recent medication changes',
      ],
      whatToDo: [
        'Rest and plenty of fluids',
        'Honey in warm tea for the cough',
        'Saline nose spray for stuffiness',
      ],
      careLevels: {
        minuteClinic: "If she isn't better in 10 days, or the cough gets worse",
        urgentCare: 'If she gets a fever above 101°F or starts wheezing',
        call911: 'Trouble breathing or chest pain',
      },
      actions: [
        'Find cold and cough relief at CVS Pharmacy',
        'Book a MinuteClinic visit',
        'Share summary',
      ],
    },
  },
  {
    id: 'fever',
    keywords: ['fever', 'temperature', 'chills'],
    turns: [
      {
        reply: [
          {
            text: "Let's figure this out. A few quick questions: What is {name}'s temperature, and when did the fever start? Does she have any other symptoms, like a cough, burning when she pees, a rash, or a stiff neck?",
          },
        ],
        next: {
          waiting: 'text',
          prefill:
            "It's 100.4°F and it started this morning. No other symptoms. She just feels achy and tired.",
        },
      },
      {
        reply: [
          {
            ...MEDS_OK,
          },
          {
            text: `Thanks, that helps. A low fever like this is often from a mild virus. ${SUMMARY_SENT}`,
          },
          { summaryCard: true },
        ],
        next: { waiting: 'done' },
      },
    ],
    summary: {
      short: 'fever',
      condition: 'Likely mild viral fever',
      visitType: 'MinuteTwin chat visit',
      notes: [
        'Temperature 100.4°F',
        'Started this morning',
        'Achy and tired',
        'No other symptoms',
        'No recent medication changes',
      ],
      whatToDo: [
        'Acetaminophen (Tylenol) as directed on the label',
        'Plenty of fluids and rest',
        'Check her temperature every 4 to 6 hours',
      ],
      careLevels: {
        minuteClinic: 'If the fever lasts more than 3 days',
        urgentCare: 'If it reaches 103°F, or she gets a new cough, rash, or burning when she pees',
        call911: 'Confusion, a stiff neck, trouble breathing, or very hard to wake',
      },
      actions: ['Find acetaminophen at CVS Pharmacy', 'Book a MinuteClinic visit', 'Share summary'],
    },
  },
];
