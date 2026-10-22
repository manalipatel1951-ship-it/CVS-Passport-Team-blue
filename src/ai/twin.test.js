import { getSummary, getVideoLine, initialTwinState, twinRespond } from './twin.js';

const NAME = 'Sarah';
const text = (t) => ({ type: 'text', text: t });

// Plays a list of inputs and returns every reply part plus the final state.
function play(inputs, state = initialTwinState(NAME)) {
  const parts = [];
  for (const input of inputs) {
    const r = twinRespond(input, state, NAME);
    parts.push(...r.reply);
    state = r.state;
  }
  return { parts, state, texts: parts.map((p) => p.text).filter(Boolean) };
}

describe('MinuteTwin script engine', () => {
  it('starts with the rash script pre-typed', () => {
    expect(initialTwinState(NAME).prefill).toBe(
      'Hi, my mother Sarah has a rash on her left upper arm.',
    );
  });

  it('plays the full rash script: photo, video, care levels, summary', () => {
    let { state, texts, parts } = play([text(initialTwinState(NAME).prefill)]);
    expect(texts[0]).toMatch(/left upper arm, got it/);
    expect(state.prefill).toBe("It started yesterday. She says it's really itchy.");

    ({ state, texts, parts } = play([text(state.prefill), text(state.prefill)], state));
    expect(texts.at(-1)).toMatch(/send a photo/);
    expect(state.waiting).toBe('photo');

    ({ state, parts } = play([{ type: 'photo' }], state));
    expect(parts[0].action).toBe('video');
    expect(state.waiting).toBe('video');
    expect(getVideoLine(state, NAME)).toBe(
      "Hi there, can you show me the rash on Sarah's left upper arm?",
    );

    ({ state, parts } = play([{ type: 'videoEnded' }], state));
    expect(parts[0].text).toMatch(/contact dermatitis/);
    expect(parts[1].careLevels).toBe(true);
    expect(state.prefill).toBe('Thank you for the information.');

    ({ state, parts } = play([text(state.prefill)], state));
    expect(parts[1].summaryCard).toBe(true);
    expect(state.waiting).toBe('done');
    expect(state.completedAt).not.toBeNull();
    expect(getSummary(state).condition).toBe('Likely contact dermatitis');
  });

  it.each([
    ['She has burning when she pees', 'infection', /urinary tract infection/],
    ['She has a cough and a runny nose', 'cold', /common cold/],
    ['She has a fever', 'fever', /mild virus/],
  ])('"%s" follows the %s path to a summary', (first, pathId, conclusion) => {
    let { state } = play([text(first)]);
    expect(state.pathId).toBe(pathId);
    let result = play([text(state.prefill), text(state.prefill)], state);
    expect(result.texts.at(-1)).toMatch(conclusion);
    expect(result.parts.some((p) => p.careLevels)).toBe(true);
    result = play([text(result.state.prefill)], result.state);
    expect(result.state.waiting).toBe('done');
    expect(getSummary(result.state)).not.toBeNull();
  });

  it('replies naturally and waits when nothing matches', () => {
    const { texts, state } = play([text('She is not feeling well')]);
    expect(texts[0]).toBe(
      'I can help with that. Can you tell me what Sarah is experiencing and when it started?',
    );
    expect(state.pathId).toBeNull();
    expect(state.prefill).toBe('');
  });

  it('shows the 911 alert only when emergency words are typed', () => {
    const { parts, state } = play([text('She has chest pain')]);
    expect(parts[0].alert).toBe('er');
    expect(state.escalation).toBe('er');
    // MinuteTwin's own messages mention swelling, but that never triggers it.
    const rash = play([text('rash'), text('yesterday'), text('no fever')]);
    expect(rash.parts.some((p) => p.alert)).toBe(false);
  });

  it('nudges instead of skipping ahead when waiting for a photo or the video', () => {
    let { state } = play([text('rash'), text('yesterday'), text('detergent')]);
    expect(play([text('ok')], state).texts[0]).toMatch(/camera button/);
    ({ state } = play([{ type: 'photo' }], state));
    expect(play([text('ok')], state).texts[0]).toMatch(/Start video call/);
  });

  it('matches whole words only', () => {
    expect(play([text('It started early this morning')]).state.pathId).toBeNull();
  });
});
