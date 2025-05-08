import { memo } from 'react';

type IdentityFunction = <T>(fn: T) => T

export const reactMemo = memo as IdentityFunction;
