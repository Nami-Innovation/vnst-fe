'use client';

import Image from 'next/image';

const ICON_LIST = [
  {
    src: '/assets/images/crypto-brand/Desktop5.svg',
    alt: 'Icon Crypto Company',
  },
  {
    src: '/assets/images/crypto-brand/Desktop1.svg',
    alt: 'Icon Crypto Company',
  },
  {
    src: '/assets/images/crypto-brand/Desktop2.svg',
    alt: 'Icon Crypto Company',
  },
  {
    src: '/assets/images/crypto-brand/Desktop3.svg',
    alt: 'Icon Crypto Company',
  },
  {
    src: '/assets/images/crypto-brand/Desktop4.svg',
    alt: 'Icon Crypto Company',
  },
  {
    src: '/assets/images/crypto-brand/Desktop5.svg',
    alt: 'Icon Crypto Company',
  },
  {
    src: '/assets/images/crypto-brand/Desktop1.svg',
    alt: 'Icon Crypto Company',
  },
  {
    src: '/assets/images/crypto-brand/Desktop2.svg',
    alt: 'Icon Crypto Company',
  },
  {
    src: '/assets/images/crypto-brand/Desktop3.svg',
    alt: 'Icon Crypto Company',
  },
  {
    src: '/assets/images/crypto-brand/Desktop4.svg',
    alt: 'Icon Crypto Company',
  },
  {
    src: '/assets/images/crypto-brand/Desktop5.svg',
    alt: 'Icon Crypto Company',
  },
  {
    src: '/assets/images/crypto-brand/Desktop1.svg',
    alt: 'Icon Crypto Company',
  },
  {
    src: '/assets/images/crypto-brand/Desktop2.svg',
    alt: 'Icon Crypto Company',
  },
  {
    src: '/assets/images/crypto-brand/Desktop3.svg',
    alt: 'Icon Crypto Company',
  },
  {
    src: '/assets/images/crypto-brand/Desktop4.svg',
    alt: 'Icon Crypto Company',
  },
  {
    src: '/assets/images/crypto-brand/Desktop5.svg',
    alt: 'Icon Crypto Company',
  },
  {
    src: '/assets/images/crypto-brand/Desktop1.svg',
    alt: 'Icon Crypto Company',
  },
  {
    src: '/assets/images/crypto-brand/Desktop2.svg',
    alt: 'Icon Crypto Company',
  },
  {
    src: '/assets/images/crypto-brand/Desktop3.svg',
    alt: 'Icon Crypto Company',
  },
  {
    src: '/assets/images/crypto-brand/Desktop4.svg',
    alt: 'Icon Crypto Company',
  },
];

const BrandSlider = () => {
  return (
    <div className='w-full overflow-hidden'>
      <div className='loop-looper-ltr w-max'>
        <div className='flex items-center gap-x-5'>
          {ICON_LIST.map((item, index) => (
            <div
              key={index}
              className='my-5 flex h-[68px] w-[144.4px] items-center justify-center rounded-[12px] border border-gray-200 bg-white shadow-box lg:w-[190px]'
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={200}
                height={100}
                className='h-[52px] w-[140px] object-fill hover:text-white '
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandSlider;
