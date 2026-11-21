// Vercel serverless entry: every /api/* request is rewritten here (see vercel.json)
// and handled by the same Express app used locally.
export { default } from '../backend/src/app.js';
