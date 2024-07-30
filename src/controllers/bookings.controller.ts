// controllers/reservation.controller.ts
import { Request, Response } from 'express';
import  pool  from '../db';
import { Reservation } from '../models/bookings.model';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

export const createReservation = async (req: Request, res: Response) => {
  const { name, email, phone, date, time, people, user_id } = req.body;
  console.log('Received data:', { name, email, phone, date, time, people, user_id });

  try {
      // Verifica si hay alguna reserva activa para la misma fecha y hora
      const [conflictingReservations] = await pool.query(
          `SELECT * FROM reservations WHERE date = ? AND time = ? AND is_deleted = 0`,
          [date, time]
      );

      // Asegúrate de que 'conflictingReservations' es un array
      const conflicting = Array.isArray(conflictingReservations) ? conflictingReservations : [];

      if (conflicting.length > 0) {
          return res.status(400).json({ error: 'A reservation already exists for this date and time.' });
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
      const [rows] = await pool.query('SELECT * FROM reservations WHERE is_deleted = NULL');
  
      // Devolvemos las reservas que no están "borradas"
      res.json(rows);
    } catch (error) {
      console.error('Error fetching reservations:', error);
      res.status(500).json({ message: 'Error fetching reservations' });
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

  export const getReservationsByUserId = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId, 10);
  
    if (isNaN(userId)) {
      return res.status(400).json({ error: 'Invalid userId' });
    }
  
    try {
      // Consulta SQL ajustada para excluir las reservas marcadas como eliminadas
      const [rows] = await pool.query<RowDataPacket[]>(
        'SELECT * FROM reservations WHERE user_id = ? AND is_deleted = FALSE',
        [userId]
      );
  
      res.json(rows);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Error fetching reservations' });
    }
  };

  export const softDeleteReservation = async (req: Request, res: Response) => {
    const reservationId = parseInt(req.params.id, 10);
  
    if (isNaN(reservationId)) {
      return res.status(400).json({ error: 'Invalid reservation ID' });
    }
  
    try {
      // Marca la reserva como eliminada
      const [result] = await pool.query(
        'UPDATE reservations SET is_deleted = 1 WHERE id = ?',
        [reservationId]
      );
  
      const affectedRows = (result as any).affectedRows;
  
      if (affectedRows > 0) {
        res.status(200).json({ message: 'Reservation soft-deleted successfully' });
      } else {
        res.status(404).json({ error: 'Reservation not found' });
      }
    } catch (error) {
      console.error('Error soft-deleting reservation:', error);
      res.status(500).json({ error: 'Error soft-deleting reservation' });
    }
  };