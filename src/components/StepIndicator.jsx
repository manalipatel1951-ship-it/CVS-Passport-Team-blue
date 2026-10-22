// "Step 2 of 3" with a small red progress bar, so the caregiver knows how much is left.
// Steps: 1 About your loved one · 2 Verify it's you · 3 Approval
export const PASSPORT_STEPS = ['About your loved one', "Verify it's you", 'Approval'];

export default function StepIndicator({ step, steps = PASSPORT_STEPS }) {
  return (
    <div>
      <p className="text-base font-bold text-ink">
        Step {step} of {steps.length}
        <span className="font-semibold text-ink-soft"> · {steps[step - 1]}</span>
      </p>
      <div
        aria-hidden="true"
        className="mt-2 grid gap-1.5"
        style={{ gridTemplateColumns: `repeat(${steps.length}, 1fr)` }}
      >
        {steps.map((s, i) => (
          <span key={s} className={`h-1.5 rounded-full ${i < step ? 'bg-cvs-red' : 'bg-white'}`} />
        ))}
      </div>
    </div>
  );
}
