import { Link } from 'react-router-dom';

const styles = {
  primary: 'bg-cvs-red text-white hover:bg-cvs-red-dark',
  secondary: 'border-2 border-cvs-red bg-white text-cvs-red hover:bg-cvs-red-light',
};

/**
 * Large, full-width, easy-to-tap button (UX rule: at least 48px tall).
 * Pass `to` to make it go to another screen, or `onClick` for an action.
 */
export default function BigButton({ to, onClick, variant = 'primary', type = 'button', children }) {
  const className = `flex min-h-14 w-full items-center justify-center rounded-xl px-6 text-lg font-bold transition-colors ${styles[variant]}`;
  if (to) {
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} className={className}>
      {children}
    </button>
  );
}
