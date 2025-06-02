import usePullDownRefresh from './use-pull-down-refresh';

import {act, renderHook} from '@testing-library/react';

describe('usePullDownRefresh', () => {
  let callbackPromise: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    callbackPromise = vi.fn().mockResolvedValue(undefined);
  });

  it('should call callback when onRefresh is called', async () => {
    const {result} = renderHook(() => usePullDownRefresh(callbackPromise));

    await act(async () => {
      await result.current.onRefresh();
    });

    expect(callbackPromise).toHaveBeenCalledTimes(1);
  });

  it('should set refreshing to true while refreshing and false when done', async () => {
    // 콜백 함수가 해결될 때까지 기다리는 프로미스 생성
    let resolveCallback: () => void;
    const waitForCallback = new Promise<void>(resolve => {
      resolveCallback = resolve;
    });

    callbackPromise = vi.fn().mockImplementation(() => waitForCallback);

    const {result} = renderHook(() => usePullDownRefresh(callbackPromise));

    // 초기 상태 확인
    expect(result.current.refreshing).toBe(false);

    // onRefresh 호출 시작
    let onRefreshPromise: Promise<void>;
    act(() => {
      onRefreshPromise = result.current.onRefresh();
    });

    // refreshing 상태가 true로 변경되었는지 확인
    expect(result.current.refreshing).toBe(true);

    // 콜백 함수 완료
    act(() => {
      resolveCallback();
    });

    // onRefresh가 완료될 때까지 기다림
    await act(async () => {
      await onRefreshPromise;
    });

    // refreshing 상태가 false로 돌아왔는지 확인
    expect(result.current.refreshing).toBe(false);
  });

  it('should handle errors and set refreshing to false', async () => {
    // 에러를 발생시키는 콜백 함수
    const error = new Error('Test error');
    callbackPromise = vi.fn().mockRejectedValue(error);

    // 콘솔 에러 모니터링
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const {result} = renderHook(() => usePullDownRefresh(callbackPromise));

    await act(async () => {
      await result.current.onRefresh();
    });

    // 에러가 콘솔에 기록되었는지 확인
    expect(consoleSpy).toHaveBeenCalledWith(error);

    // 에러가 발생해도 refreshing 상태가 false로 돌아왔는지 확인
    expect(result.current.refreshing).toBe(false);

    // 스파이 정리
    consoleSpy.mockRestore();
  });
});
