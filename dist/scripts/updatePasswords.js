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
// /src/scripts/updatePasswords.ts
const db_1 = __importDefault(require("../db"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const updatePasswords = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows] = yield db_1.default.query('SELECT * FROM users');
        for (const user of rows) {
            if (!user.password.startsWith('$2b$')) { // Verifica si el hash ya está en formato bcrypt
                const hashedPassword = yield bcrypt_1.default.hash(user.password, 10);
                yield db_1.default.query('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, user.id]);
                console.log(`Password updated for user ID ${user.id}`);
            }
        }
        console.log('Passwords updated successfully');
    }
    catch (error) {
        console.error('Error updating passwords:', error);
    }
});
updatePasswords();
