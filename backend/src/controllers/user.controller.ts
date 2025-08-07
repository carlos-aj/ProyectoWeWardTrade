import { Request, Response } from 'express';

import * as UserService from '../services/user.service';
import { sendConfirmationEmail } from '../utils/emailSender';

export async function getUser(req: Request, res: Response) {
    const userId = parseInt(req.params.id, 10);
    try {
        const user = await UserService.getUser(userId);
        if (!user) {
        return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving user', error });
    }
}

export async function getAllUsers(req: Request, res: Response) {
    try {
        const users = await UserService.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving users', error });
    }
}

export async function createUser(req: Request, res: Response) {
    console.log('Petición recibida en /api/users')
    const userData = req.body;
    try {
        console.log('Intentando crear usuario con datos:', userData);
        const newUser = await UserService.createUser(userData);
        console.log('Usuario creado:', newUser);

        const confirmationLink = `http://localhost:5000/api/users/confirm/${newUser.email_confirmation_token}`;
        try {
            await sendConfirmationEmail(newUser.email, confirmationLink);
        } catch (emailError) {
            console.error('Error enviando correo de confirmación:', emailError);
        }
        res.status(201).json({ message: 'Usuario creado. Revisa tu correo para confirmar la cuenta.' });
    } catch (error) {
        console.error('Error creando usuario:', error);
        res.status(500).json({ message: 'Error creating user', error });
    }
}

export async function confirmEmail(req: Request, res: Response) {
    const { token } = req.params;
    try {
        const user = await UserService.confirmEmail(token);
        if (!user) {
            return res.status(400).json({ message: 'Token inválido o expirado' });
        }
        return res.redirect('http://localhost:3000/');
    } catch (error) {
        res.status(500).json({ message: 'Error confirmando correo', error });
    }
}

export async function updateUser(req: Request, res: Response) {
    const userId = parseInt(req.params.id, 10);
    const userData = req.body;
    try {
        const updatedUser = await UserService.updateUser(userId, userData);
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }
}

export async function deleteUser(req: Request, res: Response) {
    const userId = parseInt(req.params.id, 10);
    try {
        const deletedCount = await UserService.deleteUser(userId);
        if (deletedCount === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
}

export async function login(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
        const result = await UserService.loginUser(email, password);
        res.json(result);
    } catch (error: any) {
        res.status(401).json({ message: error.message || 'Credenciales inválidas' });
    }
}

export async function requestPasswordReset(req: Request, res: Response) {
    const { email } = req.body;
    try {
        await UserService.requestPasswordReset(email);
        res.json({ message: 'Correo de recuperación enviado' });
    } catch (error: any) {
        res.status(400).json({ message: error.message || 'Error al solicitar recuperación' });
    }
}

export async function resetPassword(req: Request, res: Response) {
    const { token, newPassword } = req.body;
    try {
        await UserService.resetPassword(token, newPassword);
        res.json({ message: 'Contraseña restablecida correctamente' });
    } catch (error: any) {
        res.status(400).json({ message: error.message || 'Error al restablecer contraseña' });
    }
}
