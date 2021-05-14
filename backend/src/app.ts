import express from 'express';
import cors from 'cors';

import { authRoutes } from './routes/auth-routes.js';
import { errorRoutes } from './routes/error-routes.js';

const app = express();

app.set('port', Number(process.env.PORT || 5000));
app.use(express.json());
app.use(cors());

// --- Routes ---
app.use('/api/auth', authRoutes);
app.use(errorRoutes);

export default app;
