import React from 'react';

const RefreshIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg width='20' height='20' viewBox='0 0 20 20' fill='none' {...props}>
      <path
        d='M4.75 4C4.75 3.58579 4.41421 3.25 4 3.25C3.58579 3.25 3.25 3.58579 3.25 4L4.75 4ZM4 7.6H3.25H4ZM4.4 8V7.25H4.4L4.4 8ZM8 8.75C8.41421 8.75 8.75 8.41421 8.75 8C8.75 7.58579 8.41421 7.25 8 7.25V8.75ZM3.63621 7.3901C3.48347 7.77512 3.67176 8.21107 4.05678 8.36381C4.44181 8.51656 4.87775 8.32826 5.0305 7.94324L3.63621 7.3901ZM10 4V4.75V4ZM16 10H15.25H16ZM10 16V16.75V16ZM5.31913 12.6301C5.11485 12.2698 4.65713 12.1433 4.2968 12.3476C3.93646 12.5518 3.80996 13.0096 4.01425 13.3699L5.31913 12.6301ZM3.25 4L3.25 7.6H4.75L4.75 4L3.25 4ZM3.25 7.6C3.25 8.23517 3.7649 8.75 4.4 8.75L4.4 7.25C4.59328 7.25 4.75 7.4067 4.75 7.6H3.25ZM4.4 8.75H8V7.25H4.4V8.75ZM5.0305 7.94324C5.77828 6.05835 7.80815 4.75 10 4.75V3.25C7.25623 3.25 4.63311 4.87725 3.63621 7.3901L5.0305 7.94324ZM10 4.75C12.8388 4.75 15.25 7.10583 15.25 10H16.75C16.75 6.26671 13.6565 3.25 10 3.25V4.75ZM15.25 10C15.25 12.8941 12.8388 15.25 10 15.25V16.75C13.6565 16.75 16.75 13.7333 16.75 10H15.25ZM10 15.25C8.0761 15.25 6.19433 14.1738 5.31913 12.6301L4.01425 13.3699C5.17255 15.413 7.57079 16.75 10 16.75V15.25Z'
        className='group-hover:fill-gradient fill-current'
      />
    </svg>
  );
};

export default RefreshIcon;
