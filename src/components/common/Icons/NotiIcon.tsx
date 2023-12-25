import React from 'react';
import { TIconsProps } from '../types/type-icon';
import clsx from 'clsx';

interface TProps extends TIconsProps {
  className: string;
}

const NotiIcon = ({ height = 20, width = 20, className }: Partial<TProps>) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 20 20'
      fill='none'
    >
      <path
        d='M3.10584 15.2819H6.63445C6.6944 16.866 8.03047 18.3334 10.0003 18.3334C11.9616 18.3334 13.3063 16.8827 13.3748 15.2819H16.8948C17.7855 15.2819 18.3337 14.8067 18.3337 14.0897C18.3337 13.1976 17.5029 12.4389 16.7235 11.7136C16.1154 11.1383 15.9698 9.98773 15.8585 8.81217C15.7386 5.66901 14.7879 3.56801 12.5611 2.7843C12.2271 1.67544 11.2764 0.833374 10.0003 0.833374C8.7242 0.833374 7.77354 1.67544 7.44808 2.7843C5.21273 3.56801 4.27062 5.66901 4.14215 8.81217C4.03082 9.98773 3.88522 11.1383 3.27713 11.7136C2.49776 12.4389 1.66699 13.1976 1.66699 14.0897C1.66699 14.8067 2.21513 15.2819 3.10584 15.2819ZM3.75675 13.7312V13.6311C3.97943 13.3894 4.47617 12.9475 4.89584 12.4806C5.48679 11.8219 5.76086 10.6047 5.84651 9.02061C5.94928 5.67735 7.01129 4.55181 8.38162 4.19331C8.59573 4.13495 8.70707 4.0349 8.7242 3.80979C8.76703 2.96772 9.25521 2.40079 10.0003 2.40079C10.754 2.40079 11.2336 2.96772 11.2764 3.80979C11.2936 4.0349 11.4135 4.13495 11.619 4.19331C12.9979 4.55181 14.0514 5.67735 14.1541 9.02061C14.2484 10.6047 14.5224 11.8219 15.1048 12.4806C15.5245 12.9475 16.0041 13.3894 16.2268 13.6311V13.7312H3.75675ZM10.0003 16.9911C9.03253 16.9911 8.3388 16.3157 8.27885 15.2819H11.7304C11.679 16.3074 10.9767 16.9911 10.0003 16.9911Z'
        className={clsx('group-hover:fill-gradient fill-current', className)}
      />
    </svg>
  );
};
export default NotiIcon;
