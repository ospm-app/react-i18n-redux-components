import { memo, type JSX, type ComponentType } from 'react';

function F_SvgRight(): JSX.Element {
  return (
    <svg viewBox='0 0 24 24'>
      <path
        fill='currentColor'
        fillRule='evenodd'
        clipRule='evenodd'
        d='M8.59998 7.4L9.99998 6L16 12L9.99998 18L8.59998 16.6L13.2 12L8.59998 7.4Z'
      />
    </svg>
  );
}

export const SvgRight: ComponentType = memo(F_SvgRight);
