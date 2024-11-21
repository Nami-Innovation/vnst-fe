import React from 'react';
import Header from './Header';

type Props = {
  children?: React.ReactNode;
  lang: string;
};

const MainLayout = ({ children, lang }: Props) => {
  return (
    <main className='flex min-h-screen flex-col'>
      <Header />
      <div className='mt-[60px] max-w-full flex-1 bg-secondary-lightest lg:mt-0'>
        {children}
      </div>
    </main>
  );
};

export default MainLayout;