"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = generateToken;
exports.verifyToken = verifyToken;
exports.authenticateToken = authenticateToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = process.env.JWT_SECRET || 'supersecret';
function generateToken(payload, expiresIn = '7d') {
    return jsonwebtoken_1.default.sign(payload, secret, { expiresIn });
}
function verifyToken(token) {
    return jsonwebtoken_1.default.verify(token, secret);
}
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Token requerido' });
    }
    try {
        const user = verifyToken(token);
        // @ts-ignore
        req.user = user;
        next();
    }
    catch (err) {
        return res.status(403).json({ message: 'Token inválido' });
    }
}
