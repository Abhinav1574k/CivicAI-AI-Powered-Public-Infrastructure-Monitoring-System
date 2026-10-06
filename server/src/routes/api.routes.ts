import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import {
  getAllIssues,
  getIssueById,
  createIssue,
  analyzeImage,
  updateIssueStatus,
  getDashboardStats,
} from '../controllers/issue.controller.js';

const router = Router();

// Configure multer for file uploads
const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, 'civic-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

router.get('/issues', getAllIssues);
router.get('/issues/:id', getIssueById);
router.post('/issues', createIssue);
router.post('/analyze', upload.single('image'), analyzeImage);
router.patch('/issues/:id/status', updateIssueStatus);
router.get('/dashboard/stats', getDashboardStats);

export default router;
