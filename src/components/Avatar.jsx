// Round initial avatar with the person's name underneath.
export default function Avatar({
  name,
  caption,
  color = 'bg-cvs-red',
  size = 'h-20 w-20 text-3xl',
}) {
  return (
    <span className="flex flex-col items-center gap-1">
      <span
        aria-hidden="true"
        className={`flex items-center justify-center rounded-full font-bold text-white ${color} ${size}`}
      >
        {name.charAt(0).toUpperCase()}
      </span>
      <span className="text-base font-semibold text-ink">{name}</span>
      {caption && <span className="text-sm text-ink-soft">{caption}</span>}
    </span>
  );
}
