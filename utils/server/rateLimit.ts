import { Redis } from '@upstash/redis';
import { Ratelimit, type Duration } from '@upstash/ratelimit';

export const redis = Redis.fromEnv();

export const createRateLimiter = ({
  limit,
  duration,
  prefix = 'logo',
}: {
  limit: number;
  duration: Duration;
  prefix: string;
}) => {
  return new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(limit, duration),
    analytics: true,
    prefix,
  });
};
