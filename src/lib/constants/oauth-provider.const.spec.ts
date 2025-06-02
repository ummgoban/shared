import {convertOAuthProviderToKorean} from './oauth-provider.const';

describe('convertOAuthProviderToKorean', () => {
  it('should convert OAuth provider to Korean', () => {
    expect(convertOAuthProviderToKorean('KAKAO')).toBe('카카오');
    expect(convertOAuthProviderToKorean('NAVER')).toBe('네이버');
    expect(convertOAuthProviderToKorean('APPLE')).toBe('애플');
    expect(convertOAuthProviderToKorean('BASIC')).toBe('일반회원');
  });
});
