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
exports.deleteRole = exports.updateRole = exports.getRoleById = exports.getAllRoles = exports.createRole = void 0;
const db_1 = __importDefault(require("../config/db"));
const createRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const role = yield db_1.default.Role.create(req.body);
        res.status(201).json(role);
    }
    catch (error) {
        const err = error;
        res.status(500).json({ error: err.message });
    }
});
exports.createRole = createRole;
const getAllRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roles = yield db_1.default.Role.findAll();
        res.status(200).json(roles);
    }
    catch (error) {
        const err = error;
        res.status(500).json({ error: err.message });
    }
});
exports.getAllRoles = getAllRoles;
const getRoleById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const role = yield db_1.default.Role.findByPk(req.params.id);
        if (!role)
            return res.status(404).json({ error: 'Role not found' });
        res.status(200).json(role);
    }
    catch (error) {
        const err = error;
        res.status(500).json({ error: err.message });
    }
});
exports.getRoleById = getRoleById;
const updateRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const role = yield db_1.default.Role.findByPk(req.params.id);
        if (!role)
            return res.status(404).json({ error: 'Role not found' });
        yield role.update(req.body);
        res.status(200).json(role);
    }
    catch (error) {
        const err = error;
        res.status(500).json({ error: err.message });
    }
});
exports.updateRole = updateRole;
const deleteRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const role = yield db_1.default.Role.findByPk(req.params.id);
        if (!role)
            return res.status(404).json({ error: 'Role not found' });
        yield role.destroy();
        res.status(204).json();
    }
    catch (error) {
        const err = error;
        res.status(500).json({ error: err.message });
    }
});
exports.deleteRole = deleteRole;
