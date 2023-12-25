import React from 'react';

const ClipboardIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg width='24' height='24' viewBox='0 0 24 24' {...props}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M13 9.25H7C6.17157 9.25 5.5 9.92157 5.5 10.75V16.75C5.5 17.5784 6.17157 18.25 7 18.25H13C13.8284 18.25 14.5 17.5784 14.5 16.75V10.75C14.5 9.92157 13.8284 9.25 13 9.25ZM7 7.75C5.34315 7.75 4 9.09315 4 10.75V16.75C4 18.4069 5.34315 19.75 7 19.75H13C14.6569 19.75 16 18.4069 16 16.75V10.75C16 9.09315 14.6569 7.75 13 7.75H7Z'
        className='group-hover:fill-gradient fill-current'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M11 5.5C10.3096 5.5 9.75 6.05964 9.75 6.75V8.75H8.25V6.75C8.25 5.23122 9.48122 4 11 4H17C18.5188 4 19.75 5.23122 19.75 6.75V12.75C19.75 14.2688 18.5188 15.5 17 15.5H15.1905V14H17C17.6904 14 18.25 13.4404 18.25 12.75V6.75C18.25 6.05964 17.6904 5.5 17 5.5H11Z'
        className='group-hover:fill-gradient fill-current'
      />
    </svg>
  );
};

export default ClipboardIcon;
