'use client';

import { useEffect, useRef } from 'react';
import {
  useIsConnectionRestored,
  useTonConnectUI,
  useTonWallet,
} from '@tonconnect/ui-react';
import { tonGeneratePayload, tonLogin } from '@/services/auth.api';
import useWalletStore from '@/stores/wallet.store';
import useDisconnectWalletTon from '@/hooks/useDisconnectWalletTon';
import { getAuthWallet } from '@/services/wallets.api';
import { toast } from 'react-toastify';

const payloadTTLMS = 1000 * 60 * 10;

const AuthTon = () => {
  const [tonConnectUI] = useTonConnectUI();
  const isConnectionRestored = useIsConnectionRestored();
  const tonWallet = useTonWallet();
  const interval = useRef<ReturnType<typeof setInterval> | undefined>();
  const disconnect = useDisconnectWalletTon();
  const [wallet, setWallet, setAccessToken] = useWalletStore((state) => [
    state.wallet,
    state.setWallet,
    state.setAccessToken,
  ]);

  useEffect(() => {
    if (!isConnectionRestored) {
      return;
    }

    const main = async () => {
      clearInterval(interval.current);

      if (!tonWallet) {
        const refreshPayload = async () => {
          tonConnectUI.setConnectRequestParameters({ state: 'loading' });

          const value = await tonGeneratePayload();
          if (!value) {
            tonConnectUI.setConnectRequestParameters(null);
          } else {
            tonConnectUI.setConnectRequestParameters({ state: 'ready', value });
          }
        };

        refreshPayload();
        interval.current = setInterval(refreshPayload, payloadTTLMS);
        return;
      }

      if (!wallet) {
        try {
          const me = await getAuthWallet();
          setWallet(me);
          return;
        } catch (error) {
          console.log('Error fetching wallet', error);
        }
      }

      if (
        tonWallet.connectItems?.tonProof &&
        !('error' in tonWallet.connectItems.tonProof)
      ) {
        try {
          const res = await tonLogin(
            tonWallet.connectItems.tonProof.proof,
            tonWallet.account
          );
          setWallet(res.wallet);
          setAccessToken(res.accessToken);
        } catch (error: any) {
          toast.error(error.message);
          disconnect();
        }
      }
    };

    main();
  }, [tonWallet, isConnectionRestored]);
  return null;
};

export default AuthTon;
