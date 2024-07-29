"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// routes/reservation.routes.ts
const express_1 = require("express");
const bookings_controller_1 = require("../controllers/bookings.controller");
const router = (0, express_1.Router)();
router.post('/reservations', bookings_controller_1.createReservation);
router.get('/reservations', bookings_controller_1.getReservations);
router.get('/reservations/:id', bookings_controller_1.getReservationById);
router.put('/reservations/:id', bookings_controller_1.updateReservation);
router.delete('/reservations/:id', bookings_controller_1.deleteReservation);
router.get('/reservations/user/:userId', bookings_controller_1.getReservationsByUserId);
router.patch('/reservations/:id', bookings_controller_1.softDeleteReservation);
exports.default = router;
