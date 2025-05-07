/* eslint-disable @typescript-eslint/no-unsafe-function-type */
const Cache = Map;

function isEqualArrays(
  a: ReadonlyArray<unknown>,
  b: ReadonlyArray<unknown>
): boolean {
  if (a.length !== b.length) {
    return false;
  }

  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) {
      return false;
    }
  }

  return true;
}

// biome-ignore lint/complexity/noBannedTypes: <explanation>
interface FunctionAny extends Function {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (this: any, ...args: ReadonlyArray<any>): any;
}

type FunctionMemoized<Fn> = Fn & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cache: Map<string, any>;
};

export function memoize<Fn extends FunctionAny>(func: Fn): Fn {
  if (typeof func !== 'function') {
    throw new TypeError('Expected a function');
  }

  const memoized = function memoized(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this: any,

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...args: ReadonlyArray<any>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): any {
    const { cache } = memoized;

    if (
      cache.has('args') &&
      isEqualArrays(cache.get('args') as ReadonlyArray<unknown>, args)
    ) {
      return cache.get('result');
    }

    const result = func.apply(this, args);

    memoized.cache = cache.set('args', args).set('result', result);

    return result;
  };

  memoized.cache = new Cache();

  return memoized as FunctionMemoized<Fn>;
}
