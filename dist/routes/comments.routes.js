"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const comments_controller_1 = require("../controllers/comments.controller");
const router = (0, express_1.Router)();
router.post('/comments', comments_controller_1.addTestimonial);
router.get('/comments', comments_controller_1.getTestimonials);
router.delete('/comments/:id', comments_controller_1.deleteTestimonial);
exports.default = router;
