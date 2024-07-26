// controllers/reservation.controller.ts
import { Request, Response } from 'express';
import  pool  from '../db';
import { Reservation } from '../models/bookings.model';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

export const createReservation = async (req: Request, res: Response) => {
    const { name, email, phone, date, time, people, user_id } = req.body;
    console.log('Received data:', { name, email, phone, date, time, people, user_id });

    try {
      // Verifica si el usuario ya tiene una reserva para la misma fecha
      const [rows] = await pool.query(
        `SELECT * FROM reservations WHERE user_id = ? AND date = ?`,
        [user_id, date]
      );
  
      // Asegúrate de que 'rows' es un array
      const existingReservations = Array.isArray(rows) ? rows : [];
  
      if (existingReservations.length > 0) {
        return res.status(400).json({ error: 'You already have a reservation for this date.' });
      }
  
      // Inserta la nueva reserva
      const [result] = await pool.query<ResultSetHeader>(
        `INSERT INTO reservations (name, email, phone, date, time, people, user_id) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [name, email, phone, date, time, people, user_id]
      );
  
      // Verifica el resultado de la inserción
      console.log('Insert Result:', result);
  
      res.status(201).json({ id: result.insertId, name, email, phone, date, time, people, user_id });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Error creating reservation' });
    }
  };
  
export const getReservations = async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query('SELECT * FROM reservations');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching reservations' });
  }
};

export const getReservationById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
  
    try {
      // Realiza la consulta
      const [rows] = await pool.query<RowDataPacket[]>(
        'SELECT * FROM reservations WHERE id = ?',
        [id]
      );
  
      // Verifica si la consulta devolvió alguna fila
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Reservation not found' });
      }
  
      // Devuelve la primera fila encontrada
      const reservation = rows[0];
      res.status(200).json(reservation);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error retrieving reservation' });
    }
  };

  export const updateReservation = async (req: Request, res: Response) => {
    const { id } = req.params;
    const reservation: Reservation = req.body;
  
    try {
      const [result] = await pool.query<ResultSetHeader>(
        `UPDATE reservations
         SET name = ?, email = ?, phone = ?, date = ?, time = ?, people = ?, user_id = ?
         WHERE id = ?`,
        [reservation.name, reservation.email, reservation.phone, reservation.date, reservation.time, reservation.people, reservation.user_id, id]
      );
  
      if (result.affectedRows > 0) {
        res.json({ id, ...reservation });
      } else {
        res.status(404).json({ error: 'Reservation not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error updating reservation' });
    }
  };
  
  export const deleteReservation = async (req: Request, res: Response) => {
    const { id } = req.params;
  
    try {
      const [result] = await pool.query<ResultSetHeader>('DELETE FROM reservations WHERE id = ?', [id]);
      if (result.affectedRows > 0) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: 'Reservation not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error deleting reservation' });
    }
  };