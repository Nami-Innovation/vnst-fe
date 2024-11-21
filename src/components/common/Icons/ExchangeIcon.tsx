import React from 'react';

const ExchangeIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
      {...props}
    >
      <path
        d='M4.16667 13.1C4.76123 14.4051 5.77121 15.4848 7.04442 16.1767C8.31767 16.8686 9.7851 17.1349 11.2257 16.9356C13.5801 16.61 15.2212 14.9049 17 13.3358M17 17V13.1H13.5M15.8333 7.89999C15.2388 6.59491 14.2288 5.51512 12.9556 4.8233C11.6823 4.13147 10.2149 3.86511 8.7743 4.06434C6.41981 4.38993 4.77879 6.0951 3 7.66419M3 4L3 7.89999H6.5'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
        className='stroke-current group-hover:stroke-primary'
      />
    </svg>
  );
};

export default ExchangeIcon;
