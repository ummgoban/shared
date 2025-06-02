import {CustomError} from './http-error';

describe('CustomError', () => {
  it('should create an instance with error message ', () => {
    const error = new CustomError(new Error('test error message'));
    expect(error).toBeDefined();
    expect(error.message).toBe('test error message');
    expect(error.errorMessage).toBe('test error message');
  });
  it('should create an instance with default error message ', () => {
    const error = new CustomError(new Error());
    expect(error).toBeDefined();
    expect(error.message).toBe('서버에서 오류가 발생했어요. 문제가 지속된다면 문의주세요');
    expect(error.errorMessage).toBe('서버에서 오류가 발생했어요. 문제가 지속된다면 문의주세요');
  });
});
