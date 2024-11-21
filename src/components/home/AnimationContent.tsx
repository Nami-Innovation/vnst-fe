'use client';

import { useTranslationClient } from '@/i18n/client';
import { useState, useEffect } from 'react';
import Fader from './Fade';
const contents = [
  'homepage:content_banner1',
  'homepage:content_banner2',
  'homepage:content_banner3',
];
const AnimationContent = () => {
  const { t } = useTranslationClient('homepage');
  const [currentString, setCurrentString] = useState(contents[0]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const nextIndex = (currentIndex + 1) % contents.length;
      setCurrentString(contents[nextIndex]);
      setCurrentIndex(nextIndex);
    }, 3500);

    return () => clearInterval(intervalId);
  }, [currentIndex, setCurrentString]);

  return (
    <div className='whitespace-wrap min-h-[80px] pl-4 text-start font-sf-pro-expanded font-bold text-secondary-darkest md:px-10 lg:px-0'>
      <Fader text={t(currentString)} />
    </div>
  );
};

export default AnimationContent;
