'use client';

import React, { useEffect } from 'react';
import { useIsTablet } from '@/hooks/useMediaQuery';
import dynamic from 'next/dynamic';
import { getBscAddressLink } from '@/utils/helper';
import { VNST_ADDRESS } from '@/web3/constants';
import nl2br from 'react-nl2br';
import useSwapStore from '@/stores/swap.store';

const Workflow = dynamic(() => import('./Workflow'), { ssr: false });
const WorkflowMobile = dynamic(() => import('./WorkflowMobile'), {
  ssr: false,
});

type TProps = {
  title: string;
  content: string;
  titleRoadmap: string;
  totalVNST: number;
  totalUSDT: number;
  operationPool: number;
  operationPoolTitle: string;
};

const BannerRoadMap = ({
  title,
  content,
  titleRoadmap,
  totalUSDT,
  totalVNST,
  operationPool,
  operationPoolTitle,
}: TProps) => {
  const isTablet = useIsTablet();
  const [redeemFeeRate, load] = useSwapStore((state) => [
    state.redeemFeeRate,
    state.load,
  ]);
  useEffect(() => {
    load();
  }, []);

  const linkSmc = getBscAddressLink(VNST_ADDRESS as string);
  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='max-w-screen-xl px-4 text-center'>
        <p
          className='font-sf-pro-expanded text-mb-large font-bold uppercase leading-9 text-dark-5 lg:text-large lg:leading-[60px]'
          dangerouslySetInnerHTML={{ __html: title }}
        ></p>
        <p className='mx-auto mt-3 max-w-screen-md text-sm font-semibold text-dark-3 lg:text-base'>
          {nl2br(content)}
        </p>
      </div>
      <div className='mt-[76px] w-full'>
        {isTablet !== null && isTablet && (
          <WorkflowMobile
            className='mx-auto lg:hidden'
            title={titleRoadmap}
            totalUSDT={totalUSDT}
            totalVNST={totalVNST}
            operationPool={operationPool}
            link={linkSmc}
            operationPoolTitle={operationPoolTitle}
            redeemFeeRate={redeemFeeRate}
          />
        )}
        {isTablet !== null && !isTablet && (
          <Workflow
            className='mx-auto hidden lg:block'
            title={titleRoadmap}
            totalUSDT={totalUSDT}
            totalVNST={totalVNST}
            operationPool={operationPool}
            link={linkSmc}
            operationPoolTitle={operationPoolTitle}
            redeemFeeRate={redeemFeeRate}
          />
        )}
      </div>
      {isTablet !== null && isTablet ? (
        <div
          className='block h-[79px] w-full bg-grayBackground bg-cover bg-no-repeat lg:hidden'
          style={{
            backgroundImage: `url(/assets/images/bg-content-bottom-mobile.svg)`,
          }}
        ></div>
      ) : (
        <div
          className='hidden h-[100px] w-full bg-grayBackground bg-cover bg-no-repeat lg:block'
          style={{
            backgroundImage: `url(/assets/images/bg-content-bottom.svg)`,
          }}
        ></div>
      )}
    </div>
  );
};
export default BannerRoadMap;
