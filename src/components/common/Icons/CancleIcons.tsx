import React from 'react';
import { TIconsProps } from '../types/type-icon';

const CancelIcons = ({
  width,
  height,
  fill,
  className,
  onClick,
}: TIconsProps) => {
  return (
    <svg
      onClick={onClick}
      className={className}
      width={width || '24'}
      height={height || '24'}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M5.33129 17.0052C4.89818 17.4381 4.87755 18.2113 5.3416 18.6546C5.78502 19.1186 6.56874 19.0979 7.00185 18.6649L12.0032 13.6649L17.0046 18.6649C17.448 19.1082 18.2111 19.1186 18.6545 18.6546C19.1186 18.2113 19.1083 17.4381 18.6649 16.9948L13.6635 11.9948L18.6649 7.00515C19.1083 6.55155 19.1186 5.78866 18.6545 5.34536C18.2111 4.88144 17.448 4.89175 17.0046 5.33505L12.0032 10.3351L7.00185 5.33505C6.56874 4.90206 5.78502 4.88144 5.3416 5.34536C4.87755 5.78866 4.89818 6.56186 5.33129 6.99485L10.3327 11.9948L5.33129 17.0052Z'
        fill={fill || 'currentColor'}
      />
    </svg>
  );
};

export default CancelIcons;
