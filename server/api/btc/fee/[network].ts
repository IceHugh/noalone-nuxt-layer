import { MempoolUndici } from '~layer/utils/server';
import { Network } from 'btc-connect-vue';
// import { BtcRecommendedFees } from '~layer/types';

export default defineEventHandler(async (event) => {
  const network = (event.context.params?.network || Network.LIVENET) as Network;
  const mempoolUndici = new MempoolUndici({ network });
  const [err, fees] = await mempoolUndici.getRecommendedFee();
  if (err) {
    throw err;
  }
  return fees;
});
