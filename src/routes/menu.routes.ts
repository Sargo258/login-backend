import { Router } from 'express';
import { createMenuItem, getAllMenuItems, updateMenuItem, deleteMenuItem } from '../controllers/menu.controller';

const router = Router();

router.post('/menu', createMenuItem);
router.get('/menu', getAllMenuItems);
router.put('/menu/:id', updateMenuItem);
router.delete('/menu/:id', deleteMenuItem);

export default router;
