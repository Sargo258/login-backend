"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bookings_controller_1 = require("../controllers/bookings.controller");
const router = (0, express_1.Router)();
// Cambia la base de la ruta para usar el prefijo /api/bookings
router.post('/bookings', bookings_controller_1.createReservation);
router.get('/bookings/:id', bookings_controller_1.getReservationById);
router.put('/bookings/:id', bookings_controller_1.updateReservation);
router.delete('/bookings/:id', bookings_controller_1.deleteReservation);
router.get('/bookings/user/:userId', bookings_controller_1.getReservationsByUserId);
router.get('/reservations/all', bookings_controller_1.getAllReservations); // Usa la ruta correcta
router.patch('/bookings/:id', bookings_controller_1.softDeleteReservation);
exports.default = router;
