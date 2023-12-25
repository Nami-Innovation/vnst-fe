import React from 'react';
import { useParams } from 'next/navigation';
import { memo } from 'react';
import clsx from 'clsx';

const Fader = ({ text }: { text: string }) => {
  const { lang } = useParams();
  return text.split(' ').map((item, index) => (
    <React.Fragment key={item}>
      <span className={clsx('banner-animation mr-3 text-white')}>{item}</span>
      {lang === 'vi' ? index === 3 && <br /> : item === 'Trust' ? <br /> : null}
    </React.Fragment>
  ));
};

export default memo(Fader);
