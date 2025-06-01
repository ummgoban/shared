import ApiClient from './api-client';
import type {ApiClientOptions} from './api-client';

describe('ApiClient', () => {
  it('should be defined', () => {
    expect(ApiClient).toBeDefined();
  });

  it('should throw error when getInstance is called before create', () => {
    expect(() => ApiClient.getInstance()).toThrowError(
      'ApiClient is not initialized:\nApiClient.create() must be called before getInstance()',
    );
  });

  it('should create instance', () => {
    const spyGetStorage = vi.fn(() => Promise.resolve(null));
    const spySetStorage = vi.fn(() => Promise.resolve());
    const spyRefreshAccessToken = vi.fn(() => Promise.resolve(null));

    const options: ApiClientOptions = {
      serverApiBaseUrl: 'https://api.example.com',
      sessionOptions: {
        getStorage: spyGetStorage,
        setStorage: spySetStorage,
        refreshAccessToken: spyRefreshAccessToken,
      },
    };
    const instance = ApiClient.create(options);
    expect(instance).toBeDefined();
    expect(spyGetStorage).not.toHaveBeenCalled();
    expect(spySetStorage).not.toHaveBeenCalled();
    expect(spyRefreshAccessToken).not.toHaveBeenCalled();
  });

  it('should get instance', () => {
    const options: ApiClientOptions = {
      serverApiBaseUrl: 'https://api.example.com',
      sessionOptions: {
        getStorage: () => Promise.resolve(null),
        setStorage: () => Promise.resolve(),
        refreshAccessToken: () => Promise.resolve(null),
      },
    };
    const instance = ApiClient.create(options);
    expect(ApiClient.getInstance()).toBe(instance);
  });
});
