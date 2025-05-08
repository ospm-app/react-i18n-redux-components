import { useEffect, useState } from 'react';

import { useMedia } from 'utils/use-media';

export function useTouch(): boolean {
  const media = useMedia('(hover: none), (pointer: none), (pointer: coarse)');

  const [matches, setMatches] = useState<boolean>(media.matches);

  useEffect((): (() => void) => {
    function onChange(this: MediaQueryList): void {
      setMatches(this.matches);
    }

    media.addListener(onChange);

    return function cleanup(): void {
      media.removeListener(onChange);
    };
  }, [media]);

  return matches;
}
