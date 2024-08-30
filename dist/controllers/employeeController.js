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
exports.deleteEmployee = exports.updateEmployee = exports.getEmployeeById = exports.getAllEmployees = exports.createEmployee = void 0;
const db_1 = __importDefault(require("../config/db"));
const createEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employee = yield db_1.default.Employee.create(req.body);
        res.status(201).json(employee);
    }
    catch (error) {
        const err = error;
        res.status(500).json({ error: err.message });
    }
});
exports.createEmployee = createEmployee;
const getAllEmployees = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employees = yield db_1.default.Employee.findAll();
        res.status(200).json(employees);
    }
    catch (error) {
        const err = error;
        res.status(500).json({ error: err.message });
    }
});
exports.getAllEmployees = getAllEmployees;
const getEmployeeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employee = yield db_1.default.Employee.findByPk(req.params.id);
        if (!employee)
            return res.status(404).json({ error: 'Employee not found' });
        res.status(200).json(employee);
    }
    catch (error) {
        const err = error;
        res.status(500).json({ error: err.message });
    }
});
exports.getEmployeeById = getEmployeeById;
const updateEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employee = yield db_1.default.Employee.findByPk(req.params.id);
        if (!employee)
            return res.status(404).json({ error: 'Employee not found' });
        yield employee.update(req.body);
        res.status(200).json(employee);
    }
    catch (error) {
        const err = error;
        res.status(500).json({ error: err.message });
    }
});
exports.updateEmployee = updateEmployee;
const deleteEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employee = yield db_1.default.Employee.findByPk(req.params.id);
        if (!employee)
            return res.status(404).json({ error: 'Employee not found' });
        yield employee.destroy();
        res.status(204).json();
    }
    catch (error) {
        const err = error;
        res.status(500).json({ error: err.message });
    }
});
exports.deleteEmployee = deleteEmployee;
