// Local / traditional-host entry point. On Vercel, api/index.js exports the app instead.
import app from './app.js';
import { ensureStore, storeMode } from './store.js';

const PORT = Number(process.env.PORT) || 5001;

await ensureStore();
if (storeMode() === 'file') console.log('[store] Saving contact messages to backend/data/messages.json');
app.listen(PORT, () => console.log(`[api] listening on http://localhost:${PORT}`));
