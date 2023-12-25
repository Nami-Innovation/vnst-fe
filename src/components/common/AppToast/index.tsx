'use client';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import '@/styles/toastify.scss';
import { useIsTablet } from '@/hooks/useMediaQuery';

const AppToast = () => {
  const isTablet = useIsTablet();
  return (
    <ToastContainer
      hideProgressBar
      theme='colored'
      closeButton={false}
      position={isTablet ? 'top-center' : 'top-right'}
    />
  );
};

export default AppToast;
