import Icon from './icons.jsx';

// "Step 2 of 3" with a small red progress bar, so the caregiver knows how much is left.
// Steps: 1 About your loved one · 2 Verify it's you · 3 Approval
// `progress` (0–1) fills the current step's segment part-way (e.g. ID front done = 1/3);
// `done` shows the current step as complete, with a check.
export const PASSPORT_STEPS = ['About your loved one', "Verify it's you", 'Approval'];

export default function StepIndicator({
  step,
  progress = 1,
  done = false,
  steps = PASSPORT_STEPS,
}) {
  const fill = (i) => (i < step - 1 ? 1 : i === step - 1 ? (done ? 1 : progress) : 0);
  return (
    <div>
      <p className="flex items-center gap-1 text-base font-bold text-ink">
        Step {step} of {steps.length}
        <span className="font-semibold text-ink-soft"> · {steps[step - 1]}</span>
        {done && (
          <>
            <Icon name="check" className="h-5 w-5 text-cvs-red" strokeWidth={3} />
            <span className="sr-only">(done)</span>
          </>
        )}
      </p>
      <div
        aria-hidden="true"
        className="mt-2 grid gap-1.5"
        style={{ gridTemplateColumns: `repeat(${steps.length}, 1fr)` }}
      >
        {steps.map((s, i) => (
          <span key={s} className="h-1.5 overflow-hidden rounded-full bg-white">
            <span
              className="block h-full rounded-full bg-cvs-red transition-[width] duration-500"
              style={{ width: `${fill(i) * 100}%` }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
