import { Request, Response } from 'express';
import db from '../config/db';

export const createRole = async (req: Request, res: Response) => {
    try {
        const role = await db.Role.create(req.body);
        res.status(201).json(role);
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ error: err.message });
    }
};

export const getAllRoles = async (req: Request, res: Response) => {
    try {
        const roles = await db.Role.findAll();
        res.status(200).json(roles);
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ error: err.message });
    }
};

export const getRoleById = async (req: Request, res: Response) => {
    try {
        const role = await db.Role.findByPk(req.params.id);
        if (!role) return res.status(404).json({ error: 'Role not found' });
        res.status(200).json(role);
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ error: err.message });
    }
};

export const updateRole = async (req: Request, res: Response) => {
    try {
        const role = await db.Role.findByPk(req.params.id);
        if (!role) return res.status(404).json({ error: 'Role not found' });

        await role.update(req.body);
        res.status(200).json(role);
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ error: err.message });
    }
};

export const deleteRole = async (req: Request, res: Response) => {
    try {
        const role = await db.Role.findByPk(req.params.id);
        if (!role) return res.status(404).json({ error: 'Role not found' });

        await role.destroy();
        res.status(204).json();
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ error: err.message });
    }
};
