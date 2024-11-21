import BNBChainIcon from '@/components/common/Icons/chains/BNBChainIcon';
import TONChainIcon from '@/components/common/Icons/chains/TONChainIcon';

export enum Chain {
  BNB = 'BNB',
  TON = 'TON',
}

export enum ChainType {
  EVM = 'EVM',
  TON = 'TON',
}

export const ChainConfigs = {
  [Chain.BNB]: {
    chain: Chain.BNB,
    chainType: ChainType.EVM,
    chainName: 'BNB Chain',
    icon: BNBChainIcon,
    scanImageUrl: '/assets/images/scans/bsc.png',
  },
  [Chain.TON]: {
    chain: Chain.TON,
    chainType: ChainType.TON,
    chainName: 'TON',
    icon: TONChainIcon,
    scanImageUrl: '/assets/images/scans/tonviewer.png',
  },
};
