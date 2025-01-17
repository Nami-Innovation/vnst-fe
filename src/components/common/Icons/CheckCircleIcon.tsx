import React from 'react';
import { BaseIcon, IconProps } from '@/components/common/Icons';

const CheckCircleIcon = (props: IconProps) => {
  return (
    <BaseIcon viewBox='0 0 12 12' fill='none' {...props}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M6 12C9.31371 12 12 9.31371 12 6C12 2.68629 9.31371 0 6 0C2.68629 0 0 2.68629 0 6C0 9.31371 2.68629 12 6 12ZM9.34609 4.36086C9.54539 4.16972 9.552 3.85321 9.36086 3.65391C9.16972 3.45461 8.85321 3.448 8.65391 3.63914L4.83551 7.30123L3.35248 5.82719C3.15662 5.63252 2.84004 5.63349 2.64537 5.82934C2.45071 6.0252 2.45167 6.34178 2.64752 6.53644L4.47679 8.35463C4.66934 8.54601 4.97942 8.54878 5.17536 8.36086L9.34609 4.36086Z'
        fill='currentColor'
      />
    </BaseIcon>
  );
};

export default CheckCircleIcon;
