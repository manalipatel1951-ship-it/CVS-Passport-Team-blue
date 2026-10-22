import { useEffect, useRef } from 'react';

/**
 * A panel that slides up from the bottom of the phone (e.g. "Who needs care?").
 * Closes with the × button, by tapping the dimmed background, or with Escape.
 */
export default function Sheet({ title, onClose, children }) {
  const panelRef = useRef(null);

  useEffect(() => {
    panelRef.current?.focus();
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="absolute inset-0 z-30 flex flex-col justify-end">
      <button
        type="button"
        aria-label="Close"
        tabIndex={-1}
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="sheet-title"
        tabIndex={-1}
        className="animate-sheet-up relative rounded-t-3xl bg-white px-5 pb-8 pt-5 shadow-2xl outline-none"
      >
        <div className="flex items-center justify-between">
          <h2 id="sheet-title" className="text-2xl font-bold text-ink">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-canvas text-2xl text-ink"
          >
            ×
          </button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}
