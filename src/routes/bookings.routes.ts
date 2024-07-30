import { Router } from 'express';
import {
  createReservation,
  getReservationById,
  updateReservation,
  deleteReservation,
  getReservationsByUserId,
  softDeleteReservation,
  getAllReservations
} from '../controllers/bookings.controller';

const router = Router();

// Cambia la base de la ruta para usar el prefijo /api/bookings
router.post('/bookings', createReservation);
router.get('/bookings/:id', getReservationById);
router.put('/bookings/:id', updateReservation);
router.delete('/bookings/:id', deleteReservation);
router.get('/bookings/user/:userId', getReservationsByUserId);
router.get('/reservations/all', getAllReservations); // Usa la ruta correcta
router.patch('/bookings/:id', softDeleteReservation);

export default router;

