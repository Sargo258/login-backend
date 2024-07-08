import express from 'express';
import cors from 'cors';
import userRouter from './routes/user.routes'; // Asegúrate de importar el archivo correcto

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Rutas API
app.use('/api', userRouter); 

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor backend corriendo en http://localhost:${port}`);
});
