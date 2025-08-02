import { Router } from 'express';

import * as CardController from '../controllers/card.controller';
import { authenticateToken } from '../utils/auth';

const router = Router();

// Rutas protegidas
router.get('/', authenticateToken, CardController.getAllCards);
router.get('/:id', authenticateToken, CardController.getCard);
router.post('/', authenticateToken, CardController.createCard);
router.put('/:id', authenticateToken, CardController.updateCard);
router.delete('/:id', authenticateToken, CardController.deleteCard);

// Rutas públicas

export default router;