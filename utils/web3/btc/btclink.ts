import { Network } from 'btc-connect-vue';
interface OrdinalsLinkParams {
  id: string;
  network?: Network;
  type?: 'content' | 'preview' | 'inscription';
}
export const getOrdinalsLink = ({
  id,
  network = Network.LIVENET,
  type = 'content',
}: OrdinalsLinkParams) => {
  const networkUrl: any = {
    [Network.LIVENET]: 'https://ordiscan.com',
    [Network.TESTNET]: 'https://ord-testnet4.ordx.space',
    [Network.TESTNET4]: 'https://ord-testnet4.ordx.space',
  };
  const url = networkUrl[network] || networkUrl.mainnet;
  return `${url}/${type}/${id}`;
};

export const generateOrdxUrl = ({
  network,
  path,
  locale,
}: {
  network: Network;
  path?: string;
  locale?: string;
}) => {
  const base =
    network === Network.LIVENET
      ? 'https://ord-mainnet.sat20.org'
      : 'https://ord-testnet4.sat20.org';
  let url = base;
  if (locale) {
    url += `/${locale}`;
  }
  if (path) {
    url += `/${path}`;
  }
  return url;
};

export const generateMempoolUrl = ({
  network,
  path,
  locale,
}: {
  network: string;
  path?: string;
  locale?: string;
}) => {
  const base = 'https://mempool.space';
  let url = base;
  if (locale) {
    url += `/${locale}`;
  }
  if (network === 'testnet') {
    url += '/testnet4';
  }
  if (path) {
    url += `/${path}`;
  }
  return url;
};

export const resolveMempoolTxLink = (txid: string, network: string) => {
  const href = generateMempoolUrl({ network, path: `tx/${txid}` });
  return href;
};
