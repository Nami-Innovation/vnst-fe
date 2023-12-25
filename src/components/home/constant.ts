import { formatNumber } from '@/utils/format';

type KEY_CONTENT = 'minted' | 'redeem' | 'transaction' | 'holders';
type KEY_VALUE = {
  title: string;
  content: number;
};
export const LIST_CONTENT_BANNER: Record<KEY_CONTENT, KEY_VALUE> = {
  minted: {
    title: 'homepage:title_mint',
    content: 10000000,
  },
  redeem: {
    title: 'homepage:title_redeem',
    content: 100000000,
  },
  transaction: {
    title: 'homepage:title_transaction',
    content: 680268,
  },
  holders: {
    title: 'homepage:title_holders',
    content: 8936,
  },
};

export function shortenHexString(
  hexString: string,
  prefixLength: number,
  suffixLength: number
): string {
  if (hexString?.length < prefixLength + suffixLength) {
    return '';
  }

  const prefix = hexString?.slice(0, prefixLength);
  const suffix = hexString?.slice(-suffixLength);

  return `${prefix}...${suffix}`;
}
export const convertMoney = (
  nameMoney: string,
  exchange_rate: number,
  amount_money: number
) => {
  if (nameMoney === 'VNST') {
    return `~${formatNumber(Number(amount_money) / exchange_rate, 0)} USDT`;
  } else if (nameMoney === 'USDT') {
    return `~${formatNumber(Number(amount_money) * exchange_rate, 1)} VNST`;
  }
};
const telegramRegex = /.*\B@(?=\w{5,32}\b)[a-zA-Z0-9]+(?:_[a-zA-Z0-9]+)*.*/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const isTelegram = (input: string) => {
  return telegramRegex.test(input);
};

export const isEmail = (input: string) => {
  return emailRegex.test(input);
};
export const isValidInput = (input: string) => {
  if (emailRegex.test(input) || telegramRegex.test(input)) {
    return true;
  } else {
    return false;
  }
};

export const updateArray = (array: any[], maxCount: number) => {
  if (array.length < 0) return [];
  let returnArr = array;

  while (returnArr.length < maxCount) {
    returnArr = returnArr.concat(array);
  }
  return returnArr.slice(0, maxCount);
};
