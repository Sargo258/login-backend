import { Request, Response } from 'express';
import pool from '../db';

export const addTestimonial = async (req: Request, res: Response) => {
  const { user_id, text } = req.body;

  try {
    await pool.query('INSERT INTO testimonials (user_id, text) VALUES (?, ?)', [user_id, text]);
    res.status(200).json({ message: 'Testimonial added successfully' });
  } catch (error) {
    console.error('Error adding testimonial:', error);
    res.status(500).json({ error: 'Failed to add testimonial' });
  }
};

export const getTestimonials = async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query(`
      SELECT c.id, c.user_id, c.text, c.created_at, u.username AS author
      FROM testimonials c
      JOIN users u ON c.user_id = u.id
    `);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    res.status(500).json({ error: 'Failed to fetch testimonials' });
  }

};

export const deleteTestimonial = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    // Ejecuta la consulta DELETE
    const [result] = await pool.query('DELETE FROM testimonials WHERE id = ?', [id]);

    // Accede a `affectedRows` desde `result`
    const affectedRows = (result as any).affectedRows;

    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }

    res.status(200).json({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    res.status(500).json({ error: 'Failed to delete testimonial' });
  }
};