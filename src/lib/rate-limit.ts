type RateLimitOptions = {
  windowMs: number; // Duration window (e.g. 60,000ms = 1 minute)
  max: number;      // Maximum allowed attempts
};

type RateLimitRecord = {
  count: number;
  resetTime: number;
};

const tracker = new Map<string, RateLimitRecord>();

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return "127.0.0.1";
}

export function checkRateLimit(
  key: string,
  options: RateLimitOptions = { windowMs: 60_000, max: 5 }
) {
  const now = Date.now();
  const record = tracker.get(key);

  if (!record || now > record.resetTime) {
    tracker.set(key, { count: 1, resetTime: now + options.windowMs });
    return { success: true, remaining: options.max - 1, resetTime: now + options.windowMs };
  }

  if (record.count >= options.max) {
    return { success: false, remaining: 0, resetTime: record.resetTime };
  }

  record.count += 1;
  return { success: true, remaining: options.max - record.count, resetTime: record.resetTime };
}