import {createContext, useContext} from 'react';
import {render} from '@testing-library/react';

import {combineProviders} from './combine-provider';

const TestContext = createContext<{value: string} | undefined>(undefined);

const ThemeContext = createContext<{theme: string} | undefined>(undefined);

const TestProvider = TestContext.Provider;
const ThemeProvider = ThemeContext.Provider;

const TestComponent = () => {
  const context = useContext(TestContext);
  if (!context) return <div>no context</div>;
  return <div>{context.value}</div>;
};

const TestMultiComponent = () => {
  const context = useContext(TestContext);
  const themeContext = useContext(ThemeContext);
  if (!context) return <div>no context</div>;
  return (
    <div>
      {context.value} {themeContext?.theme}
    </div>
  );
};

describe('CombineProviders', () => {
  it('should render children', () => {
    const CombineProviders = combineProviders([[TestProvider, {value: {value: 'test'}}]]);
    const {container} = render(
      <CombineProviders>
        <TestComponent />
      </CombineProviders>,
    );
    expect(container).toHaveTextContent('test');
  });

  it('should render children with multiple providers', () => {
    const CombineProviders = combineProviders([
      [TestProvider, {value: {value: 'test'}}],
      [ThemeProvider, {value: {theme: 'dark'}}],
    ]);
    const {container} = render(
      <CombineProviders>
        <TestMultiComponent />
      </CombineProviders>,
    );
    expect(container).toHaveTextContent('test');
    expect(container).toHaveTextContent('dark');
  });
});
