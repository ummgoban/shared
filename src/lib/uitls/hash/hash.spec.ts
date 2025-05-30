import {to6DigitHash} from './hash';

describe('to6DigitHash', () => {
  it('should return a 6-digit hash', () => {
    const hash = to6DigitHash('test');
    expect(hash).toHaveLength(6);
  });
});
