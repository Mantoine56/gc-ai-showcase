import { NextFunction, Request, Response } from 'express';

interface RateLimitBucket {
  resetAt: number;
  count: number;
}

interface RateLimitOptions {
  windowMs: number;
  max: number;
  keyPrefix: string;
}

const buckets = new Map<string, RateLimitBucket>();

function getClientKey(req: Request, keyPrefix: string): string {
  const authUser = req.auth?.userId;
  if (authUser) return `${keyPrefix}:user:${authUser}`;

  const ip = req.ip || req.socket.remoteAddress || 'unknown';
  return `${keyPrefix}:ip:${ip}`;
}

export function createRateLimit(options: RateLimitOptions) {
  const { windowMs, max, keyPrefix } = options;

  return (req: Request, res: Response, next: NextFunction) => {
    const now = Date.now();
    const key = getClientKey(req, keyPrefix);
    const existing = buckets.get(key);

    if (!existing || now > existing.resetAt) {
      buckets.set(key, { count: 1, resetAt: now + windowMs });
      return next();
    }

    if (existing.count >= max) {
      return res.status(429).json({
        error: 'Too Many Requests',
        message: 'Rate limit exceeded. Please retry later.',
        retryAfterMs: existing.resetAt - now,
      });
    }

    existing.count += 1;
    buckets.set(key, existing);
    return next();
  };
}
