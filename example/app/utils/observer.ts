import { createCustomEvent } from 'utils/events';
import { isBrowser } from 'utils/is-browser';

function observerCallback(
  entries: ReadonlyArray<IntersectionObserverEntry>,
  observer: IntersectionObserver
): void {
  for (const entry of entries) {
    if (entry.intersectionRatio > 0) {
      observer.unobserve(entry.target);

      entry.target.dispatchEvent(
        createCustomEvent('lazyImage', {
          detail: entry
        })
      );
    }
  }
}

export const observer =
  isBrowser === true
    ? new IntersectionObserver(observerCallback, { rootMargin: '300px 0px' })
    : undefined;
