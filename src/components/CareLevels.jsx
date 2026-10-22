import Icon from './icons.jsx';

/**
 * "When to get more care": three levels, with Call 911 visually strongest.
 * UX rule: in-person / urgent care / ER advice must be hard to miss.
 */
export default function CareLevels({ levels }) {
  const rows = [
    { label: 'MinuteClinic', text: levels.minuteClinic, style: 'border-line bg-white text-ink' },
    {
      label: 'Urgent care',
      text: levels.urgentCare,
      style: 'border-amber-300 bg-amber-50 text-ink',
    },
    { label: 'Call 911', text: levels.call911, style: 'border-cvs-red bg-cvs-red text-white' },
  ];
  return (
    <section
      aria-label="When to get more care"
      className="rounded-2xl border-2 border-cvs-red bg-cvs-red-light p-4"
    >
      <h3 className="flex items-center gap-2 text-lg font-bold text-cvs-red-dark">
        <Icon name="alert" className="h-6 w-6" />
        When to get more care
      </h3>
      <ul className="mt-3 flex flex-col gap-2">
        {rows.map((r) => (
          <li key={r.label} className={`rounded-xl border-2 p-3 ${r.style}`}>
            <p className="text-base font-bold">{r.label}</p>
            <p className="text-base">{r.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
