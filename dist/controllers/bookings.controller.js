"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReservation = exports.updateReservation = exports.getReservationById = exports.getReservations = exports.createReservation = void 0;
const db_1 = __importDefault(require("../db"));
const createReservation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, phone, date, time, people, user_id } = req.body;
    console.log('Received data:', { name, email, phone, date, time, people, user_id });
    try {
        // Verifica si el usuario ya tiene una reserva para la misma fecha
        const [rows] = yield db_1.default.query(`SELECT * FROM reservations WHERE user_id = ? AND date = ?`, [user_id, date]);
        // Asegúrate de que 'rows' es un array
        const existingReservations = Array.isArray(rows) ? rows : [];
        if (existingReservations.length > 0) {
            return res.status(400).json({ error: 'You already have a reservation for this date.' });
        }
        // Inserta la nueva reserva
        const [result] = yield db_1.default.query(`INSERT INTO reservations (name, email, phone, date, time, people, user_id) VALUES (?, ?, ?, ?, ?, ?, ?)`, [name, email, phone, date, time, people, user_id]);
        // Verifica el resultado de la inserción
        console.log('Insert Result:', result);
        res.status(201).json({ id: result.insertId, name, email, phone, date, time, people, user_id });
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error creating reservation' });
    }
});
exports.createReservation = createReservation;
const getReservations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows] = yield db_1.default.query('SELECT * FROM reservations');
        res.json(rows);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching reservations' });
    }
});
exports.getReservations = getReservations;
const getReservationById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    try {
        // Realiza la consulta
        const [rows] = yield db_1.default.query('SELECT * FROM reservations WHERE id = ?', [id]);
        // Verifica si la consulta devolvió alguna fila
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Reservation not found' });
        }
        // Devuelve la primera fila encontrada
        const reservation = rows[0];
        res.status(200).json(reservation);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error retrieving reservation' });
    }
});
exports.getReservationById = getReservationById;
const updateReservation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const reservation = req.body;
    try {
        const [result] = yield db_1.default.query(`UPDATE reservations
         SET name = ?, email = ?, phone = ?, date = ?, time = ?, people = ?, user_id = ?
         WHERE id = ?`, [reservation.name, reservation.email, reservation.phone, reservation.date, reservation.time, reservation.people, reservation.user_id, id]);
        if (result.affectedRows > 0) {
            res.json(Object.assign({ id }, reservation));
        }
        else {
            res.status(404).json({ error: 'Reservation not found' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating reservation' });
    }
});
exports.updateReservation = updateReservation;
const deleteReservation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const [result] = yield db_1.default.query('DELETE FROM reservations WHERE id = ?', [id]);
        if (result.affectedRows > 0) {
            res.status(204).send();
        }
        else {
            res.status(404).json({ error: 'Reservation not found' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error deleting reservation' });
    }
});
exports.deleteReservation = deleteReservation;
