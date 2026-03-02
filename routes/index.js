import express from 'express';
import toDo from './to_do.js';

const router = express.Router();

router.use('/toDo', toDo);

// Test route
router.get('/', (req, res) => {
  res.json({
    message: 'API is running',
    version: '1.0.0',
  });
});


router.use((req, res) => {
  res.status(404).json({
    success: false,
    error: {
      message: `Route not found: ${req.originalUrl}`,
    },
  });
});

export default router;