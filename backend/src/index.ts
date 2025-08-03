import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';
import userRouter from './routes/user.router';
import cardRouter from './routes/card.router';
import groupRouter from './routes/group.router';
import userCardRouter from './routes/userCard.router';
import './db/knex'; 

const app = express();
const PORT = 5000;
app.use(express.json());
app.use('/api/users', userRouter);
app.use('/api/cards', cardRouter);
app.use('/api/groups', groupRouter);
app.use('/api/user-cards', userCardRouter);


app.get('/', (req: Request, res: Response) => {
  res.send('¡Hola desde el backend!');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor backend en http://localhost:${PORT}`);
});