'use client';

import React, { useEffect, useState } from 'react';
import VolumeItem from './VolumeItem';
import { getEventLogs } from '@/services/event-log.api';
import { updateArray } from './constant';

const LIMIT_EVENT_LOGS = 20;
const SlideVolume = () => {
  const [mintList, setMintList] = useState<any[]>([]);
  const [redeemList, setRedeemList] = useState<any[]>([]);

  useEffect(() => {
    const handleGetData = async () => {
      try {
        await Promise.allSettled([
          getEventLogs(['EMint'], 1, LIMIT_EVENT_LOGS),
          getEventLogs(['ERedeem'], 1, LIMIT_EVENT_LOGS),
        ]).then((values: any) => {
          const mint = values[0]?.value?.rows;
          const redeem = values[1]?.value?.rows;
          if (mint.length > 0 && mint.length <= LIMIT_EVENT_LOGS) {
            const upgradeArray = updateArray(mint, LIMIT_EVENT_LOGS);
            setMintList(upgradeArray);
          }

          if (redeem.length > 0 && redeem.length <= LIMIT_EVENT_LOGS) {
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
              {mintList?.map((ele: any, index) => (
                <div key={index} className='px-2'>
                  <VolumeItem volume={ele} />
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
              {redeemList.map((item: any, i) => (
                <div key={i} className='px-2'>
                  <VolumeItem volume={item} />
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
