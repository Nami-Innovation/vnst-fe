import React from 'react';
import { TIconsProps } from '../types/type-icon';

const PlusCircle = ({ width, height }: TIconsProps) => {
  return (
    <svg
      width={width || '24'}
      height={height || '24'}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M11.9961 20C16.3809 20 20 16.3791 20 12C20 7.62089 16.3731 4 11.9884 4C7.61141 4 4 7.62089 4 12C4 16.3791 7.61914 20 11.9961 20ZM11.9961 18.4062C8.44659 18.4062 5.60851 15.5513 5.60851 12C5.60851 8.44874 8.44659 5.60155 11.9884 5.60155C15.5379 5.60155 18.3915 8.44874 18.3992 12C18.407 15.5513 15.5457 18.4062 11.9961 18.4062ZM9.14258 12.735H11.2615V14.8627C11.2615 15.2882 11.5631 15.5899 11.9807 15.5899C12.4137 15.5899 12.7231 15.2882 12.7231 14.8627V12.735H14.8497C15.275 12.735 15.5843 12.4333 15.5843 12.0077C15.5843 11.5822 15.2827 11.2727 14.8497 11.2727H12.7231V9.14507C12.7231 8.7118 12.4137 8.41006 11.9807 8.41006C11.5631 8.41006 11.2615 8.7118 11.2615 9.14507V11.2727H9.14258C8.70179 11.2727 8.40019 11.5822 8.40019 12.0077C8.40019 12.4333 8.70952 12.735 9.14258 12.735Z'
        fill='black'
      />
    </svg>
  );
};

export default PlusCircle;
