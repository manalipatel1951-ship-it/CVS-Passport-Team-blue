const content = {
  er: {
    heading: 'Call 911 or go to the ER now',
    body: "Don't wait. This could be serious.",
  },
  urgent: {
    heading: 'Get seen in person today',
    body: 'Go to urgent care or a MinuteClinic today.',
  },
};

// UX rule: in-person / urgent care / ER advice must be hard to miss.
export default function EscalationAlert({ level }) {
  const c = content[level];
  if (!c) return null;
  return (
    <div role="alert" className="flex gap-3 rounded-xl bg-cvs-red p-4 text-white">
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="mt-0.5 h-7 w-7 shrink-0"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
      </svg>
      <div>
        <p className="text-xl font-bold">{c.heading}</p>
        <p className="mt-1 text-base">{c.body}</p>
      </div>
    </div>
  );
}
