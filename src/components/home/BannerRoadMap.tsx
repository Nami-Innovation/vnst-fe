'use client';

import React, { useEffect } from 'react';
import { useIsTablet } from '@/hooks/useMediaQuery';
import dynamic from 'next/dynamic';
import { getBscAddressLink, getTonScanAddressLink } from '@/utils/helper';
import { VNST_ADDRESS } from '@/web3/evm/constants';
import nl2br from 'react-nl2br';
import useSwapStore from '@/stores/swap.store';
import { useActiveChain } from '@/stores/chain.store';
import { useTonConnect } from '@/hooks/useTonConnect';
import { Chain } from '@/web3/constants';
import { TON_VNST_ADDRESS } from '@/web3/ton/constants';

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
  const [redeemFeeRate, load, mintFee] = useSwapStore((state) => [
    state.redeemFeeRate,
    state.loadContractInfo,
    state.mintFee,
  ]);
  const { tonClient } = useTonConnect();

  const activeChain = useActiveChain();
  useEffect(() => {
    load(activeChain, tonClient);
  }, [activeChain, tonClient]);

  const linkSmc =
    activeChain === Chain.TON
      ? getTonScanAddressLink(TON_VNST_ADDRESS.toString())
      : getBscAddressLink(VNST_ADDRESS as string);
  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='max-w-screen-xl px-4 text-center'>
        <p
          className='font-sf-pro-expanded text-mb-large font-bold uppercase leading-9 text-black lg:text-[50px] lg:leading-[54px]'
          dangerouslySetInnerHTML={{ __html: title }}
        ></p>
        <p className='mx-auto mt-3 max-w-screen-md text-sm font-semibold leading-[18px] text-gray lg:text-base lg:leading-5'>
          {nl2br(content)}
        </p>
      </div>
      <div className='mt-10 flex w-full items-center justify-center lg:mt-[76px]'>
        {isTablet !== null && isTablet && (
          <WorkflowMobile
            className='mx-auto h-[563px] w-full'
            title={titleRoadmap}
            totalUSDT={totalUSDT}
            totalVNST={totalVNST}
            operationPool={operationPool}
            link={linkSmc}
            operationPoolTitle={operationPoolTitle}
            redeemFeeRate={redeemFeeRate}
            mintFee={mintFee}
          />
        )}
        {isTablet !== null && !isTablet && (
          <Workflow
            className='mx-auto h-[667px] w-full'
            title={titleRoadmap}
            totalUSDT={totalUSDT}
            totalVNST={totalVNST}
            operationPool={operationPool}
            link={linkSmc}
            operationPoolTitle={operationPoolTitle}
            redeemFeeRate={redeemFeeRate}
            mintFee={mintFee}
          />
        )}
      </div>
    </div>
  );
};
export default BannerRoadMap;
