import React from 'react';
import { TIconsProps } from '../types/type-icon';

const ChevronLeftTriangle = ({ width, height }: TIconsProps) => {
  return (
    <svg
      width={width || '24'}
      height={height || '24'}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M8.6983 12.6047C8.32993 12.2857 8.32993 11.7143 8.6983 11.3953L12.6763 7.95022C13.1944 7.50152 14 7.86957 14 8.55497L14 15.445C14 16.1304 13.1944 16.4985 12.6763 16.0498L8.6983 12.6047Z'
        fill='currentColor'
      />
    </svg>
  );
};

export default ChevronLeftTriangle;
