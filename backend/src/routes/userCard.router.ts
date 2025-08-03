import { Router } from 'express';

import * as UserCardController from '../controllers/userCard.controller';
import { authenticateToken } from '../utils/auth';

const router = Router();

// Rutas protegidas
router.get('/', authenticateToken, UserCardController.getAllUserCards);
router.get('/:id', authenticateToken, UserCardController.getUserCardById);
router.post('/', authenticateToken, UserCardController.createUserCard);
router.put('/:id', authenticateToken, UserCardController.updateUserCard);
router.delete('/:id', authenticateToken, UserCardController.deleteUserCard);
router.post('/:id/increment', authenticateToken, UserCardController.incrementUserCardQuantity);
router.post('/:id/decrement', authenticateToken, UserCardController.decrementUserCardQuantity);
router.post('/:id/unlock', authenticateToken, UserCardController.unlockUserCard);

// Rutas públicas

export default router;