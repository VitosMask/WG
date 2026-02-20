import rateLimit from 'express-rate-limit';

export const authRateLimit = rateLimit({
  windowMs: 60_000,
  max: 15,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests. Slow down.'
});

export const messageRateLimit = rateLimit({
  windowMs: 10_000,
  max: 8,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Message spam protection triggered.'
});
