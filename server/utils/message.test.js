const expect = require('expect');
const { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
  it('should generate the correct message object', () => {
    const from = 'mike@example.com';
    const text = 'Hello there!';
    const response = generateMessage(from, text);

    expect(response).toMatchObject({from, text});
    expect(typeof response.createdAt).toBe('number');
  });
});

describe('generateLocationMessage', () => {
  it('should generate the correct location object', () => {
    const from = 'Admin';
    const latitude = 12;
    const longitude = 103.82012259999999;
    const response = generateLocationMessage(from, latitude, longitude);
    const expectedUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
    
    expect(typeof response.createdAt).toBe('number');
    expect(response.url).toBe(expectedUrl);
  });
});