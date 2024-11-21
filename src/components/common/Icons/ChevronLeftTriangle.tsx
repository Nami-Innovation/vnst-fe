import React from 'react';
import { TIconsProps } from '../types/type-icon';

const ChevronLeftTriangle = ({ width, height, className }: TIconsProps) => {
  return (
    <svg
      width={width || '12'}
      height={height || '12'}
      viewBox='0 0 12 12'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path xmlns="http://www.w3.org/2000/svg" d="M2.698 6.605a.8.8 0 0 1 0-1.21L6.676 1.95A.8.8 0 0 1 8 2.555v6.89a.8.8 0 0 1-1.324.605L2.698 6.605z" fill="currentColor"/>
    </svg>
  );
};

export default ChevronLeftTriangle;
