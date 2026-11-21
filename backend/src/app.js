import express from 'express';
import cors from 'cors';
import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { timingSafeEqual } from 'node:crypto';
import { profile } from './data/profile.js';
import { ensureStore, saveMessage, listMessages, storeMode, StoreUnavailableError } from './store.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || '';
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173';

const app = express();
app.disable('x-powered-by');
app.set('trust proxy', 1);
app.use(cors({ origin: CORS_ORIGIN.split(',').map((s) => s.trim()) }));
app.use(express.json({ limit: '20kb' }));

// --- tiny in-memory rate limiter for the contact form ---
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map();
function rateLimit(req, res, next) {
  const now = Date.now();
  const entry = hits.get(req.ip) ?? { count: 0, start: now };
  if (now - entry.start > WINDOW_MS) Object.assign(entry, { count: 0, start: now });
  entry.count += 1;
  hits.set(req.ip, entry);
  if (entry.count > MAX_PER_WINDOW) {
    return res.status(429).json({ error: 'Too many messages. Please try again in a few minutes.' });
  }
  next();
}
setInterval(() => {
  const now = Date.now();
  for (const [ip, e] of hits) if (now - e.start > WINDOW_MS) hits.delete(ip);
}, WINDOW_MS).unref();

// --- validation ---
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
function validateContact(body = {}) {
  const str = (v) => (typeof v === 'string' ? v.trim() : '');
  const data = {
    name: str(body.name),
    email: str(body.email),
    subject: str(body.subject),
    message: str(body.message),
  };
  const errors = {};
  if (!data.name || data.name.length > 100) errors.name = 'Please enter your name (max 100 characters).';
  if (!EMAIL_RE.test(data.email) || data.email.length > 200) errors.email = 'Please enter a valid email address.';
  if (data.subject.length > 200) errors.subject = 'Subject is too long (max 200 characters).';
  if (data.message.length < 10 || data.message.length > 5000)
    errors.message = 'Message should be between 10 and 5000 characters.';
  return { data, errors };
}

function requireAdmin(req, res, next) {
  const header = req.get('authorization') || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';
  const ok =
    ADMIN_TOKEN &&
    token.length === ADMIN_TOKEN.length &&
    timingSafeEqual(Buffer.from(token), Buffer.from(ADMIN_TOKEN));
  if (!ok) return res.status(401).json({ error: 'Unauthorized' });
  next();
}

// --- routes ---
app.get('/api/health', async (_req, res) => {
  await ensureStore();
  res.json({ ok: true, store: storeMode() });
});

app.get('/api/profile', (_req, res) => {
  res.set('Cache-Control', 'public, max-age=300');
  res.json(profile);
});

app.post('/api/contact', rateLimit, async (req, res, next) => {
  // Honeypot: real users never fill the hidden "website" field.
  if (req.body?.website) return res.status(201).json({ ok: true });
  const { data, errors } = validateContact(req.body);
  if (Object.keys(errors).length) return res.status(400).json({ error: 'Validation failed', errors });
  try {
    await saveMessage(data);
    res.status(201).json({ ok: true });
  } catch (err) {
    next(err);
  }
});

app.get('/api/messages', requireAdmin, async (_req, res, next) => {
  try {
    res.json(await listMessages());
  } catch (err) {
    next(err);
  }
});

app.use('/api', (_req, res) => res.status(404).json({ error: 'Not found' }));

// --- serve the built frontend in production ---
const DIST = resolve(__dirname, '../../frontend/dist');
if (existsSync(DIST)) {
  app.use(express.static(DIST));
  app.get(/^(?!\/api).*/, (_req, res) => res.sendFile(resolve(DIST, 'index.html')));
}

app.use((err, _req, res, _next) => {
  if (err instanceof StoreUnavailableError) {
    console.error(err.message);
    return res.status(503).json({ error: 'The contact form is temporarily unavailable. Please try again later.' });
  }
  console.error(err);
  res.status(500).json({ error: 'Something went wrong. Please try again later.' });
});

export default app;
