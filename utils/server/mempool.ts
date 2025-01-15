import {
  Agent,
  interceptors,
  setGlobalDispatcher,
  getGlobalDispatcher,
} from 'undici';
import { fetch } from 'undici';
import { Network } from 'btc-connect-vue';
import { tryit } from 'radash';

export class MempoolUndici {
  public baseUrl = 'https://mempool.space';
  public network = Network.LIVENET;
  constructor({ baseURL, network }: { baseURL?: string; network: Network }) {
    this.network = network;
    if (baseURL) {
      this.baseUrl = baseURL;
    }
    this.baseUrl += this.network === Network.LIVENET ? '' : `/${this.network}`;
    // if (process.server) {
    //   setGlobalDispatcher(
    //     getGlobalDispatcher().compose(
    //       // // interceptors.redirect({ maxRedirections: 3 }),
    //       // interceptors.retry({
    //       //   maxRetries: 3,
    //       //   minTimeout: 1000,
    //       //   maxTimeout: 10000,
    //       //   timeoutFactor: 2,
    //       //   retryAfter: true,
    //       // }),
    //       interceptors.cache(),
    //     ),
    //   );
    // }
  }
  generateUrl(path: string) {
    return `${this.baseUrl}${path}`;
  }
  getRecommendedFee() {
    return tryit(async () => {
      const response = await fetch(
        this.generateUrl('/api/v1/fees/recommended'),
      );
      return response.json();
    })();
  }
}
