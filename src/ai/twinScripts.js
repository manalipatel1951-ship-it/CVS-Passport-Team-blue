// MinuteTwin's scripted conversations. No real AI is used.
// `{name}` is replaced with the loved one's first name.
//
// How a path works: the caregiver's first message picks a path by keyword.
// Each turn is MinuteTwin's reply, plus what happens next:
//   next.prefill: the caregiver's next message, pre-typed so the presenter just taps Send
//   next.waiting: 'text' (a message), 'photo' (tap the camera), 'video' (start video call), or 'done'
// Reply parts: { text } a message · { text, action: 'video' } adds a "Start video call" button
//              { careLevels: true } the "When to get more care" box · { summaryCard: true } the summary card

export const FIRST_PREFILL = 'Hi, my mother {name} has a rash on her left upper arm.';

export const FALLBACK_REPLY =
  'I can help with that. Can you tell me what {name} is experiencing and when it started?';

export const EMERGENCY_REPLY =
  "What you're describing could be serious. Please call 911 or go to the nearest emergency room now. Don't wait.";

// Only words the caregiver actually types trigger this.
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

const CLOSING =
  "You're welcome! I hope {name} feels better soon. I've sent a summary to {name}'s account, and a MinuteClinic nurse practitioner will review it too.";

const THANKS = 'Thank you for the information.';

export const PHOTO_REPLIES = {
  noPath: 'Thanks for the photo. Can you tell me what {name} is experiencing and when it started?',
  extra: "Thanks, I've added that photo to {name}'s visit.",
};

export const NUDGES = {
  photo: 'When you can, tap the camera button to send a photo of it.',
  video: 'Tap "Start video call" when you\'re ready.',
  done: "I've already sent {name}'s summary. If anything changes, start a new MinuteTwin visit anytime.",
};

export const paths = [
  {
    id: 'rash',
    keywords: ['rash', 'itch', 'itchy', 'hives', 'bumps', 'red spots', 'skin'],
    videoLine: "Hi there, can you show me the rash on {name}'s left upper arm?",
    turns: [
      {
        reply: [
          {
            text: "I'm sorry {name} is dealing with that. A rash on her left upper arm, got it. When did it start, and is it itchy, painful, or both?",
          },
        ],
        next: { waiting: 'text', prefill: "It started yesterday. She says it's really itchy." },
      },
      {
        reply: [
          {
            text: 'Thanks. Has she started any new soaps, lotions, or laundry detergent recently? And does she have a fever?',
          },
        ],
        next: { waiting: 'text', prefill: 'No fever. She did switch detergents last week.' },
      },
      {
        reply: [
          {
            text: "That's helpful. I also checked {name}'s medication list and there are no recent changes, so a medication reaction is less likely. Could you send a photo of the rash?",
          },
        ],
        next: { waiting: 'photo' },
      },
      {
        reply: [
          {
            text: "Thank you. I'd like to take a closer look to be sure. Can we do a quick video call?",
            action: 'video',
          },
        ],
        next: { waiting: 'video' },
      },
      {
        reply: [
          {
            text: "Thanks for showing me. This looks like contact dermatitis, a skin reaction that's often caused by something like a new detergent. Here's what can help: switch back to her old detergent, use a cool compress, and try an over-the-counter hydrocortisone cream as directed on the label.",
          },
          { careLevels: true },
        ],
        next: { waiting: 'text', prefill: THANKS },
      },
      {
        reply: [{ text: CLOSING }, { summaryCard: true }],
        next: { waiting: 'done' },
      },
    ],
    summary: {
      short: 'rash',
      condition: 'Likely contact dermatitis',
      // Buttons on the summary screen (they show "Not part of this demo").
      actions: ['Find hydrocortisone cream at CVS', 'Book a MinuteClinic visit', 'Share summary'],
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
    },
  },
  {
    id: 'infection',
    keywords: [
      'infection',
      'infected',
      'uti',
      'burning',
      'pee',
      'peeing',
      'pees',
      'urine',
      'urinate',
      'urinating',
      'bladder',
    ],
    turns: [
      {
        reply: [
          {
            text: "I'm sorry {name} is dealing with that. When did it start? Does she have a fever, back or side pain, or blood in her urine?",
          },
        ],
        next: { waiting: 'text', prefill: 'It started two days ago. No fever or back pain.' },
      },
      {
        reply: [
          {
            text: "Thanks. I checked {name}'s medication list and there are no recent changes. Is she going to the bathroom more often than usual, and is she drinking enough fluids?",
          },
        ],
        next: {
          waiting: 'text',
          prefill: "Yes, she's going a lot more often. She's drinking water.",
        },
      },
      {
        reply: [
          {
            text: 'Thank you. This sounds like it could be a urinary tract infection (UTI). A UTI usually needs a quick urine test and often an antibiotic, so I recommend a MinuteClinic visit today or tomorrow. Until then, keep her drinking water.',
          },
          { careLevels: true },
        ],
        next: { waiting: 'text', prefill: THANKS },
      },
      { reply: [{ text: CLOSING }, { summaryCard: true }], next: { waiting: 'done' } },
    ],
    summary: {
      short: 'possible UTI',
      condition: 'Possible urinary tract infection (UTI)',
      // Buttons on the summary screen (they show "Not part of this demo").
      actions: ['Book a MinuteClinic visit', 'Share summary'],
      visitType: 'MinuteTwin chat visit',
      notes: [
        'Burning when she pees, going more often',
        'Started two days ago',
        'No fever or back pain',
        'No recent medication changes',
      ],
      whatToDo: [
        'Book a MinuteClinic visit today or tomorrow for a quick urine test',
        'Keep her drinking water',
        'Acetaminophen (Tylenol) for discomfort, as directed on the label',
      ],
      careLevels: {
        minuteClinic: 'Today or tomorrow, for a quick urine test',
        urgentCare: 'If she gets a fever, back or side pain, or starts vomiting',
        call911: 'If she becomes suddenly confused, very weak, or hard to wake',
      },
    },
  },
  {
    id: 'cold',
    keywords: [
      'cough',
      'coughing',
      'cold',
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
            text: "Sorry {name} isn't feeling well. How long has she had these symptoms, and is she coughing anything up?",
          },
        ],
        next: { waiting: 'text', prefill: 'About three days. A little clear mucus.' },
      },
      {
        reply: [{ text: 'Thanks. Does she have a fever, or any wheezing when she breathes?' }],
        next: { waiting: 'text', prefill: 'No fever and no wheezing. She just feels tired.' },
      },
      {
        reply: [
          {
            text: "Thanks. This sounds like a common cold. It's caused by a virus, so antibiotics won't help. Rest, plenty of fluids, honey in warm tea for the cough, and a saline nose spray for stuffiness. Most colds get better in 7 to 10 days.",
          },
          { careLevels: true },
        ],
        next: { waiting: 'text', prefill: THANKS },
      },
      { reply: [{ text: CLOSING }, { summaryCard: true }], next: { waiting: 'done' } },
    ],
    summary: {
      short: 'cold',
      condition: 'Likely common cold',
      // Buttons on the summary screen (they show "Not part of this demo").
      actions: ['Find cold and cough relief at CVS', 'Book a MinuteClinic visit', 'Share summary'],
      visitType: 'MinuteTwin chat visit',
      notes: [
        'Cough and cold symptoms for about three days',
        'A little clear mucus',
        'No fever or wheezing',
        'Feels tired',
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
    },
  },
  {
    id: 'fever',
    keywords: ['fever', 'temperature', 'chills'],
    turns: [
      {
        reply: [
          {
            text: "Let's figure this out. What is {name}'s temperature, and when did the fever start?",
          },
        ],
        next: { waiting: 'text', prefill: "It's 100.4°F. It started this morning." },
      },
      {
        reply: [
          {
            text: 'Thanks. Does she have any other symptoms, like a cough, burning when she pees, a rash, or a stiff neck?',
          },
        ],
        next: { waiting: 'text', prefill: 'No, she just feels achy and tired.' },
      },
      {
        reply: [
          {
            text: 'A low fever like this is often from a mild virus. Give acetaminophen (Tylenol) as directed on the label, keep her drinking fluids, and check her temperature every 4 to 6 hours.',
          },
          { careLevels: true },
        ],
        next: { waiting: 'text', prefill: THANKS },
      },
      { reply: [{ text: CLOSING }, { summaryCard: true }], next: { waiting: 'done' } },
    ],
    summary: {
      short: 'fever',
      condition: 'Likely mild viral fever',
      // Buttons on the summary screen (they show "Not part of this demo").
      actions: ['Find acetaminophen at CVS', 'Book a MinuteClinic visit', 'Share summary'],
      visitType: 'MinuteTwin chat visit',
      notes: ['Temperature 100.4°F', 'Started this morning', 'Achy and tired', 'No other symptoms'],
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
    },
  },
];
