// UX rule: the NP Digital Twin is always clearly labeled as AI.
export default function AIBadge() {
  return (
    <span className="inline-flex items-center rounded-md bg-ink px-2 py-0.5 text-sm font-bold text-white">
      AI
    </span>
  );
}

export const AI_NAME = 'AI Nurse Practitioner';
export const AI_SUBTITLE = 'Digital twin of a CVS nurse practitioner. Not a real person.';
