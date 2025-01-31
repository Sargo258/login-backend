"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const menu_routes_1 = __importDefault(require("./routes/menu.routes"));
const comments_routes_1 = __importDefault(require("./routes/comments.routes"));
const bookings_routes_1 = __importDefault(require("./routes/bookings.routes"));
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express_1.default.json());
// Rutas API
app.use('/api', user_routes_1.default);
app.use('/api', menu_routes_1.default);
app.use('/api', comments_routes_1.default);
app.use('/api', bookings_routes_1.default);
app.use('/api/reervtaions', bookings_routes_1.default);
app.use((req, res, next) => {
    console.log(`Received request for ${req.originalUrl}`);
    next();
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor backend corriendo en http://localhost:${port}`);
});
