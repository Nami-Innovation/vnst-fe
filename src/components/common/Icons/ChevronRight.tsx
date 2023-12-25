import React from 'react';
import { TIconsProps } from '../types/type-icon';

const ChevronRight = ({ width, height }: TIconsProps) => {
  return (
    <svg
      width={width || '24'}
      height={height || '24'}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M16.9736 12.7959C16.9648 12.4883 16.8506 12.2246 16.6133 11.9873L9.77539 5.29883C9.57324 5.10547 9.33594 5 9.0459 5C8.45703 5 8 5.45703 8 6.0459C8 6.32715 8.11426 6.59082 8.31641 6.79297L14.4688 12.7959L8.31641 18.7988C8.11426 19.001 8 19.2559 8 19.5459C8 20.1348 8.45703 20.5918 9.0459 20.5918C9.32715 20.5918 9.57324 20.4863 9.77539 20.293L16.6133 13.5957C16.8594 13.3672 16.9736 13.1035 16.9736 12.7959Z'
        fill='currentColor'
      />
    </svg>
  );
};

export default ChevronRight;
