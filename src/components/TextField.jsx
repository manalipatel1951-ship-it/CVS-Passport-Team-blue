// Labeled text input with a large tap area and an optional error message.
export default function TextField({ id, label, error, ...inputProps }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-base font-semibold text-ink">
        {label}
      </label>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`min-h-12 rounded-lg border-2 px-3 text-lg ${error ? 'border-cvs-red' : 'border-line'}`}
        {...inputProps}
      />
      {error && (
        <p id={`${id}-error`} className="text-base font-semibold text-cvs-red">
          {error}
        </p>
      )}
    </div>
  );
}
