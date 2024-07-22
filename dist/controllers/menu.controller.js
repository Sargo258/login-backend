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
exports.deleteMenuItem = exports.updateMenuItem = exports.getAllMenuItems = exports.createMenuItem = void 0;
const db_1 = __importDefault(require("../db"));
// Crear un nuevo elemento de menú
const createMenuItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, image_url, description, price } = req.body;
    try {
        const [result] = yield db_1.default.query('INSERT INTO menu (name, image_url, description, price) VALUES (?, ?, ?, ?)', [name, image_url, description, price]);
        // Obtén el insertId desde result, que es de tipo ResultSetHeader
        const insertId = result.insertId;
        res.status(201).json({ id: insertId, name, image_url, description, price });
    }
    catch (error) {
        console.error('Error al crear el menú:', error);
        res.status(500).json({ error: 'Failed to create menu item' });
    }
});
exports.createMenuItem = createMenuItem;
// Obtener todos los elementos del menú
const getAllMenuItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isAdmin = req.query.isAdmin === 'true';
        const query = isAdmin ? 'SELECT * FROM menu' : 'SELECT * FROM menu WHERE is_visible = TRUE';
        const [rows] = yield db_1.default.execute(query);
        res.json(rows);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch menu items' });
    }
});
exports.getAllMenuItems = getAllMenuItems;
// Actualizar un elemento del menú
const updateMenuItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        yield db_1.default.execute(query, params);
        res.json({ id, name, image_url, description, price, is_visible });
    }
    catch (error) {
        console.error('Failed to update menu item:', error);
        res.status(500).json({ error: 'Failed to update menu item' });
    }
});
exports.updateMenuItem = updateMenuItem;
// Eliminar un elemento del menú
const deleteMenuItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield db_1.default.execute('DELETE FROM menu WHERE id = ?', [id]);
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete menu item' });
    }
});
exports.deleteMenuItem = deleteMenuItem;
