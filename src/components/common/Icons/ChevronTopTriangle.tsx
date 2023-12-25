import React from 'react';

const ChevronTopTriangle = (props: React.SVGProps<SVGSVGElement>) => {
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
        d='M11.3953 8.6983C11.7143 8.32993 12.2857 8.32993 12.6047 8.6983L16.0498 12.6763C16.4985 13.1944 16.1304 14 15.445 14H8.55497C7.86957 14 7.50152 13.1944 7.95023 12.6763L11.3953 8.6983Z'
        fill='currentColor'
      />
    </svg>
  );
};

export default ChevronTopTriangle;
