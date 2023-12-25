import clsx from 'clsx';
import React from 'react';
import { FunctionName } from './types';

type Props = {
  active: FunctionName;
  onChange: (active: FunctionName) => void;
};

const Tabs = ({ active, onChange }: Props) => {
  return (
    <div className='grid grid-cols-2'>
      <button
        className='relative h-10 outline-none'
        onClick={() => onChange('mint')}
      >
        <svg
          viewBox='0 0 187 40'
          fill='none'
          preserveAspectRatio='none'
          className='h-full w-full'
        >
          <path
            d='M0 5C0 2.23858 2.23858 0 5 0H166.91C168.804 0 170.535 1.07001 171.382 2.76393L186.382 32.7639C188.044 36.0884 185.627 40 181.91 40H5C2.23858 40 0 37.7614 0 35V5Z'
            fill={active === 'mint' ? 'url(#mint-linear)' : 'black'}
            stroke={active === 'mint' ? 'none' : 'url(#burn-linear)'}
          />
          <defs>
            <linearGradient
              id='mint-linear'
              x1='0'
              y1='0'
              x2='179.062'
              y2='0'
              gradientUnits='userSpaceOnUse'
            >
              <stop stopColor='#006666' />
              <stop offset='1' stopColor='#00C096' />
            </linearGradient>
          </defs>
        </svg>
        <div
          className={clsx(
            'absolute top-0 w-full text-center font-semibold leading-10',
            active === 'mint' ? 'text-white' : 'text-dark-3'
          )}
        >
          Mint
        </div>
      </button>
      <button
        className='relative h-10 outline-none'
        onClick={() => onChange('redeem')}
      >
        <svg
          viewBox='0 0 188 40'
          preserveAspectRatio='none'
          className='h-full w-full'
          fill='none'
        >
          <path
            d='M187.5 35C187.5 37.4853 185.485 39.5 183 39.5H20.6131C18.8919 39.5 17.3215 38.5182 16.5676 36.9709L1.95224 6.97086C0.496002 3.98174 2.67271 0.5 5.9977 0.5H183C185.485 0.5 187.5 2.51472 187.5 5V35Z'
            fill={active === 'redeem' ? 'url(#burn-linear)' : 'black'}
            stroke={active === 'redeem' ? 'none' : 'url(#mint-linear)'}
          />
          <defs>
            <linearGradient
              id='burn-linear'
              x1='188'
              y1='40'
              x2='-2.0661'
              y2='40'
              gradientUnits='userSpaceOnUse'
            >
              <stop stopColor='#006666' />
              <stop offset='1' stopColor='#00C096' />
            </linearGradient>
          </defs>
        </svg>
        <div
          className={clsx(
            'absolute top-0 w-full text-center font-semibold leading-10',
            active === 'redeem' ? 'text-white' : 'text-dark-3'
          )}
        >
          Redeem
        </div>
      </button>
    </div>
  );
};

export default Tabs;
