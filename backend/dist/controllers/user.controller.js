"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = getUser;
exports.getAllUsers = getAllUsers;
exports.createUser = createUser;
exports.confirmEmail = confirmEmail;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.login = login;
exports.requestPasswordReset = requestPasswordReset;
exports.resetPassword = resetPassword;
const UserService = __importStar(require("../services/user.service"));
const emailSender_1 = require("../utils/emailSender");
async function getUser(req, res) {
    const userId = parseInt(req.params.id, 10);
    try {
        const user = await UserService.getUser(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ message: 'Error retrieving user', error });
    }
}
async function getAllUsers(req, res) {
    try {
        const users = await UserService.getAllUsers();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ message: 'Error retrieving users', error });
    }
}
async function createUser(req, res) {
    console.log('Petición recibida en /api/users');
    const userData = req.body;
    try {
        console.log('Intentando crear usuario con datos:', userData);
        const newUser = await UserService.createUser(userData);
        console.log('Usuario creado:', newUser);
        const confirmationLink = `http://localhost:5000/api/users/confirm/${newUser.email_confirmation_token}`;
        try {
            await (0, emailSender_1.sendConfirmationEmail)(newUser.email, confirmationLink);
        }
        catch (emailError) {
            console.error('Error enviando correo de confirmación:', emailError);
        }
        res.status(201).json({ message: 'Usuario creado. Revisa tu correo para confirmar la cuenta.' });
    }
    catch (error) {
        console.error('Error creando usuario:', error);
        res.status(500).json({ message: 'Error creating user', error });
    }
}
async function confirmEmail(req, res) {
    const { token } = req.params;
    try {
        const user = await UserService.confirmEmail(token);
        if (!user) {
            return res.status(400).json({ message: 'Token inválido o expirado' });
        }
        return res.redirect('http://localhost:3000/');
    }
    catch (error) {
        res.status(500).json({ message: 'Error confirmando correo', error });
    }
}
async function updateUser(req, res) {
    const userId = parseInt(req.params.id, 10);
    const userData = req.body;
    try {
        const updatedUser = await UserService.updateUser(userId, userData);
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(updatedUser);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }
}
async function deleteUser(req, res) {
    const userId = parseInt(req.params.id, 10);
    try {
        const deletedCount = await UserService.deleteUser(userId);
        if (deletedCount === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
}
async function login(req, res) {
    const { email, password } = req.body;
    try {
        const result = await UserService.loginUser(email, password);
        res.json(result);
    }
    catch (error) {
        res.status(401).json({ message: error.message || 'Credenciales inválidas' });
    }
}
async function requestPasswordReset(req, res) {
    const { email } = req.body;
    try {
        await UserService.requestPasswordReset(email);
        res.json({ message: 'Correo de recuperación enviado' });
    }
    catch (error) {
        res.status(400).json({ message: error.message || 'Error al solicitar recuperación' });
    }
}
async function resetPassword(req, res) {
    const { token, newPassword } = req.body;
    try {
        await UserService.resetPassword(token, newPassword);
        res.json({ message: 'Contraseña restablecida correctamente' });
    }
    catch (error) {
        res.status(400).json({ message: error.message || 'Error al restablecer contraseña' });
    }
}
