import { Router } from 'express';
import cors from 'cors';
import { getAllUsers, createUser, loginUser } from '../controllers/user.controller';
import { authenticate, authorize } from '../middleware/authorize';

const router = Router();

const corsOptions = {
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

// Rutas públicas
router.post('/login', cors(corsOptions), loginUser);
router.post('/users', cors(corsOptions), createUser);

// Rutas protegidas
router.get('/users', cors(corsOptions), authenticate, authorize(['admin']), getAllUsers);

export default router;
