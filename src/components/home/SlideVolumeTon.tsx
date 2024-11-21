'use client';

import React, { useEffect, useState } from 'react';
import VolumeItem from './VolumeItem';
import { updateArray } from './constant';
import { getTonScanAddressLink, getTonScanLink } from '@/utils/helper';
import { formatNumber } from '@/utils/format';
import { getTonTransactions } from '@/services/ton.api';
import { TonTransaction, TonTransactionType } from '@/@type/transaction.type';

const LIMIT_EVENT_LOGS = 20;
const SlideVolume = () => {
  const [mintList, setMintList] = useState<any[]>([]);
  const [redeemList, setRedeemList] = useState<any[]>([]);

  useEffect(() => {
    const handleGetData = async () => {
      try {
        await Promise.allSettled([
          getTonTransactions({
            page: 1,
            limit: LIMIT_EVENT_LOGS,
            type: TonTransactionType.MINT,
          }),
          getTonTransactions({
            page: 1,
            limit: LIMIT_EVENT_LOGS,
            type: TonTransactionType.REDEEM,
          }),
        ]).then((values: any) => {
          const mint = values[0]?.value?.rows;
          const redeem = values[1]?.value?.rows;
          if (mint?.length > 0 && mint.length <= LIMIT_EVENT_LOGS) {
            const upgradeArray = updateArray(mint, LIMIT_EVENT_LOGS);
            setMintList(upgradeArray);
          }

          if (redeem?.length > 0 && redeem.length <= LIMIT_EVENT_LOGS) {
            const upgradeArray = updateArray(redeem, LIMIT_EVENT_LOGS);
            setRedeemList(upgradeArray);
          }
        });
      } catch (err) {
        console.log(err);
      }
    };
    handleGetData();
  }, []);

  return (
    <div className='flex w-full flex-col'>
      {mintList.length > 0 ? (
        <div className='w-full overflow-hidden py-5' key={'mint'}>
          <div className='loop-looper-rtl w-max'>
            <div className='flex items-center'>
              {mintList?.map((ele: TonTransaction, index) => (
                <div key={index} className='px-2'>
                  <VolumeItem
                    type='mint'
                    addressLink={getTonScanAddressLink(ele.fromAddress)}
                    amountIn={formatNumber(ele.payload?.inAmount)}
                    amountOut={formatNumber(ele.payload?.outAmount)}
                    hash={ele.hash}
                    priceRate={formatNumber(
                      ele.payload?.outAmount / ele.payload?.inAmount,
                      2
                    )}
                    hashLink={getTonScanLink(ele.hash)}
                    time={ele.timestamp}
                    walletAddress={ele.fromAddress}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
      {redeemList.length > 0 && (
        <div className='w-full overflow-hidden py-5' key='redeem'>
          <div className='loop-looper-ltr w-max'>
            <div className='flex items-center'>
              {redeemList.map((item: TonTransaction, i) => (
                <div key={i} className='px-2'>
                  <VolumeItem
                    type='redeem'
                    addressLink={getTonScanAddressLink(item.fromAddress)}
                    amountIn={formatNumber(item.payload?.inAmount, 0)}
                    amountOut={formatNumber(item.payload?.outAmount)}
                    hash={item.hash}
                    priceRate={formatNumber(
                      item.payload?.inAmount / item.payload?.outAmount,
                      2
                    )}
                    hashLink={getTonScanLink(item.hash)}
                    time={item.timestamp}
                    walletAddress={item.fromAddress}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default SlideVolume;
