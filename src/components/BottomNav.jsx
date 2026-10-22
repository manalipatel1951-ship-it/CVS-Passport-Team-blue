import { Link } from 'react-router-dom';

const items = [
  { label: 'Home', to: null },
  { label: 'Pharmacy', to: '/soon' },
  { label: 'Care', to: '/soon' },
  { label: 'Account', to: '/soon' },
];

// Bottom navigation on the loved one's dashboard. Only Home is built; the rest are placeholders.
export default function BottomNav({ homeTo }) {
  return (
    <nav aria-label="Main" className="grid grid-cols-4 border-t border-line bg-white">
      {items.map((item) => {
        const active = item.to === null;
        return (
          <Link
            key={item.label}
            to={active ? homeTo : item.to}
            aria-current={active ? 'page' : undefined}
            className={`flex min-h-16 items-center justify-center text-base font-semibold ${active ? 'text-cvs-red' : 'text-ink-soft'}`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
