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
exports.getTestimonials = exports.addTestimonial = void 0;
const db_1 = __importDefault(require("../db"));
const addTestimonial = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id, text } = req.body;
    try {
        yield db_1.default.query('INSERT INTO testimonials (user_id, text) VALUES (?, ?)', [user_id, text]);
        res.status(200).json({ message: 'Testimonial added successfully' });
    }
    catch (error) {
        console.error('Error adding testimonial:', error);
        res.status(500).json({ error: 'Failed to add testimonial' });
    }
});
exports.addTestimonial = addTestimonial;
const getTestimonials = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows] = yield db_1.default.query(`
      SELECT c.id, c.user_id, c.text, c.created_at, u.username AS author
      FROM testimonials c
      JOIN users u ON c.user_id = u.id
    `);
        res.json(rows);
    }
    catch (error) {
        console.error('Error fetching testimonials:', error);
        res.status(500).json({ error: 'Failed to fetch testimonials' });
    }
});
exports.getTestimonials = getTestimonials;
