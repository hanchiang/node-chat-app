const expect = require('expect');

const { isRealString } = require('./validation');

describe('isRealString', () => {
  it('should reject non-string values', () => {
    const result = isRealString(123121312321);
    expect(result).toBe(false);
  });

  it('should reject string with only spaces', () => {
    const result = isRealString('     ');
    expect(result).toBe(false);
  });

  it('should allow strin with non-space characters', () => {
    const result = isRealString('hello');
    expect(result).toBe(true);
  });
});