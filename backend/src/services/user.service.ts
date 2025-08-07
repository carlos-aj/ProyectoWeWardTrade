import crypto from 'crypto';
import bcrypt from 'bcrypt';

import { IUser, User } from "../models/User";
import { generateToken } from '../utils/auth';

import { sendPasswordResetEmail } from '../utils/emailSender';

export async function getUser(id: number) {
    return await User.query().findById(id);
}

export async function getAllUsers() {
    return await User.query();
}

export async function createUser(user: IUser){
    const token = crypto.randomBytes(32).toString('hex');
    const now = new Date();

    const hashedPassword = await bcrypt.hash(user.password, 10);

    if (!hashedPassword || hashedPassword === user.password) {
        throw new Error('La contraseña no fue cifrada correctamente');
    }

    const result = await User.query().insert({
        ...user,
        password: hashedPassword,
        email_confirmed: false,
        email_confirmation_token: token,
        email_confirmation_sent_at: now
    });
    console.log('Resultado de la inserción en la BD:', result);
    return result;
}

export async function confirmEmail(token: string) {
    const user = await User.query().findOne({ email_confirmation_token: token });
    if (!user || !user.id) return null;

    return await User.query().patchAndFetchById(user.id, {
        email_confirmed: true,
        email_confirmation_token: undefined
    });
}

export async function updateUser(id: number, user: Partial<IUser>) {
    return await User.query().patchAndFetchById(id, user);
}

export async function deleteUser(id: number) {
    return await User.query().deleteById(id);
}

export async function loginUser(email: string, password: string) {
    const user = await User.query().findOne({ email });
    if (!user) {
        throw new Error('Usuario o contraseña incorrectos');
    }
    if (!user.email_confirmed) {
        throw new Error('Debes confirmar tu correo antes de iniciar sesión');
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        throw new Error('Usuario o contraseña incorrectos');
    }
    const token = generateToken({ id: user.id, email: user.email, name: user.name });
    return { token, user: { id: user.id, email: user.email, name: user.name } };
}

export async function requestPasswordReset(email: string) {
    const user = await User.query().findOne({ email });
    if (!user || !user.id) {
        throw new Error('No existe usuario con ese email');
    }
    const resetToken = crypto.randomBytes(32).toString('hex');
    const now = new Date();
    await User.query().patchAndFetchById(user.id, {
        password_reset_token: resetToken,
        password_reset_sent_at: now
    });
    const resetLink = `http://localhost:3000/reset-password/${resetToken}`;
    await sendPasswordResetEmail(user.email, resetLink);
    return true;
}

export async function resetPassword(token: string, newPassword: string) {
    const user = await User.query().findOne({ password_reset_token: token });
    if (!user || !user.id) {
        throw new Error('Token inválido o expirado');
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.query().patchAndFetchById(user.id, {
        password: hashedPassword,
        password_reset_token: undefined,
        password_reset_sent_at: undefined
    });
    return true;
}