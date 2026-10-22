import { useEffect, useState } from 'react';
import Icon from './icons.jsx';
import { DELAYS } from '../config/demo.js';

/**
 * Green success banner that slides in, can be closed with ×, and fades out on its own.
 * e.g. "Sarah approved your access", "Visit summary saved"
 */
export default function Banner({ title, children, onDone }) {
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const fade = setTimeout(() => setFading(true), DELAYS.bannerVisible);
    const done = setTimeout(onDone, DELAYS.bannerVisible + 400);
    return () => {
      clearTimeout(fade);
      clearTimeout(done);
    };
  }, [onDone]);

  return (
    <div
      role="status"
      className={`animate-slide-in mb-5 flex items-start gap-2 rounded-2xl border-2 border-emerald-700 bg-emerald-50 p-4 transition-opacity duration-300 ${fading ? 'opacity-0' : 'opacity-100'}`}
    >
      <Icon name="check" className="mt-0.5 h-6 w-6 shrink-0 text-emerald-900" strokeWidth={3} />
      <div className="flex-1">
        <p className="text-lg font-bold text-emerald-900">{title}</p>
        {children && <p className="mt-1 text-base text-emerald-900">{children}</p>}
      </div>
      <button
        type="button"
        onClick={onDone}
        aria-label="Dismiss"
        className="-m-2 flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-2xl text-emerald-900"
      >
        ×
      </button>
    </div>
  );
}
