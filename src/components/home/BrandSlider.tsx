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
        <div className='flex items-center gap-x-4 py-[60px] lg:!py-[100px]'>
          {ICON_LIST.map((item, index) => (
            <div key={index}>
              <Image
                src={item.src}
                alt={item.alt}
                width={200}
                height={100}
                className='h-[80px] w-[160px] object-fill hover:text-white lg:w-[240px]'
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandSlider;
