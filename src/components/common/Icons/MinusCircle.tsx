import React from 'react';
import { TIconsProps } from '../types/type-icon';

const MinusCircle = ({ width, height }: TIconsProps) => {
  return (
    <svg
      width={width || '24'}
      height={height || '24'}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M11.9961 20C16.3809 20 20 16.3791 20 12C20 7.62089 16.3731 4 11.9884 4C7.61141 4 4 7.62089 4 12C4 16.3791 7.61914 20 11.9961 20ZM11.9961 18.4062C8.44659 18.4062 5.60851 15.5513 5.60851 12C5.60851 8.44874 8.44659 5.60155 11.9884 5.60155C15.5379 5.60155 18.3915 8.44874 18.3992 12C18.407 15.5513 15.5457 18.4062 11.9961 18.4062ZM9.06525 12.7427H14.9193C15.3833 12.7427 15.7158 12.472 15.7158 12.0232C15.7158 11.5667 15.3987 11.2882 14.9193 11.2882H9.06525C8.59352 11.2882 8.26873 11.5667 8.26873 12.0232C8.26873 12.472 8.60126 12.7427 9.06525 12.7427Z'
        fill='black'
      />
    </svg>
  );
};

export default MinusCircle;
