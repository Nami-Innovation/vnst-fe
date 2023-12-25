import React from 'react';

const ChevronBottomTriangle = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg width='12' height='12' viewBox='0 0 12 12' fill='none' {...props}>
      <path
        d='M6.60474 9.3017C6.28573 9.67007 5.71427 9.67007 5.39526 9.3017L1.95023 5.32372C1.50153 4.80561 1.86957 4 2.55497 4L9.44503 4C10.1304 4 10.4985 4.80561 10.0498 5.32372L6.60474 9.3017Z'
        fill='currentColor'
      />
    </svg>
  );
};

export default ChevronBottomTriangle;
