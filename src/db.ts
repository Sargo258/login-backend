// src/db.ts
import mysql from 'mysql2/promise';

// Configuración de la conexión
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'restaurante'
});

export default pool;
