import {
  memo,
  useRef,
  useMemo,
  type JSX,
  useCallback,
  type ReactNode,
  type ComponentType,
  type HTMLAttributes,
  type DetailedHTMLProps,
} from 'react';
import classnames from 'classnames';

function getWindowInnerWidth(): number {
  return window.innerWidth;
}

export type AspectRatios = {
  '320': {
    w: number;
    h: number;
  };
  '360': {
    w: number;
    h: number;
  };
  '390': {
    w: number;
    h: number;
  };
  '412': {
    w: number;
    h: number;
  };
  '430': {
    w: number;
    h: number;
  };
  sm: {
    h: number;
    w: number;
  };
  md: {
    h: number;
    w: number;
  };
  lg: {
    h: number;
    w: number;
  };
  xl: {
    h: number;
    w: number;
  };
  '2xl': {
    h: number;
    w: number;
  };
};

type Props = Omit<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  'style'
> & {
  children: ReactNode;
  aspectRatios: AspectRatios;
  maxWidth?: number | undefined;
  // minHeight?: number | undefined
  // maxContainerWidth?: number | undefined
};

function F_AspectRatioContainer({
  children,
  maxWidth,
  aspectRatios,
  ...props
}: Props): JSX.Element {
  const divRef = useRef<HTMLDivElement>(null);

  const getRatio = useCallback<
    () => {
      h: number;
      w: number;
    }
  >(() => {
    let screenWidth =
      typeof document === 'undefined' ? 320 : getWindowInnerWidth();

    if (typeof maxWidth !== 'undefined' && screenWidth >= maxWidth) {
      screenWidth = maxWidth;
    }

    if (screenWidth < 359) {
      return aspectRatios['320'];
    }

    if (screenWidth < 389) {
      return aspectRatios['360'];
    }

    if (screenWidth < 411) {
      return aspectRatios['390'];
    }

    if (screenWidth < 429) {
      return aspectRatios['412'];
    }

    if (screenWidth < 640) {
      return aspectRatios['430'];
    }

    if (screenWidth < 768) {
      return aspectRatios.sm;
    }

    if (screenWidth < 1024) {
      return aspectRatios.md;
    }

    if (screenWidth < 1280) {
      return aspectRatios.lg;
    }

    if (screenWidth < 1536) {
      return aspectRatios.xl;
    }

    return aspectRatios['320'];
  }, [aspectRatios, maxWidth]);

  const aspectRatioClassName = useMemo<string>(() => {
    const aspectRatio = getRatio();

    // eslint-disable-next-line tailwindcss/no-custom-classname
    return classnames(
      `aspect-w-${aspectRatio.w} aspect-h-${aspectRatio.h}`,
      props.className
    );
  }, [getRatio, props.className]);

  return (
    <div ref={divRef} className={aspectRatioClassName} {...props}>
      {children}
    </div>
  );
}

export const AspectRatioContainer: ComponentType<Props> = memo<Props>(
  F_AspectRatioContainer
);
