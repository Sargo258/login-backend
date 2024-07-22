import { Request, Response } from 'express';
import pool from '../db';

// Crear un nuevo elemento de menú
export const createMenuItem = async (req: Request, res: Response) => {
  const { name, image_url, description, price } = req.body;

  try {
    const [result] = await pool.query('INSERT INTO menu (name, image_url, description, price) VALUES (?, ?, ?, ?)', [name, image_url, description, price]);

    // Obtén el insertId desde result, que es de tipo ResultSetHeader
    const insertId = (result as any).insertId;

    res.status(201).json({ id: insertId, name, image_url, description, price });
  } catch (error) {
    console.error('Error al crear el menú:', error);
    res.status(500).json({ error: 'Failed to create menu item' });
  }
};

// Obtener todos los elementos del menú
export const getAllMenuItems = async (req: Request, res: Response) => {
  try {
    const isAdmin = req.query.isAdmin === 'true';
    const query = isAdmin ? 'SELECT * FROM menu' : 'SELECT * FROM menu WHERE is_visible = TRUE';
    const [rows] = await pool.execute(query);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch menu items' });
  }
};

// Actualizar un elemento del menú
export const updateMenuItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, image_url, description, price, is_visible } = req.body;
   
    let query = 'UPDATE menu SET name = ?, description = ?, price = ?, is_visible = ? WHERE id = ?';
    let params = [name, description, price, is_visible, id];

    // Only include imageUrl in the query if it's provided
    if (image_url !== undefined) {
      query = 'UPDATE menu SET name = ?, image_url = ?, description = ?, price = ?, is_visible = ? WHERE id = ?';
      params = [name, image_url, description, price, is_visible, id];
    }

    await pool.execute(query, params);

    res.json({ id, name, image_url, description, price, is_visible });
  } catch (error) {
    console.error('Failed to update menu item:', error);
    res.status(500).json({ error: 'Failed to update menu item' });
  }
};
// Eliminar un elemento del menú
export const deleteMenuItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await pool.execute('DELETE FROM menu WHERE id = ?', [id]);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete menu item' });
  }
};
