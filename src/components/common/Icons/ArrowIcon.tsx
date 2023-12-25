import React from 'react';
import { TIconsProps } from '../types/type-icon';

export const ArrowLeft = ({ width, height }: TIconsProps) => {
  return (
    <svg
      width={width || '24'}
      height={height || '24'}
      viewBox='0 0 24 24'
      fill='currentColor'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M4 11.8203C4 12.084 4.11426 12.3477 4.31641 12.541L10.1172 18.333C10.3281 18.5352 10.5566 18.6318 10.8115 18.6318C11.3652 18.6318 11.7695 18.2363 11.7695 17.7002C11.7695 17.4189 11.6641 17.1816 11.4795 17.0059L9.50195 15.002L6.95312 12.6729L9.00098 12.7959H19.6533C20.2334 12.7959 20.6377 12.3916 20.6377 11.8203C20.6377 11.2402 20.2334 10.8359 19.6533 10.8359H9.00098L6.96191 10.959L9.50195 8.62988L11.4795 6.62598C11.6641 6.4502 11.7695 6.21289 11.7695 5.93164C11.7695 5.39551 11.3652 5 10.8115 5C10.5566 5 10.3193 5.09668 10.0908 5.31641L4.31641 11.0908C4.11426 11.2842 4 11.5479 4 11.8203Z'
        fill='currentColor'
      />
    </svg>
  );
};

export const ArrowRight = ({ width, height }: TIconsProps) => {
  return (
    <svg
      width={width || '24'}
      height={height || '24'}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M20.6377 11.8203C20.6377 11.5479 20.5234 11.2842 20.3213 11.0908L14.5469 5.31641C14.3184 5.09668 14.0811 5 13.835 5C13.2725 5 12.8682 5.39551 12.8682 5.93164C12.8682 6.21289 12.9824 6.4502 13.1582 6.62598L15.1357 8.62988L17.6846 10.959L15.6455 10.8359H4.99316C4.4043 10.8359 4 11.2402 4 11.8203C4 12.3916 4.4043 12.7959 4.99316 12.7959H15.6455L17.6846 12.6729L15.1357 15.002L13.1582 17.0059C12.9824 17.1816 12.8682 17.4189 12.8682 17.7002C12.8682 18.2363 13.2725 18.6318 13.835 18.6318C14.0811 18.6318 14.3184 18.5352 14.5293 18.333L20.3213 12.541C20.5234 12.3477 20.6377 12.084 20.6377 11.8203Z'
        fill='black'
      />
    </svg>
  );
};
const ArrowTop = ({ width, height }: TIconsProps) => {
  return (
    <svg
      width={width || '24'}
      height={height || '24'}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M11.8203 20.6904C12.3916 20.6904 12.7959 20.2861 12.7959 19.7061V8.85156L12.7256 6.95312L15.002 9.49316L17.0059 11.4795C17.1816 11.6553 17.4277 11.7695 17.7002 11.7695C18.2363 11.7695 18.6406 11.3652 18.6406 10.8115C18.6406 10.5566 18.5439 10.3193 18.333 10.1084L12.541 4.30762C12.3477 4.10547 12.084 4 11.8203 4C11.5479 4 11.2842 4.10547 11.0908 4.30762L5.30762 10.1084C5.09668 10.3193 5 10.5566 5 10.8115C5 11.3652 5.39551 11.7695 5.93164 11.7695C6.21289 11.7695 6.45898 11.6553 6.63477 11.4795L8.62988 9.49316L10.915 6.94434L10.8359 8.85156V19.7061C10.8359 20.2861 11.2402 20.6904 11.8203 20.6904Z'
        fill='black'
      />
    </svg>
  );
};
export const ArrowBottom = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M11.8203 4C11.2402 4 10.8359 4.4043 10.8359 4.98438V15.8389L10.915 17.7461L8.62988 15.1973L6.63477 13.2109C6.45898 13.0352 6.21289 12.9209 5.93164 12.9209C5.39551 12.9209 5 13.3252 5 13.8789C5 14.1338 5.09668 14.3711 5.30762 14.582L11.0908 20.3828C11.2842 20.585 11.5479 20.6904 11.8203 20.6904C12.084 20.6904 12.3477 20.585 12.541 20.3828L18.333 14.582C18.5439 14.3711 18.6406 14.1338 18.6406 13.8789C18.6406 13.3252 18.2363 12.9209 17.7002 12.9209C17.4277 12.9209 17.1816 13.0352 17.0059 13.2109L15.002 15.1973L12.7256 17.7373L12.7959 15.8389V4.98438C12.7959 4.4043 12.3916 4 11.8203 4Z'
        fill='currentColor'
      />
    </svg>
  );
};

export const ArrowIcon = {
  left: ArrowLeft,
  right: ArrowRight,
  top: ArrowTop,
  bottom: ArrowBottom,
};