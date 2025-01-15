import { Network } from 'btc-connect-vue';
import { bitcoin } from '~/utils/web3/btc/wallet-sdk/bitcoin';

export const toBitcoinNetwork = (network: Network) => {
  switch (network) {
    case Network.LIVENET:
      return bitcoin.networks.bitcoin;
    case Network.TESTNET:
      return bitcoin.networks.testnet;
    case Network.REGTEST:
      return bitcoin.networks.regtest;
    case Network.TESTNET4:
      return bitcoin.networks.testnet;
  }
};

export const toNetwork = (network: bitcoin.Network) => {
  switch (network.bech32) {
    case bitcoin.networks.bitcoin.bech32:
      return Network.LIVENET;
    case bitcoin.networks.testnet.bech32:
      return Network.TESTNET;
    default:
      return Network.REGTEST;
  }
};
