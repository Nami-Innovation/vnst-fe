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
