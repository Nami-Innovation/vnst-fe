'use client';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import '@/styles/toastify.scss';

const AppToast = () => {
  return (
    <ToastContainer
      hideProgressBar
      theme='colored'
      closeButton={false}
      position={'top-center'}
    />
  );
};

export default AppToast;
