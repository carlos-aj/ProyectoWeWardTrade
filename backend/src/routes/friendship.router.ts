import { Router } from 'express';

import * as FriendshipRouter from '../controllers/friendship.controller';
import { authenticateToken } from '../utils/auth';

const router = Router();

// Rutas protegidas
router.get('/:id', authenticateToken, FriendshipRouter.getFriendshipByUser);
router.post('/', authenticateToken, FriendshipRouter.createFriendship);
router.put('/:id', authenticateToken, FriendshipRouter.updateFriendship);
router.delete('/:id', authenticateToken, FriendshipRouter.deleteFriendship);
router.post('/:id/accept', authenticateToken, FriendshipRouter.acceptFriendship);
router.post('/:id/decline', authenticateToken, FriendshipRouter.declineFriendship);

// Rutas públicas

export default router;