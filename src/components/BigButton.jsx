import { Link } from 'react-router-dom';

const styles = {
  primary: 'bg-cvs-blue text-white hover:bg-cvs-blue-dark',
  secondary: 'border-2 border-cvs-blue bg-white text-cvs-blue hover:bg-cvs-blue-light',
};

/**
 * Large, pill-shaped, easy-to-tap button (UX rule: at least 48px tall).
 * Dark blue for main actions, matching the CVS app. Pass `to` to go to another
 * screen, or `onClick` for an action. `full={false}` makes it only as wide as its text.
 */
export default function BigButton({
  to,
  onClick,
  variant = 'primary',
  type = 'button',
  full = true,
  children,
}) {
  const className = `flex min-h-14 items-center justify-center rounded-full px-6 text-center text-lg font-bold transition-colors ${full ? 'w-full' : 'w-fit'} ${styles[variant]}`;
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
