// Message storage: MongoDB when MONGODB_URI is set and reachable,
// otherwise a local JSON file so the site works with zero setup in development.
// On Vercel (read-only, ephemeral filesystem) MongoDB is required for the contact form.
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import mongoose from 'mongoose';

const __dirname = dirname(fileURLToPath(import.meta.url));
const FILE_PATH = resolve(__dirname, '../data/messages.json');
const IS_SERVERLESS = Boolean(process.env.VERCEL);

const messageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    email: { type: String, required: true, trim: true, maxlength: 200 },
    subject: { type: String, trim: true, maxlength: 200, default: '' },
    message: { type: String, required: true, trim: true, maxlength: 5000 },
    read: { type: Boolean, default: false },
  },
  { timestamps: true },
);
const Message = mongoose.models.Message || mongoose.model('Message', messageSchema);

export class StoreUnavailableError extends Error {}

let mode = 'file';
let connecting = null;

// Connects once and reuses the connection across warm serverless invocations.
// A failed attempt is not cached, so the next request retries.
export async function ensureStore() {
  const uri = process.env.MONGODB_URI;
  if (!uri || mode === 'mongo') return mode;
  connecting ??= mongoose
    .connect(uri, { serverSelectionTimeoutMS: 5000 })
    .then(() => {
      mode = 'mongo';
      console.log('[store] Connected to MongoDB');
    })
    .catch((err) => {
      console.warn(`[store] MongoDB unavailable: ${err.message}`);
    })
    .finally(() => {
      connecting = null;
    });
  await connecting;
  return mode;
}

export const storeMode = () => mode;

function assertWritableFallback() {
  if (IS_SERVERLESS) {
    throw new StoreUnavailableError(
      'MongoDB is not configured or unreachable. Set MONGODB_URI in the Vercel project settings.',
    );
  }
}

async function readFileStore() {
  try {
    return JSON.parse(await readFile(FILE_PATH, 'utf8'));
  } catch (err) {
    if (err.code === 'ENOENT') return [];
    throw err;
  }
}

// Serialize file writes so concurrent submissions don't clobber each other.
let fileQueue = Promise.resolve();

export async function saveMessage(data) {
  if ((await ensureStore()) === 'mongo') {
    const doc = await Message.create(data);
    return doc.toObject();
  }
  assertWritableFallback();
  const run = fileQueue.then(async () => {
    const all = await readFileStore();
    const now = new Date().toISOString();
    const doc = { _id: crypto.randomUUID(), ...data, read: false, createdAt: now, updatedAt: now };
    all.push(doc);
    await mkdir(dirname(FILE_PATH), { recursive: true });
    await writeFile(FILE_PATH, JSON.stringify(all, null, 2));
    return doc;
  });
  fileQueue = run.catch(() => {});
  return run;
}

export async function listMessages() {
  if ((await ensureStore()) === 'mongo') {
    return Message.find().sort({ createdAt: -1 }).lean();
  }
  assertWritableFallback();
  const all = await readFileStore();
  return all.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}
