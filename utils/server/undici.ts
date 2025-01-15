import {
  Agent,
  interceptors,
  setGlobalDispatcher,
  getGlobalDispatcher,
} from 'undici';

export const createUndiciGlobal = () => {
  setGlobalDispatcher(
    getGlobalDispatcher().compose(
      // interceptors.redirect({ maxRedirections: 3 }),
      interceptors.retry({
        maxRetries: 3,
        minTimeout: 1000,
        maxTimeout: 10000,
        timeoutFactor: 2,
        retryAfter: true,
      }),
      interceptors.cache(),
    ),
  );
};
