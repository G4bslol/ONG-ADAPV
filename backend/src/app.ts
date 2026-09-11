import express from 'express';
import cors from 'cors';
import { animalsRouter } from './modules/animals/animal.routes.js';
import { errorHandler } from './shared/middlewares/error-handler.js';

export const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/animals', animalsRouter);
app.use((req, res) => res.status(404).json({ error: 'Rota não encontrada' }));
app.use(errorHandler)