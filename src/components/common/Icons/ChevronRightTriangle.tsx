import React from 'react';
import { TIconsProps } from '../types/type-icon';

const ChevronRightTriangle = ({ width, height, fill }: TIconsProps) => {
  return (
    <svg
      width={width || '24'}
      height={height || '24'}
      viewBox='0 0 24 24'
      fill='currentColor'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M15.3017 11.3953C15.6701 11.7143 15.6701 12.2857 15.3017 12.6047L11.3237 16.0498C10.8056 16.4985 10 16.1304 10 15.445L10 8.55497C10 7.86957 10.8056 7.50152 11.3237 7.95023L15.3017 11.3953Z'
        fill={fill || 'currentColor'}
      />
    </svg>
  );
};

export default ChevronRightTriangle;
