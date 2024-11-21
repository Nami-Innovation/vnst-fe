import React, { useEffect } from 'react';
import { FunctionName } from './types';
import colors from '@/colors';

type Props = {
  active: FunctionName;
  onChange: (active: FunctionName) => void;
};

const Tabs = ({ active, onChange }: Props) => {
  return (
    <div className='grid grid-cols-2'>
      <button
        className='relative col-span-1 h-10 w-full outline-none lg:w-[190px]'
        onClick={() => {
          onChange('mint');
        }}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='190'
          height='40'
          viewBox='0 0 190 40'
          fill='none'
          className='h-full w-full'
        >
          <g id='Mint'>
            <path
              id='Frame'
              d='M0.5 6C0.5 2.96243 2.96243 0.5 6 0.5H166.292C168.375 0.5 170.279 1.67701 171.211 3.54032L185.211 31.5403C187.04 35.1973 184.38 39.5 180.292 39.5H6C2.96244 39.5 0.5 37.0376 0.5 34V6Z'
              fill={active === 'mint' ? colors.primary.DEFAULT : 'white'}
              stroke={colors.primary.DEFAULT}
            />
            <text
              id='Mint_2'
              fill={active === 'mint' ? 'white' : '#006666'}
              xmlSpace='preserve'
              style={{ whiteSpace: 'pre' }}
              fontFamily='SF Pro'
              fontSize='16'
              letterSpacing='0em'
              className='font-sf-pro text-sm font-semibold leading-[18px] lg:text-base lg:leading-5'
            >
              <tspan x='74.1172' y='26.6875'>
                Mint
              </tspan>
            </text>
          </g>
        </svg>
      </button>
      <button
        className='relative col-span-1 h-10 w-full outline-none lg:w-[190px]'
        onClick={() => {
          onChange('redeem');
        }}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='190'
          height='40'
          viewBox='0 0 190 40'
          fill='none'
          className='h-full w-full'
        >
          <g id='Redeem'>
            <path
              id='Frame'
              d='M189.5 34C189.5 37.0376 187.038 39.5 184 39.5H23.2383C21.1346 39.5 19.2152 38.3 18.2938 36.4088L4.65279 8.40883C2.87294 4.75546 5.53337 0.5 9.59723 0.5H184C187.038 0.5 189.5 2.96243 189.5 6V34Z'
              fill={active === 'redeem' ? colors.primary.DEFAULT : 'white'}
              stroke={colors.primary.DEFAULT}
            />
            <text
              id='Redeem_2'
              fill={active === 'redeem' ? 'white' : '#006666'}
              xmlSpace='preserve'
              style={{ whiteSpace: 'pre' }}
              fontFamily='SF Pro'
              fontSize='16'
              letterSpacing='0em'
              fontWeight={590}
              className='font-sf-pro text-sm font-semibold leading-[18px] lg:text-base lg:leading-5'
            >
              <tspan x='71.1641' y='25.6875'>
                Redeem
              </tspan>
            </text>
          </g>
        </svg>
      </button>
    </div>
  );
};

export default Tabs;
