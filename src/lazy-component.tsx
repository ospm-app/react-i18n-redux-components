import { type FunctionComponent, useEffect, useState, type JSX } from 'react';

import { reactMemo } from 'utils/react-memo.ts';

type Props<T> = {
  lazy(): Promise<{
    default: FunctionComponent<Omit<Props<T> & T, 'lazy' | 'fallback'>>;
  }>;
  fallback?: JSX.Element | undefined;
};

// export type LazyLoadComponent<T> = ReturnType<Props<T>['lazy']>

function F_LazyComponent<T>({
  lazy,
  fallback,
  ...rest
}: Props<T> & T): JSX.Element | null {
  const [Component, setComponent] = useState<FunctionComponent<
    Omit<Props<T> & T, 'lazy' | 'fallback'>
  > | null>(null);

  useEffect((): void => {
    lazy()
      .then((data) => {
        setComponent(data.default);

        return;
      })
      .catch((err: unknown): void => {
        if (err instanceof Error) {
          console.error(err.message);
        } else if (typeof err === 'string') {
          console.error(new Error(err));
        } else {
          console.error(new Error(JSON.stringify(err)));
        }

        setComponent(null);
      });
  }, [lazy]);

  if (Component !== null) {
    return <Component {...rest} />;
  }

  if (typeof fallback !== 'undefined') {
    return fallback;
  }

  return null;
}

export const LazyComponent = reactMemo(F_LazyComponent);
