'use client';
import SlideVolume from './SlideVolume';
import FormSendMail from './FormSendMail';
import BrandSlider from './BrandSlider';
import Image from 'next/image';

const VolumeContent = () => {
  return (
    <div
      id='volume-content'
      className='lg:bg-volume relative min-h-screen w-full overflow-hidden bg-black bg-contain bg-no-repeat lg:min-h-max'
    >
      <Image
        src='/assets/images/map.png'
        alt='Map'
        width={1440}
        height={688}
        className='absolute left-1/2 top-0 hidden max-w-screen-2xl -translate-x-1/2 lg:block'
      />
      <div className='w-full grid-cols-1 grid-rows-3 items-start justify-start pt-10 lg:pt-20'>
        <div className='loop-wrapper hide-scrollbar w-full'>
          <SlideVolume />
        </div>
        <div className='flex-rows mt-16 flex w-full items-center justify-center lg:mt-40'>
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
