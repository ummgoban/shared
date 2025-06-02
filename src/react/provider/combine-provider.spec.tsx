import {createContext, useContext} from 'react';
import {render, screen} from '@testing-library/react';
import {describe, it, expect} from 'vitest';

import {combineProviders, ProviderEntry, Providers} from './combine-provider';

const TestContext = createContext<{value: string} | undefined>(undefined);
const ThemeContext = createContext<{theme: string} | undefined>(undefined);

const TestProvider = TestContext.Provider;
const ThemeProvider = ThemeContext.Provider;

const TestComponent = () => {
  const context = useContext(TestContext);
  if (!context) return <div>no context</div>;
  return <div data-testid="test-component">{context.value}</div>;
};

const TestMultiComponent = () => {
  const context = useContext(TestContext);
  const themeContext = useContext(ThemeContext);
  if (!context) return <div>no context</div>;
  return (
    <div data-testid="multi-component">
      {context.value} {themeContext?.theme}
    </div>
  );
};

describe('CombineProviders', () => {
  it('should render children with a single provider', () => {
    const providers = [{provider: TestProvider, props: {value: {value: 'test'}}}] satisfies Providers<
      [ProviderEntry<typeof TestProvider>]
    >;
    const CombineProviders = combineProviders(providers);

    render(
      <CombineProviders>
        <TestComponent />
      </CombineProviders>,
    );
    expect(screen.getByTestId('test-component')).toHaveTextContent('test');
  });

  it('should render children with multiple providers', () => {
    const providers = [
      {provider: TestProvider, props: {value: {value: 'test'}}},
      {provider: ThemeProvider, props: {value: {theme: 'dark'}}},
    ] satisfies Providers<[ProviderEntry<typeof TestProvider>, ProviderEntry<typeof ThemeProvider>]>;
    const CombineProviders = combineProviders(providers);

    render(
      <CombineProviders>
        <TestMultiComponent />
      </CombineProviders>,
    );

    const component = screen.getByTestId('multi-component');
    expect(component).toHaveTextContent('test');
    expect(component).toHaveTextContent('dark');
  });
});
