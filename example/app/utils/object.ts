function isObject(obj: unknown): obj is Record<string, unknown> {
  return (
    typeof obj !== 'undefined' && typeof obj === 'object' && !Array.isArray(obj)
  );
}

export function mergeDeep<D, S>(dest: D, source: Readonly<S>): D & S {
  type R = D & S;

  const target: R = dest as R;

  if (isObject(dest) && isObject(source)) {
    for (const [key, value] of Object.entries<S[keyof S]>(source)) {
      if (isObject(value)) {
        if (
          !Object.prototype.hasOwnProperty.call(target, key) ||
          !isObject(target[key as keyof R])
        ) {
          target[key as keyof R] = {} as R[keyof R];
        }

        mergeDeep(target[key as keyof R], value);
      } else {
        target[key as keyof R] = value as R[keyof R];
      }
    }
  }

  return target;
}
