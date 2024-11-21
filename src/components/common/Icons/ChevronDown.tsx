import React from 'react';

const ChevronDown = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg width='12' height='8' viewBox='0 0 12 8' fill='none' {...props}>
      <path
        d='M1 1L6 6L11 1'
        stroke='#808080'
        strokeWidth='2'
        strokeLinecap='round'
      />
    </svg>
  );
};

export default ChevronDown;

export const ChevronDownTriangle = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='40'
      height='12'
      viewBox='0 0 40 12'
      fill='none'
      {...props}
    >
      <path
        d='M20.605 9.302a.8.8 0 0 1-1.21 0L15.95 5.324A.8.8 0 0 1 16.555 4h6.89a.8.8 0 0 1 .605 1.324l-3.445 3.978z'
        fill='#888'
      />
    </svg>
  );
};
