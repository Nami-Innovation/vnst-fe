'use client';
import FormSendMail from './FormSendMail';
import BrandSlider from './BrandSlider';
import dynamic from 'next/dynamic';
import { useActiveChain } from '@/stores/chain.store';
import { Chain } from '@/web3/constants';

const SlideVolume = dynamic(() => import('./SlideVolume'), { ssr: false });
const SlideVolumeTon = dynamic(() => import('./SlideVolumeTon'), {
  ssr: false,
});

const VolumeContent = () => {
  const activeChain = useActiveChain();
  return (
    <div className=' w-full overflow-hidden bg-secondary-lightest'>
      <div className='flex w-full flex-col gap-y-20 pb-[60px] lg:gap-y-40 lg:pb-[100px]'>
        <div className='loop-wrapper hide-scrollbar w-full'>
          {activeChain === Chain.TON ? <SlideVolumeTon /> : <SlideVolume />}
        </div>
        <div className='mx-auto w-full max-w-screen-xl px-4 lg:px-0'>
          <FormSendMail />
        </div>
        <div className=''>
          <BrandSlider />
        </div>
      </div>
    </div>
  );
};

export default VolumeContent;
