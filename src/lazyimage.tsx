import {
  memo,
  useRef,
  useMemo,
  useState,
  type JSX,
  useEffect,
  useCallback,
  type ComponentType,
  type DetailedHTMLProps,
  type ImgHTMLAttributes,
} from 'react';

import { noop } from 'utils/noop.ts';
import { isBrowser } from 'utils/is-browser.ts';
import { createCustomEvent } from 'utils/events.ts';

const placeholder =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';

function localObserverCallback(
  entries: ReadonlyArray<IntersectionObserverEntry>,
  observer: IntersectionObserver
): void {
  for (const entry of entries) {
    if (entry.intersectionRatio > 0) {
      observer.unobserve(entry.target);

      entry.target.dispatchEvent(
        createCustomEvent('lazyImage', {
          detail: entry,
        })
      );
    }
  }
}

export type Breakpoint = {
  id: string;
  path: string;
  type?: string | undefined;
  // without media image will be rendered for all devices without regarding their width, or pixel density.
  media?: string | undefined;
  blur?: string | undefined;
  // If width and height are not specified, the image will be loaded in its original size and aspect ratio.
  width?: number | undefined;
  // If width and height are not specified, the image will be loaded in its original size and aspect ratio.
  height?: number | undefined;
};

type Props = DetailedHTMLProps<
  ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
> & {
  alt: string; // required for accessibility
  rootMargin?: string;
  pictureClassName?: string | undefined;
  observer?: IntersectionObserver | undefined;
  readonly breakpoints: ReadonlyArray<Breakpoint>;
};

type Size = {
  path: string;
  blur: string;
  width?: number | undefined;
  height?: number | undefined;
};

function F_LazyImage({
  alt,
  observer,
  className,
  breakpoints,
  pictureClassName,
  rootMargin = '300px 0px',
  'aria-hidden': ariaHidden,
  ...props
}: Props): JSX.Element {
  const [image, setImage] = useState<Readonly<Size>>((): Size => {
    const img = breakpoints.length > 0 ? breakpoints[0] : undefined;

    return {
      path: img?.path ?? '',
      blur: img?.blur ?? placeholder,
      width: img?.width,
      height: img?.height,
    };
  });

  const [intersect, setIntersect] = useState<boolean>(false);

  const getSize = useCallback<() => Size>(() => {
    const size: Size = {
      path: '',
      blur: placeholder,
    };

    if (isBrowser) {
      for (const obj of breakpoints) {
        if (
          typeof obj.media === 'undefined' ||
          window.matchMedia(obj.media).matches
        ) {
          size.path = obj.path;
          size.blur = obj.blur ?? placeholder;
          size.width = obj.width;
          size.height = obj.height;

          break;
        }
      }
    }

    return size;
  }, [breakpoints]);

  useEffect((): void => {
    setImage(getSize());
  }, [getSize]);

  const obs = useMemo<IntersectionObserver | null>(() => {
    return isBrowser
      ? observer ||
          new window.IntersectionObserver(localObserverCallback, {
            rootMargin,
          })
      : null;
  }, [observer, rootMargin]);

  const onResize = useCallback<() => void>(() => {
    if (isBrowser) {
      setImage(getSize());
    }
  }, [getSize]);

  useEffect((): (() => void) => {
    if (isBrowser) {
      window.addEventListener('resize', onResize);

      return function cleanup(): void {
        window.removeEventListener('resize', onResize);
      };
    }

    return noop;
  }, [onResize]);

  const onIntersection = useCallback<() => void>(() => {
    setIntersect(true);

    setImage(getSize());
  }, [getSize]);

  const onError = useCallback<() => void>(() => {
    setImage({
      ...image,
      path: image.blur,
    });
  }, [image]);

  const picRef = useRef<HTMLPictureElement>(null);

  useEffect((): (() => void) => {
    if (isBrowser) {
      const picture = picRef.current;

      if (!intersect && picture !== null) {
        picture.addEventListener('lazyImage', onIntersection);

        if (obs !== null) {
          obs.observe(picture);
        }
      }

      return function cleanup(): void {
        if (picture !== null) {
          picture.removeEventListener('lazyImage', onIntersection);

          if (obs !== null) {
            obs.unobserve(picture);
          }
        }
      };
    }

    return noop;
  }, [obs, intersect, onIntersection]);

  return (
    <picture ref={picRef} className={pictureClassName}>
      {intersect
        ? breakpoints.map(
            ({ id, media, path, type }: Breakpoint): JSX.Element => {
              return (
                <source key={id} srcSet={path} media={media} type={type} />
              );
            }
          )
        : null}

      <img
        alt={alt}
        onError={onError}
        width={image.width}
        height={image.height}
        className={className}
        aria-hidden={Boolean(ariaHidden)}
        src={intersect ? image.path : image.blur}
        {...props}
      />
    </picture>
  );
}

export const LazyImage: ComponentType<Props> = memo<Props>(F_LazyImage);

export function extendsWithType(
  breakpoints: ReadonlyArray<Breakpoint>,
  ext: string,
  type: string
): ReadonlyArray<Breakpoint> {
  const items: Array<Breakpoint> = [];

  for (const breakpoint of breakpoints) {
    const item: Breakpoint = { ...breakpoint };

    item.path = item.path.slice(0, item.path.lastIndexOf('.') + 1) + ext;

    if (typeof item.blur !== 'undefined') {
      item.blur = item.blur.slice(0, item.blur.lastIndexOf('.') + 1) + ext;
    }

    item.type = type;

    items.push(item, breakpoint);
  }

  return items;
}

type MediaTemplate = {
  minWidth?: number | undefined;
  maxWidth?: number | undefined;
  minDevicePixelRatio?: number | undefined;
};

function makeDevicePixelRatioRules(
  rules: ReadonlyArray<string>,
  minDevicePixelRatio?: number | undefined
): string {
  // Get empty string if rules array is empty
  const rule = rules.join(' and ');

  if (typeof minDevicePixelRatio !== 'undefined') {
    const list: Array<string> = [
      `(min-device-pixel-ratio: ${minDevicePixelRatio})`,
      `(-webkit-min-device-pixel-ratio: ${minDevicePixelRatio})`,
      `(min--moz-device-pixel-ratio: ${minDevicePixelRatio})`,
      `(-o-min-device-pixel-ratio: ${minDevicePixelRatio})`,
    ];

    if (rule !== '') {
      for (let i = 0; i < list.length; ++i) {
        list[i] = `${rule} and ${list[i]}`;
      }
    }

    return list.join(', ');
  }

  return rule;
}

function makeMedia(params: Readonly<MediaTemplate>): string {
  const rules: Array<string> = [];

  if (typeof params.minWidth !== 'undefined') {
    rules.push(`(min-width: ${params.minWidth}px)`);
  }

  if (typeof params.maxWidth !== 'undefined') {
    rules.push(`(max-width: ${params.maxWidth}px)`);
  }

  if (typeof params.minDevicePixelRatio !== 'undefined') {
    return makeDevicePixelRatioRules(rules, params.minDevicePixelRatio);
  }

  return rules.join(' and ');
}

export type BreakpointTemplate = {
  id: string;
  media?: Readonly<MediaTemplate> | undefined;
  path: string;
  width?: number | undefined;
  height?: number | undefined;
  type?: string | undefined;
  blur?: string | undefined;
};

export function transformToBreakpoint(
  templates: ReadonlyArray<BreakpointTemplate>
): ReadonlyArray<Breakpoint> {
  const items: Array<Breakpoint> = [];

  for (const template of templates) {
    const { id, media, path, width, height, type, blur } = template;

    items.push({
      id,
      media: media ? makeMedia(media) : undefined,
      path,
      width,
      height,
      type,
      blur,
    });
  }

  return items;
}
