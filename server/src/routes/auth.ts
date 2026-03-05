import { Router } from 'express';
import { asyncHandler } from '../middleware/errorHandler';
import { authenticateOptional } from '../middleware/auth';

const router = Router();

router.use(authenticateOptional);

router.get(
  '/me',
  asyncHandler(async (req, res) => {
    const auth = req.auth || { isAuthenticated: false, roles: [] };
    res.json({
      authenticated: auth.isAuthenticated,
      user: auth.isAuthenticated
        ? {
            id: auth.userId,
            email: auth.email,
            displayName: auth.displayName,
          }
        : null,
      roles: auth.roles,
    });
  })
);

export default router;
