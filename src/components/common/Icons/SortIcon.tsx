import React from 'react';
import { TIconsProps } from '../types/type-icon';

const SortIcon = ({ width, height }: TIconsProps) => {
  return (
    <svg
      width={width || '24'}
      height={height || '24'}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M9.13873 14.3195L11.3735 17.6478C11.6873 18.1152 12.3102 18.1196 12.624 17.6478L14.8588 14.3195C15.1869 13.8261 14.9206 13.337 14.293 13.337L9.70456 13.337C9.06741 13.337 8.82016 13.8347 9.13873 14.3195ZM11.3735 6.35383L9.13873 9.67781C8.82016 10.1626 9.06741 10.6603 9.70456 10.6603L14.293 10.6603C14.9206 10.6603 15.1869 10.1712 14.8588 9.67781L12.624 6.35383C12.3102 5.87774 11.6873 5.88639 11.3735 6.35383Z'
        fill='black'
      />
    </svg>
  );
};

export default SortIcon;
