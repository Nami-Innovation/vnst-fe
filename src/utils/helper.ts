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
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const getBscScanLink = (txHash: string) => {
  const bscScanLink =
    process.env.NEXT_PUBLIC_BSC_SCAN_URL || 'https://testnet.vicscan.xyz';
  return bscScanLink + '/tx/' + txHash;
};

export const getBscAddressLink = (address: string) => {
  const bscScanLink =
    process.env.NEXT_PUBLIC_BSC_SCAN_URL || 'https://testnet.vicscan.xyz';
  return bscScanLink + '/address/' + address;
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
