"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/db.ts
const promise_1 = __importDefault(require("mysql2/promise"));
// Configuración de la conexión
const pool = promise_1.default.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'restaurante'
});
pool.getConnection()
    .then(connection => {
    console.log('Database connected successfully');
    connection.release();
})
    .catch(err => {
    console.error('Database connection error:', err);
});
exports.default = pool;
