import express from 'express';
import cors from 'cors';
import userRouter from './routes/user.routes';
import menuRoutes from './routes/menu.routes';
import commentsRoutes from './routes/comments.routes'
import bookingsRoutes from './routes/bookings.routes';

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Rutas API
app.use('/api', userRouter); 
app.use('/api', menuRoutes);
app.use('/api', commentsRoutes);
app.use('/api', bookingsRoutes)

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor backend corriendo en http://localhost:${port}`);
});
