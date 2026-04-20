// lib/rate-limit.ts
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export const rateLimiter = new Ratelimit({
    redis,
    limiter: Ratelimit.fixedWindow(2, "24 h"),
    analytics: true,
    prefix: "form_bamboo",
});