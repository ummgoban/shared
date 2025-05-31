import React, {FC} from 'react';

type Providers = [React.ComponentType<any>, React.ComponentProps<any>?][];

export const combineProviders = (providers: Providers): FC<{children: React.ReactNode}> =>
  providers.reduce(
    (AccumulatedProviders, [Provider, props = {}]) =>
      ({children}: {children: React.ReactNode}) => (
        <AccumulatedProviders>
          <Provider {...props}>
            <>{children}</>
          </Provider>
        </AccumulatedProviders>
      ),
    ({children}: {children: React.ReactNode}) => <>{children}</>,
  );
