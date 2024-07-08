import { Router } from 'express';
import cors from 'cors';
import { getAllUsers, createUser, loginUser } from '../controllers/user.controller';

const router = Router();

const corsOptions = {
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

router.get('/users', cors(corsOptions), getAllUsers);
router.post('/users', cors(corsOptions), createUser);
router.post('/login', cors(corsOptions), loginUser);

export default router;
