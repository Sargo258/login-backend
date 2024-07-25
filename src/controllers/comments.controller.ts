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
