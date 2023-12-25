import React from 'react';

const SwapIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='10'
      height='8'
      viewBox='0 0 10 8'
      fill='none'
      {...props}
    >
      <path
        d='M9 2.8H1L2.5 1'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M1 5.2002H9L7.5 7.0002'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default SwapIcon;
