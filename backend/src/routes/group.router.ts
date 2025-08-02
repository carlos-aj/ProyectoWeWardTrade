import { Router } from 'express';

import * as GroupController from '../controllers/group.controller';
import { authenticateToken } from '../utils/auth';

const router = Router();

// Rutas protegidas
router.get('/', authenticateToken, GroupController.getAllGroups);
router.get('/:id', authenticateToken, GroupController.getGroup);
router.post('/', authenticateToken, GroupController.createGroup);
router.put('/:id', authenticateToken, GroupController.updateGroup);
router.delete('/:id', authenticateToken, GroupController.deleteGroup);

// Rutas públicas

export default router;