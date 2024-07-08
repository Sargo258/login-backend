"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cors_1 = __importDefault(require("cors"));
const user_controller_1 = require("../controllers/user.controller");
const router = (0, express_1.Router)();
const corsOptions = {
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
};
router.get('/users', (0, cors_1.default)(corsOptions), user_controller_1.getAllUsers);
router.post('/users', (0, cors_1.default)(corsOptions), user_controller_1.createUser);
router.post('/login', (0, cors_1.default)(corsOptions), user_controller_1.loginUser);
exports.default = router;
