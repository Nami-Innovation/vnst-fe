import React from 'react';
import { TIconsProps } from '../types/type-icon';
import clsx from 'clsx';

const SearchIcons = ({ width, height, onClick, className }: TIconsProps) => {
  return (
    <svg
      width={width || '24'}
      height={height || '24'}
      viewBox='0 0 24 24'
      className={clsx('cursor-pointer hover:text-primary', className)}
      onClick={onClick}
    >
      <path
        d='M10.917 17.834C12.3145 17.834 13.624 17.4121 14.7139 16.6914L18.5635 20.5498C18.8184 20.7959 19.1436 20.9189 19.4951 20.9189C20.2246 20.9189 20.7607 20.3477 20.7607 19.627C20.7607 19.293 20.6465 18.9678 20.4004 18.7217L16.5771 14.8809C17.3682 13.7559 17.834 12.3936 17.834 10.917C17.834 7.11133 14.7227 4 10.917 4C7.12012 4 4 7.11133 4 10.917C4 14.7227 7.11133 17.834 10.917 17.834ZM10.917 15.9883C8.13086 15.9883 5.8457 13.7031 5.8457 10.917C5.8457 8.13086 8.13086 5.8457 10.917 5.8457C13.7031 5.8457 15.9883 8.13086 15.9883 10.917C15.9883 13.7031 13.7031 15.9883 10.917 15.9883Z'
        fill='currentColor'
        className='fill-current'
      />
    </svg>
  );
};

export default SearchIcons;
