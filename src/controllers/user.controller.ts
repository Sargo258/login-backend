import { Request, Response } from 'express';
import db from '../db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'your_jwt_secret'; // Deberías almacenar esto en un archivo de configuración o variable de entorno

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const [rows]: any = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    const user = rows[0];
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }
    

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
    console.log('Token generated:', token);

    res.json({
      message: 'Login successful',
      user: { id: user.id, username: user.username, email: user.email, role: user.role },
      token
    });

  } catch (error) {
    console.error('Error logging in', error);
    res.status(500).json({ message: 'Error logging in' });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const [rows] = await db.query('SELECT * FROM users');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching users', error);
    res.status(500).json({ message: 'Error fetching users' });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { username, email, password, role } = req.body;
  console.log('Request Body:', req.body);
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query('INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)', [username, email, hashedPassword, role || 'user']);
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user', error);
    res.status(500).json({ message: 'Error creating user' });
  }
};
