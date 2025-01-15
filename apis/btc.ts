import { Network } from 'btc-connect-vue';
import { type BtcRecommendedFees } from '~layer/types';

export const getBtcFee = (network: Network): Promise<BtcRecommendedFees> =>
  $fetch(`/api/btc/fee/${network}`);
