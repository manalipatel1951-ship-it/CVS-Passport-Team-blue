// UX rule: MinuteTwin is always clearly labeled as AI, never as a nurse or a real person.
export default function AIBadge({ inverted = false }) {
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 text-sm font-bold ${inverted ? 'bg-white text-cvs-blue' : 'bg-cvs-blue text-white'}`}
    >
      AI
    </span>
  );
}

export const TWIN_NAME = 'MinuteTwin (AI)';
export const TWIN_SUBTITLE =
  'Digital twin of a MinuteClinic nurse practitioner. Not a real person.';
