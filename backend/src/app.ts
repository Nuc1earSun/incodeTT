import express from 'express';
import cors from 'cors';
import boardRoutes from './routes/boardRoute';

const app = express();

const corsOptions = {
  credentials: true,
  origin: "*",
};

app.use(express.json());
app.use(cors(corsOptions));

app.use('/', boardRoutes);

export default app;
