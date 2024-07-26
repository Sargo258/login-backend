// routes/reservation.routes.ts
import { Router } from 'express';
import {
  createReservation,
  getReservations,
  getReservationById,
  updateReservation,
  deleteReservation,
} from '../controllers/bookings.controller';

const router = Router();

router.post('/reservations', createReservation);
router.get('/reservations', getReservations);
router.get('/reservations/:id', getReservationById);
router.put('/reservations/:id', updateReservation);
router.delete('/reservations/:id', deleteReservation);

export default router;
