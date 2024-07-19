"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cors_1 = __importDefault(require("cors"));
const user_controller_1 = require("../controllers/user.controller");
const authorize_1 = require("../middleware/authorize");
const router = (0, express_1.Router)();
const corsOptions = {
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
};
// Rutas públicas
router.post('/login', (0, cors_1.default)(corsOptions), user_controller_1.loginUser);
router.post('/users', (0, cors_1.default)(corsOptions), user_controller_1.createUser);
// Rutas protegidas
router.get('/users', (0, cors_1.default)(corsOptions), authorize_1.authenticate, (0, authorize_1.authorize)(['admin']), user_controller_1.getAllUsers);
exports.default = router;
