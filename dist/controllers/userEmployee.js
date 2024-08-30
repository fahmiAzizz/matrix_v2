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
exports.deleteUserAndEmployee = exports.updateUserAndEmployee = exports.createUserAndEmployee = void 0;
const db_1 = __importDefault(require("../config/db"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const createUserAndEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { first_name, last_name, nik, gender, role, phone_number, address, date_of_birth } = req.body;
    const transaction = yield db_1.default.sequelize.transaction();
    const username = nik;
    const password = first_name + nik.substring(0, 6);
    try {
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = yield db_1.default.User.create({
            username,
            password: hashedPassword,
        }, { transaction });
        const newEmployee = yield db_1.default.Employee.create({
            user_id: newUser.id,
            first_name,
            last_name,
            nik,
            gender,
            role,
            phone_number,
            address,
            date_of_birth,
        }, { transaction });
        yield transaction.commit();
        return res.status(201).json({
            message: 'User and Employee created successfully',
            user: newUser,
            employee: newEmployee,
        });
    }
    catch (error) {
        const err = error;
        yield transaction.rollback();
        return res.status(500).json({
            message: 'An error occurred while creating User and Employee',
            error: err.message,
        });
    }
});
exports.createUserAndEmployee = createUserAndEmployee;
const updateUserAndEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const { first_name, last_name, nik, gender, role, phone_number, address, date_of_birth } = req.body;
    const transaction = yield db_1.default.sequelize.transaction();
    try {
        const user = yield db_1.default.User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        yield db_1.default.Employee.update({
            first_name,
            last_name,
            nik,
            gender,
            role,
            phone_number,
            address,
            date_of_birth,
        }, {
            where: { user_id: userId },
            transaction,
        });
        yield transaction.commit();
        return res.status(200).json({ message: 'User and Employee updated successfully' });
    }
    catch (error) {
        const err = error;
        yield transaction.rollback();
        return res.status(500).json({
            message: 'An error occurred while updating User and Employee',
            error: err.message,
        });
    }
});
exports.updateUserAndEmployee = updateUserAndEmployee;
const deleteUserAndEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const transaction = yield db_1.default.sequelize.transaction();
    try {
        const user = yield db_1.default.User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        yield db_1.default.Employee.destroy({
            where: { user_id: userId },
            transaction,
        });
        yield db_1.default.User.destroy({
            where: { id: userId },
            transaction,
        });
        yield transaction.commit();
        return res.status(200).json({ message: 'User and Employee deleted successfully' });
    }
    catch (error) {
        const err = error;
        yield transaction.rollback();
        return res.status(500).json({
            message: 'An error occurred while deleting User and Employee',
            error: err.message,
        });
    }
});
exports.deleteUserAndEmployee = deleteUserAndEmployee;
