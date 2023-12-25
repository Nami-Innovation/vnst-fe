import React from 'react';
import { TIconsProps } from '../types/type-icon';

const ChevronLeft = ({ width, height }: TIconsProps) => {
  return (
    <svg
      width={width || '24'}
      height={height || '24'}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M8 12.7959C8 13.1035 8.11426 13.3672 8.36035 13.5957L15.1982 20.293C15.3916 20.4863 15.6377 20.5918 15.9277 20.5918C16.5078 20.5918 16.9736 20.1348 16.9736 19.5459C16.9736 19.2559 16.8506 19.001 16.6572 18.7988L10.4961 12.7959L16.6572 6.79297C16.8506 6.59082 16.9736 6.32715 16.9736 6.0459C16.9736 5.45703 16.5078 5 15.9277 5C15.6377 5 15.3916 5.10547 15.1982 5.29883L8.36035 11.9873C8.11426 12.2246 8 12.4883 8 12.7959Z'
        fill='currentColor'
      />
    </svg>
  );
};

export default ChevronLeft;
