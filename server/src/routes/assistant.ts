import { Router } from 'express';
import { z } from 'zod';
import { asyncHandler } from '../middleware/errorHandler';
import { validateQuery } from '../middleware/validateRequest';
import { AIAssistantService } from '../services/ai-assistant.service';
import { prisma } from '../lib/prisma';

const router = Router();
const aiAssistant = new AIAssistantService(prisma);

// Validation schemas
const QuerySchema = z.object({
  q: z.string().min(1, 'Query is required'),
});

// POST /api/assistant/query - AI Assistant natural language query
router.post(
  '/query',
  asyncHandler(async (req, res) => {
    const { query } = req.body;

    if (!query || typeof query !== 'string') {
      return res.status(400).json({
        error: 'Query is required and must be a string',
      });
    }

    const response = await aiAssistant.query(query);

    res.json({
      success: true,
      query,
      response,
    });
  })
);

// GET /api/assistant/starters - Get conversation starters
router.get(
  '/starters',
  asyncHandler(async (req, res) => {
    const starters = await aiAssistant.getConversationStarters();

    res.json({
      success: true,
      starters,
    });
  })
);

export default router;
