import type { EventHandler, EventHandlerRequest } from 'h3';

export const defineWrappedResponseHandler = <T extends EventHandlerRequest, D>(
  handler: EventHandler<T, D>,
): EventHandler<T, D> =>
  defineEventHandler<T>(async (event) => {
    try {
      const response = await handler(event);
      return { code: '000000', data: response, msg: 'success' };
    } catch (err: any) {
      return { code: '999999', data: null, msg: err.message || err };
    }
  });
