import { Router } from 'express';
import { addTestimonial, getTestimonials } from '../controllers/comments.controller';

const router = Router();

router.post('/comments', addTestimonial);
router.get('/comments', getTestimonials);

export default router;
