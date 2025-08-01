import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';
import userRouter from './routes/user.router';
import './db/knex'; 

const app = express();
const PORT = 5000;

app.use(express.json());
app.use('/api/users', userRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('¡Hola desde el backend!');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor backend en http://localhost:${PORT}`);
});