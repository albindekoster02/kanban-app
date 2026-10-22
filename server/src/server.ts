import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import taskRoutes from './routes/taskRoutes';
import quoteRoutes from './routes/quoteRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: '*',
}));
app.use(express.json());

app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'Backend körs korrekt!' });
});

app.use('/api/tasks', taskRoutes);
app.use('/api/quote', quoteRoutes);

app.listen(PORT, () => {
  console.log(`Backend körs på http://localhost:${PORT}`);
});