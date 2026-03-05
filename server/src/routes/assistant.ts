import { Router } from 'express';
import { asyncHandler } from '../middleware/errorHandler';
import { prisma } from '../lib/prisma';
import { AIAssistantService } from '../services/ai-assistant.service';
import { validateBody, validateQuery } from '../middleware/validateRequest';
import { AssistantQuerySchema } from '../validation/schemas';
import { authenticateOptional } from '../middleware/auth';
import { createRateLimit } from '../middleware/rateLimit';

const router = Router();
const aiAssistant = new AIAssistantService(prisma);

router.use(authenticateOptional);

router.post(
  '/query',
  createRateLimit({ windowMs: 60_000, max: 30, keyPrefix: 'assistant:query' }),
  validateBody(AssistantQuerySchema),
  asyncHandler(async (req, res) => {
    const { query, locale } = req.body as { query: string; locale: 'en' | 'fr' };
    const response = await aiAssistant.query(query, locale);

    res.json({
      success: true,
      query,
      locale,
      response,
    });
  })
);

router.get(
  '/starters',
  validateQuery(
    AssistantQuerySchema.pick({
      locale: true,
    }).partial()
  ),
  asyncHandler(async (req, res) => {
    const locale = (req.query.locale as 'en' | 'fr' | undefined) || 'en';
    const starters = await aiAssistant.getConversationStarters(locale);

    res.json({
      success: true,
      locale,
      starters,
    });
  })
);

export default router;
