import { ChainColors } from '@/colors';
import BNBChainIcon from '@/components/common/Icons/chains/BNBChainIcon';
import CheckCircleIcon from '@/components/common/Icons/CheckCircleIcon';
import ChevronBottomTriangle from '@/components/common/Icons/ChevronBottomTriangle';
import Popup from '@/components/common/Popup';
import { useIsTablet } from '@/hooks/useMediaQuery';
import useChainStore, {
  useActiveChain,
  useActiveChainConfig,
} from '@/stores/chain.store';
import { cn } from '@/utils/helper';
import { Chain, ChainConfigs } from '@/web3/constants';
import React, { useRef, useState } from 'react';
import Drawer from '@/components/common/Modal/Drawer';
import { useTranslationClient } from '@/i18n/client';
import useDisconnectWallet from '@/hooks/useDisconnectWallet';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

const ChainListItems = () => {
  const activeChain = useActiveChain();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const switchChain = useChainStore((state) => state.switchChain);
  const disconnect = useDisconnectWallet();
  const onSwitchChain = (chain: Chain) => {
    if (chain === activeChain) return;
    disconnect();
    switchChain(chain);

    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set('network', chain);
    const search = current.toString();
    const query = search ? `?${search}` : '';
    router.push(`${pathname}${query}`);
  };
  return (
    <div className='gap-y-1'>
      {Object.values(ChainConfigs).map((chain) => {
        const isActive = activeChain === chain.chain;
        return (
          <button
            key={chain.chain}
            className={cn(
              'flex w-full items-center justify-between p-2 text-xs font-semibold text-gray hover:bg-primary-light hover:text-primary-dark',
              isActive && 'text-primary hover:text-primary'
            )}
            onClick={() => onSwitchChain(chain.chain)}
          >
            <div className='flex items-center gap-x-1'>
              <chain.icon size='md' />
              <span>{chain.chainName}</span>
            </div>
            {isActive && <CheckCircleIcon size='xs' />}
          </button>
        );
      })}
    </div>
  );
};

const SelectChain = () => {
  const popupRef = useRef<any>();
  const [referenceElement, setReferenceElement] =
    useState<HTMLButtonElement | null>(null);
  const activeChainConfig = useActiveChainConfig();
  const isTablet = useIsTablet();
  const { t } = useTranslationClient('common');

  const trigger = (
    <button
      className='flex h-8 items-center gap-x-0.5 rounded px-1 text-white md:h-10 md:px-2'
      style={{
        backgroundColor: ChainColors[activeChainConfig.chain],
      }}
      ref={setReferenceElement}
    >
      <activeChainConfig.icon size='lg' />
      <ChevronBottomTriangle />
    </button>
  );

  if (isTablet) {
    return (
      <Drawer trigger={trigger} title={t('common:select_network')}>
        <ChainListItems />
      </Drawer>
    );
  }

  return (
    <>
      {trigger}
      <Popup
        ref={popupRef}
        referenceElement={referenceElement}
        className='mt-6 w-40 py-2'
      >
        <ChainListItems />
      </Popup>
    </>
  );
};

export default SelectChain;
