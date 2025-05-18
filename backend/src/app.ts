import express from 'express';
import cors from 'cors';
import boardRoutes from './routes/boardRoute.ts';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/', boardRoutes);

export default app;
