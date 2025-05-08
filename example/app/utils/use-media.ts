import { useMemo } from 'react';

import { noop } from 'utils/noop';
import { isBrowser } from 'utils/is-browser';

const mockMediaQueryList: MediaQueryList = {
  media: '',
  matches: false,
  onchange: noop,
  addListener: noop,
  addEventListener: noop,
  removeListener: noop,
  removeEventListener: noop,
  dispatchEvent(_event: Event): boolean {
    return true;
  }
};

export function useMedia(query: string): MediaQueryList {
  return useMemo<MediaQueryList>(() => {
    return isBrowser === true ? window.matchMedia(query) : mockMediaQueryList;
  }, [query]);
}
