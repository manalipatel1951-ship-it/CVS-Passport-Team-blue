import { buildSummary, initialChatState, matchReply, videoLine } from './matchReply.js';

const send = (text, state = initialChatState) => matchReply({ text }, state, 'Sarah');

describe('smart-fake AI nurse', () => {
  it('sends emergencies straight to 911 / the ER', () => {
    const r = send('She has chest pain and feels dizzy');
    expect(r.alert).toBe('er');
    expect(r.reply).toMatch(/911/);
    expect(r.state.escalation).toBe('er');
  });

  it('recognizes a topic and uses the loved one’s name', () => {
    const r = send('Mom has a rash on her arm');
    expect(r.state.topicId).toBe('rash');
    expect(r.reply).toContain('Sarah');
    expect(r.alert).toBeNull();
  });

  it('walks through the topic replies, then wraps up', () => {
    let r = send('sore throat');
    r = send('since yesterday', r.state);
    expect(r.state.step).toBe(2);
    r = send('no white spots', r.state);
    expect(r.reply).toMatch(/summary/i);
  });

  it('recommends in-person care when things are getting worse', () => {
    const first = send('she has a rash');
    const r = send('it is spreading', first.state);
    expect(r.alert).toBe('urgent');
    expect(buildSummary(r.state).escalation).toBe('urgent');
  });

  it('matches whole words only', () => {
    expect(send('it started early this morning').state.topicId).toBeNull();
    expect(send('question about her blood pressure pill').alert).toBeNull();
  });

  it('asks again, then suggests an in-person visit when it does not understand', () => {
    const first = send('hmm');
    expect(first.reply).toMatch(/understand/);
    expect(send('not sure', first.state).reply).toMatch(/in person/);
  });

  it('acknowledges photos', () => {
    const r = matchReply({ isPhoto: true }, initialChatState, 'Sarah');
    expect(r.reply).toMatch(/photo/);
  });

  it('builds a summary and video line for the topic', () => {
    const { state } = send('she has a rash');
    expect(buildSummary(state).recommendations.length).toBeGreaterThan(0);
    expect(videoLine(state)).toMatch(/rash/);
    expect(buildSummary(initialChatState).title).toBe('General question');
  });
});
