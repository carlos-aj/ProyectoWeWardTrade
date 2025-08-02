"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const user_router_1 = __importDefault(require("./routes/user.router"));
const card_router_1 = __importDefault(require("./routes/card.router"));
const group_router_1 = __importDefault(require("./routes/group.router"));
const userCard_router_1 = __importDefault(require("./routes/userCard.router"));
require("./db/knex");
const app = (0, express_1.default)();
const PORT = 5000;
app.use(express_1.default.json());
app.use('/api/users', user_router_1.default);
app.use('/api/cards', card_router_1.default);
app.use('/api/groups', group_router_1.default);
app.use('/api/user-cards', userCard_router_1.default);
app.get('/', (req, res) => {
    res.send('¡Hola desde el backend!');
});
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor backend en http://localhost:${PORT}`);
});
