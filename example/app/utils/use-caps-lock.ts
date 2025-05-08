import { type KeyboardEventHandler, useCallback, useState } from 'react';

export function useCapsLock(): [
  boolean,
  KeyboardEventHandler<HTMLInputElement>,
  ] {
  const [capsLock, setCapsLock] = useState<boolean>(false);

  const onKeyEvent = useCallback<KeyboardEventHandler<HTMLInputElement>>(
    (event) => {
      const flag = event.getModifierState('CapsLock');
      const key = event.key === 'CapsLock';

      setCapsLock((prevValue: boolean): boolean => {
        if (prevValue && key) {
          return false;
        }

        return flag && !key;
      });
    },
    []
  );

  return [capsLock, onKeyEvent];
}
