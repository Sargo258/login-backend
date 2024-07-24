import { Router } from 'express';
import { createMenuItem, getAllMenuItems, updateMenuItem, deleteMenuItem, rateMenuItem, getFeaturedMenuItems } from '../controllers/menu.controller';

const router = Router();

router.post('/menu', createMenuItem);
router.get('/menu', getAllMenuItems);
router.put('/menu/:id', updateMenuItem);
router.delete('/menu/:id', deleteMenuItem);

// Rutas adicionales para calificaciones y platos destacados
router.post('/menu/rate', rateMenuItem);
router.get('/menu/featured', getFeaturedMenuItems)


export default router;
