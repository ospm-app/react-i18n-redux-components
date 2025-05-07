import { memo, type JSX, type ComponentType } from 'react';

function F_SvgLeft(): JSX.Element {
  return (
    <svg viewBox='0 0 24 24'>
      <path
        fill='currentColor'
        fillRule='evenodd'
        clipRule='evenodd'
        d='M15.4 7.4L14 6L8 12L14 18L15.4 16.6L10.8 12L15.4 7.4Z'
      />
    </svg>
  );
}

export const SvgLeft: ComponentType = memo(F_SvgLeft);
