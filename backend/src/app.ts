import express from 'express';
import cors from 'cors';
import boardRoutes from './routes/boardRoute.ts';

const app = express();

const corsOptions = {
  credentials: true,
  origin: 'https://incode-tt-cwjl.vercel.app',
};

app.use(express.json());
app.use(cors(corsOptions));

app.use('/', boardRoutes);

export default app;
