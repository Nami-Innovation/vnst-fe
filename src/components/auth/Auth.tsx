'use client';

import { Chain } from '@/web3/constants';
import AuthTon from './AuthTon';
import AuthEvm from './AuthEvm';
import { useActiveChain } from '@/stores/chain.store';

const Auth = () => {
  const activeChain = useActiveChain();
  return activeChain === Chain.TON ? <AuthTon /> : <AuthEvm />;
};

export default Auth;
