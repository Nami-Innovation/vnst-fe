import clsx from 'clsx';
import React from 'react';

const LoadingSpinner = ({
  className,
  ...rest
}: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='84'
      height='76'
      viewBox='0 0 84 76'
      fill='none'
      className={clsx('animate-spin animate-duration-[2000ms]', className)}
      {...rest}
    >
      <g opacity='0.6' filter='url(#filter0_d_2882_3352)'>
        <rect
          x='19.335'
          y='22.2363'
          width='4.00406'
          height='15'
          rx='2.00203'
          transform='rotate(-45 19.335 22.2363)'
          className='fill-primary'
        />
      </g>
      <rect
        opacity='0.2'
        x='51.1777'
        y='54.0342'
        width='4.00475'
        height='15'
        rx='2.00238'
        transform='rotate(-45 51.1777 54.0342)'
        className='fill-gray-200'
      />
      <g opacity='0.4' filter='url(#filter1_d_2882_3352)'>
        <rect
          x='12'
          y='44'
          width='4'
          height='15'
          rx='2'
          transform='rotate(-90 12 44)'
          className='fill-primary'
        />
      </g>
      <g filter='url(#filter2_d_2882_3352)'>
        <rect
          x='57'
          y='44'
          width='4'
          height='15'
          rx='2'
          transform='rotate(-90 57 44)'
          className='fill-primary'
        />
      </g>
      <g opacity='0.2' filter='url(#filter3_d_2882_3352)'>
        <rect
          x='22.1934'
          y='64.6201'
          width='4.00327'
          height='15'
          rx='2.00164'
          transform='rotate(-135 22.1934 64.6201)'
          className='fill-primary'
        />
      </g>
      <g filter='url(#filter4_d_2882_3352)'>
        <rect
          x='54.0166'
          y='32.8018'
          width='4.00243'
          height='15'
          rx='2.00122'
          transform='rotate(-135 54.0166 32.8018)'
          className='fill-primary'
        />
      </g>
      <rect
        opacity='0.4'
        x='44'
        y='72'
        width='4'
        height='15'
        rx='2'
        transform='rotate(180 44 72)'
        className='fill-gray-200'
      />
      <g opacity='0.8' filter='url(#filter5_d_2882_3352)'>
        <rect
          x='44'
          y='27'
          width='4'
          height='15'
          rx='2'
          transform='rotate(180 44 27)'
          className='fill-primary'
        />
      </g>
      <defs>
        <filter
          id='filter0_d_2882_3352'
          x='8.16406'
          y='8.23438'
          width='35.7793'
          height='35.7793'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feOffset />
          <feGaussianBlur stdDeviation='6' />
          <feComposite in2='hardAlpha' operator='out' />
          <feColorMatrix
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0.751725 0 0 0 0 0.588779 0 0 0 0.8 0'
          />
          <feBlend
            mode='normal'
            in2='BackgroundImageFix'
            result='effect1_dropShadow_2882_3352'
          />
          <feBlend
            mode='normal'
            in='SourceGraphic'
            in2='effect1_dropShadow_2882_3352'
            result='shape'
          />
        </filter>
        <filter
          id='filter1_d_2882_3352'
          x='0'
          y='28'
          width='39'
          height='28'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feOffset />
          <feGaussianBlur stdDeviation='6' />
          <feComposite in2='hardAlpha' operator='out' />
          <feColorMatrix
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0.751725 0 0 0 0 0.588779 0 0 0 0.8 0'
          />
          <feBlend
            mode='normal'
            in2='BackgroundImageFix'
            result='effect1_dropShadow_2882_3352'
          />
          <feBlend
            mode='normal'
            in='SourceGraphic'
            in2='effect1_dropShadow_2882_3352'
            result='shape'
          />
        </filter>
        <filter
          id='filter2_d_2882_3352'
          x='45'
          y='28'
          width='39'
          height='28'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feOffset />
          <feGaussianBlur stdDeviation='6' />
          <feComposite in2='hardAlpha' operator='out' />
          <feColorMatrix
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0.751725 0 0 0 0 0.588779 0 0 0 0.8 0'
          />
          <feBlend
            mode='normal'
            in2='BackgroundImageFix'
            result='effect1_dropShadow_2882_3352'
          />
          <feBlend
            mode='normal'
            in='SourceGraphic'
            in2='effect1_dropShadow_2882_3352'
            result='shape'
          />
        </filter>
        <filter
          id='filter3_d_2882_3352'
          x='8.19141'
          y='40.0117'
          width='35.7793'
          height='35.7793'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feOffset />
          <feGaussianBlur stdDeviation='6' />
          <feComposite in2='hardAlpha' operator='out' />
          <feColorMatrix
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0.751725 0 0 0 0 0.588779 0 0 0 0.8 0'
          />
          <feBlend
            mode='normal'
            in2='BackgroundImageFix'
            result='effect1_dropShadow_2882_3352'
          />
          <feBlend
            mode='normal'
            in='SourceGraphic'
            in2='effect1_dropShadow_2882_3352'
            result='shape'
          />
        </filter>
        <filter
          id='filter4_d_2882_3352'
          x='40.0156'
          y='8.19385'
          width='35.7783'
          height='35.7788'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feOffset />
          <feGaussianBlur stdDeviation='6' />
          <feComposite in2='hardAlpha' operator='out' />
          <feColorMatrix
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0.751725 0 0 0 0 0.588779 0 0 0 0.8 0'
          />
          <feBlend
            mode='normal'
            in2='BackgroundImageFix'
            result='effect1_dropShadow_2882_3352'
          />
          <feBlend
            mode='normal'
            in='SourceGraphic'
            in2='effect1_dropShadow_2882_3352'
            result='shape'
          />
        </filter>
        <filter
          id='filter5_d_2882_3352'
          x='28'
          y='0'
          width='28'
          height='39'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feOffset />
          <feGaussianBlur stdDeviation='6' />
          <feComposite in2='hardAlpha' operator='out' />
          <feColorMatrix
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0.751725 0 0 0 0 0.588779 0 0 0 0.8 0'
          />
          <feBlend
            mode='normal'
            in2='BackgroundImageFix'
            result='effect1_dropShadow_2882_3352'
          />
          <feBlend
            mode='normal'
            in='SourceGraphic'
            in2='effect1_dropShadow_2882_3352'
            result='shape'
          />
        </filter>
      </defs>
    </svg>
  );
};

export default LoadingSpinner;
