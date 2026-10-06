import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import apiRoutes from './routes/api.routes.js';

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.CLIENT_ORIGIN,
].filter(Boolean) as string[];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (
        allowedOrigins.includes(origin) ||
        origin.endsWith('.vercel.app') ||
        process.env.NODE_ENV !== 'production'
      ) {
        return callback(null, true);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static uploads
const uploadsDir = path.join(process.cwd(), 'uploads');
app.use('/uploads', express.static(uploadsDir));

// API routes
app.use('/api', apiRoutes);

// Health check endpoint
app.get('/health', (_req, res) => {
  res.json({
    status: 'online',
    service: 'CivicAI Infrastructure Engine',
    geminiConfigured: !!process.env.GEMINI_API_KEY,
    timestamp: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  console.log(`\n==================================================`);
  console.log(`🚀 CivicAI Express Server running on port ${PORT}`);
  console.log(`🌐 API Base: http://localhost:${PORT}/api`);
  console.log(`🤖 Gemini API Key Status: ${process.env.GEMINI_API_KEY ? 'ACTIVE' : 'DEMO FALLBACK MODE'}`);
  console.log(`==================================================\n`);
});
