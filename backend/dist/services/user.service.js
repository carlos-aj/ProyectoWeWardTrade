"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = getUser;
exports.getAllUsers = getAllUsers;
exports.createUser = createUser;
exports.confirmEmail = confirmEmail;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.loginUser = loginUser;
const crypto_1 = __importDefault(require("crypto"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = require("../models/User");
const auth_1 = require("../utils/auth");
async function getUser(id) {
    return await User_1.User.query().findById(id);
}
async function getAllUsers() {
    return await User_1.User.query();
}
async function createUser(user) {
    const token = crypto_1.default.randomBytes(32).toString('hex');
    const now = new Date();
    const hashedPassword = await bcrypt_1.default.hash(user.password, 10);
    if (!hashedPassword || hashedPassword === user.password) {
        throw new Error('La contraseña no fue cifrada correctamente');
    }
    return await User_1.User.query().insert({
        ...user,
        password: hashedPassword,
        email_confirmed: false,
        email_confirmation_token: token,
        email_confirmation_sent_at: now
    });
}
async function confirmEmail(token) {
    const user = await User_1.User.query().findOne({ email_confirmation_token: token });
    if (!user || !user.id)
        return null;
    return await User_1.User.query().patchAndFetchById(user.id, {
        email_confirmed: true,
        email_confirmation_token: undefined
    });
}
async function updateUser(id, user) {
    return await User_1.User.query().patchAndFetchById(id, user);
}
async function deleteUser(id) {
    return await User_1.User.query().deleteById(id);
}
async function loginUser(email, password) {
    const user = await User_1.User.query().findOne({ email });
    if (!user) {
        throw new Error('Usuario o contraseña incorrectos');
    }
    if (!user.email_confirmed) {
        throw new Error('Debes confirmar tu correo antes de iniciar sesión');
    }
    const validPassword = await bcrypt_1.default.compare(password, user.password);
    if (!validPassword) {
        throw new Error('Usuario o contraseña incorrectos');
    }
    const token = (0, auth_1.generateToken)({ id: user.id, email: user.email, name: user.name });
    return { token, user: { id: user.id, email: user.email, name: user.name } };
}
