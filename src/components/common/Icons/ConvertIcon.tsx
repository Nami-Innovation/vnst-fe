import React from 'react';

const ConvertIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg width='18' height='14' viewBox='0 0 18 14' fill='none' {...props}>
      <path
        d='M1 1L9 6L17 1M1 7L9 12L17 7'
        className='stroke-current'
        strokeWidth='2'
        strokeLinecap='round'
      />
    </svg>
  );
};

export default ConvertIcon;
