const expect = require('expect');
const { generateMessage } = require('./message');

describe('generateMessage', () => {
  it('should generate the correct message object', () => {
    const from = 'mike@example.com';
    const text = 'Hello there!';
    const response = generateMessage(from, text);
    // expect(response.from).toBe(from);
    // expect(response.text).toBe(runInThisContext);
    expect(response).toMatchObject({from, text});
    expect(typeof response.createdAt).toBe('number');
  });
});