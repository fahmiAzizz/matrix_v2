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
exports.logout = exports.login = void 0;
const db_1 = __importDefault(require("../config/db")); // Pastikan db telah diatur dengan benar
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const user = yield db_1.default.User.findOne({
            where: { username },
            include: [{
                    model: db_1.default.Employee,
                    as: 'employee'
                }]
        });
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        if (!user.employee || user.employee.role !== 'Admin') {
            return res.status(403).json({ message: 'Access denied. Admins only.' });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id, role: user.employee.role }, process.env.JWT_SECRET || '403836y48354348f', { expiresIn: '1h' });
        yield user.update({ token });
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        return res.status(200).json({ token });
    }
    catch (error) {
        const err = error;
        return res.status(500).json({ message: 'An error occurred during login', error: err.message });
    }
});
exports.login = login;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.token;
        if (!token)
            return res.sendStatus(204);
        const user = yield db_1.default.User.findOne({
            where: {
                token: token
            }
        });
        if (!user)
            return res.sendStatus(204);
        const UserId = user.id;
        yield db_1.default.User.update({ token: null }, {
            where: {
                id: UserId
            }
        });
        return res.status(200).json({ message: 'Logout successful' });
    }
    catch (error) {
        const err = error;
        return res.status(500).json({ message: 'An error occurred during logout', error: err.message });
    }
});
exports.logout = logout;
