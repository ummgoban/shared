import React, {FC} from 'react';

/**
 * 객체 형태로 provider와 props를 명시적으로 받을 수 있는 타입
 */
export type ProviderEntry<T extends React.ComponentType<any>> = {
  provider: T;
  props?: React.ComponentProps<T>;
};

/**
 * 여러 ProviderEntry를 타입 안전하게 받을 수 있는 제네릭 Providers 타입 정의
 */
export type Providers<T extends readonly ProviderEntry<any>[]> = T;

/**
 * 여러 Provider를 조합하여 단일 Provider로 반환하는 함수
 * @example
 * ```tsx
 * // root-provider.tsx
 * import { ThemeProvider } from './ThemeProvider';
 * import { TestProvider } from './TestProvider';
 *
 * const providers = [
 *   {provider: ThemeProvider, props: {value: {theme: 'dark'}}},
 *   {provider: TestProvider, props: {value: {value: 'test'}}},
 * ]  satisfies Providers<[
 *   ProviderEntry<typeof ThemeProvider>,
 *   ProviderEntry<typeof TestProvider>,
 * ]>;
 *
 * const CombineProviders = combineProviders(providers);
 *
 * const RootProvider: FC<{children: React.ReactNode}> = ({children}) => {
 *  return (
 *   <CombineProviders>
 *     {children}
 *   </CombineProviders>
 *  )
 * }
 * ```
 * @example
 * ```tsx
 * providers[0].props = { theme: 123 }; // 오류: theme은 string이어야 함
 * ```
 */
export const combineProviders = <T extends readonly ProviderEntry<any>[]>(
  providers: Providers<T>,
): FC<{children: React.ReactNode}> =>
  providers.reduce(
    (AccumulatedProviders, {provider: Provider, props = {}}) => {
      return ({children}: {children: React.ReactNode}) => (
        <AccumulatedProviders>
          <Provider {...props}>{children}</Provider>
        </AccumulatedProviders>
      );
    },
    ({children}: {children: React.ReactNode}) => <>{children}</>,
  );
