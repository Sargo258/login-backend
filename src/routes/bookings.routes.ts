// routes/reservation.routes.ts
import { Router } from 'express';
import {
  createReservation,
  getReservations,
  getReservationById,
  updateReservation,
  deleteReservation,
  getReservationsByUserId,
  softDeleteReservation
} from '../controllers/bookings.controller';

const router = Router();

router.post('/reservations', createReservation);
router.get('/reservations', getReservations);
router.get('/reservations/:id', getReservationById);
router.put('/reservations/:id', updateReservation);
router.delete('/reservations/:id', deleteReservation);
router.get('/reservations/user/:userId', getReservationsByUserId);
router.patch('/reservations/:id', softDeleteReservation);

export default router;
