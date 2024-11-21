import { Chain } from '@/web3/constants';
import { TON_SCAN_URL } from '@/web3/ton/constants';
import { clsx, type ClassValue } from 'clsx';
import { getCookie } from 'cookies-next';
import { CookiesFn } from 'cookies-next/lib/types';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function fallbackCopyTextToClipboard(text: string) {
  const textArea = document.createElement('textarea');
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = '0';
  textArea.style.left = '0';
  textArea.style.position = 'fixed';

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    const successful = document.execCommand('copy');
    const msg = successful ? 'successful' : 'unsuccessful';
    console.log('Fallback: Copying text command was ' + msg);
  } catch (err) {
    console.error('Fallback: Oops, unable to copy', err);
  }

  document.body.removeChild(textArea);
}

export const copyToClipboard = (text: string) => {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard.writeText(text);
};

export function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return String(error);
}

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export const getBscScanLink = (txHash: string) => {
  const bscScanLink =
    process.env.NEXT_PUBLIC_BSC_SCAN_URL || 'https://testnet.bscscan.com';
  return bscScanLink + '/tx/' + txHash;
};

export const getBscAddressLink = (address: string) => {
  const bscScanLink =
    process.env.NEXT_PUBLIC_BSC_SCAN_URL || 'https://testnet.bscscan.com';
  return bscScanLink + '/address/' + address;
};

export const getTonScanLink = (txHash: string) => {
  return TON_SCAN_URL + `/transaction/${txHash}`;
};

export const getTonScanAddressLink = (address: string) => {
  return TON_SCAN_URL + `/${address}`;
};

export const isClientSide = () => typeof window !== 'undefined';

export const handleParseDescription = (des: string) => {
  let desChange = des;
  if (des === undefined) return (desChange = '');
  else if (des.length > 160) {
    return (desChange = `${des.trim().slice(0, 160).trim()}...`);
  } else return desChange;
};

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const isUUID = (uuid: string): boolean =>
  uuid.match(
    '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$'
  ) !== null;

export async function retry<T>(
  fn: () => Promise<T>,
  options: { retries: number; delay: number }
): Promise<T> {
  let lastError: Error | undefined;
  for (let i = 0; i < options.retries; i++) {
    try {
      return await fn();
    } catch (e) {
      if (e instanceof Error) {
        lastError = e;
      }
      await delay(options.delay);
    }
  }
  throw lastError;
}

export const getNetworkByCookie = (cookies?: CookiesFn) => {
  const network = getCookie('network', { cookies }) as Chain;

  if (!network || !Chain[network]) return Chain.BNB;
  return network;
};
