import { Router } from 'express';
import { addTestimonial, getTestimonials, deleteTestimonial } from '../controllers/comments.controller';

const router = Router();

router.post('/comments', addTestimonial);
router.get('/comments', getTestimonials);
router.delete('/comments/:id', deleteTestimonial);

export default router;
