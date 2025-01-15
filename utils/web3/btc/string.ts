export function satsToBtc(sats: string | number): number {
  if (typeof sats === 'string') {
    sats = sats.trim();
  }

  if (isNaN(Number(sats))) {
    console.warn('Input is not a valid number, defaulting to 0');
    sats = 0;
  }

  let satoshis = Number(sats);

  // Ensure the number is non-negative
  if (satoshis < 0) {
    console.warn('Input must be a non-negative number, defaulting to 0');
    satoshis = 0;
  }

  // Round to the nearest integer to handle decimal Satoshis
  satoshis = Math.round(satoshis);

  // Convert Satoshis to BTC
  const btc = satoshis / 1e8;

  return btc;
}

export function btcToSats(btc: string | number): number {
  if (typeof btc === 'string') {
    btc = btc.trim();
  }

  if (isNaN(Number(btc))) {
    console.warn('Input is not a valid number, defaulting to 0');
    btc = 0;
  }

  let btcAmount = Number(btc);

  // Ensure the number is non-negative
  if (btcAmount < 0) {
    console.warn('Input must be a non-negative number, defaulting to 0');
    btcAmount = 0;
  }

  // Convert BTC to Satoshis and handle precision issues by rounding
  const sats = Math.round(btcAmount * 1e8);

  return sats;
}

// 将 Uint8Array 转换为十六进制字符串
export function uint8ArrayToHex(uint8Array: Uint8Array): string {
  return Array.from(uint8Array, (byte) =>
    byte.toString(16).padStart(2, '0'),
  ).join('');
}
