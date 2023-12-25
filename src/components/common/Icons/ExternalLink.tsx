import React from 'react';

const ExternalLink = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width='15'
      height='15'
      viewBox='0 0 15 15'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        id='Vector'
        d='M5.33358 2.16683H3.83358C2.90016 2.16683 2.4331 2.16683 2.07658 2.34849C1.76297 2.50827 1.50819 2.76305 1.34841 3.07666C1.16675 3.43318 1.16675 3.90024 1.16675 4.83366V11.167C1.16675 12.1004 1.16675 12.5669 1.34841 12.9234C1.50819 13.237 1.76297 13.4922 2.07658 13.652C2.43275 13.8335 2.89924 13.8335 3.83084 13.8335H10.1693C11.1009 13.8335 11.5667 13.8335 11.9229 13.652C12.2365 13.4922 12.4922 13.2367 12.6519 12.9232C12.8334 12.567 12.8334 12.101 12.8334 11.1694V9.66683M13.6667 5.50016V1.3335M13.6667 1.3335H9.50008M13.6667 1.3335L7.83341 7.16683'
        stroke='currentColor'
        className='group-hover:stroke-gradient stroke-current'
        strokeWidth='2'
        strokeLinecap='round'
        stroke-linejoin='round'
      />
    </svg>
  );
};

export default ExternalLink;
