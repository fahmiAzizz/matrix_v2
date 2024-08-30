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
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = __importDefault(require("../config/db"));
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: 'Access denied. No token provided.' });
        }
        jsonwebtoken_1.default.verify(token, process.env.JWT_KEY || '403836y48354348f', (err, decoded) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                return res.status(403).json({ message: 'Invalid or expired token.' });
            }
            const payload = decoded;
            const user = yield db_1.default.User.findOne({
                where: { id: payload.userId, token },
                include: [{
                        model: db_1.default.Employee,
                        as: 'employee'
                    }]
            });
            if (!user) {
                return res.status(401).json({ message: 'User not found or token does not match.' });
            }
            req.user = {
                id: user.id,
                username: user.username,
                role: user.employee.role,
            };
            next();
        }));
    }
    catch (error) {
        const err = error;
        return res.status(500).json({ message: 'An error occurred while verifying the token', error: err.message });
    }
});
exports.verifyToken = verifyToken;
