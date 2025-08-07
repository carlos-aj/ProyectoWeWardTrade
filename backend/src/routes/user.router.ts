import { Router } from 'express';
import * as UserController from '../controllers/user.controller';
import { authenticateToken } from '../utils/auth';

const router = Router();

// Rutas protegidas
router.get('/:id', authenticateToken, UserController.getUser);
router.get('/', authenticateToken, UserController.getAllUsers);
router.put('/:id', authenticateToken, UserController.updateUser);
router.delete('/:id', authenticateToken, UserController.deleteUser);

// Rutas públicas
router.post('/', UserController.createUser);
router.get('/confirm/:token', UserController.confirmEmail);
router.post('/login', UserController.login);

// Recuperación de contraseña
router.post('/request-password-reset', UserController.requestPasswordReset);
router.post('/reset-password', UserController.resetPassword);

export default router;
