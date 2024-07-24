"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const menu_controller_1 = require("../controllers/menu.controller");
const router = (0, express_1.Router)();
router.post('/menu', menu_controller_1.createMenuItem);
router.get('/menu', menu_controller_1.getAllMenuItems);
router.put('/menu/:id', menu_controller_1.updateMenuItem);
router.delete('/menu/:id', menu_controller_1.deleteMenuItem);
// Rutas adicionales para calificaciones y platos destacados
router.post('/menu/rate', menu_controller_1.rateMenuItem);
router.get('/menu/featured', menu_controller_1.getFeaturedMenuItems);
exports.default = router;
