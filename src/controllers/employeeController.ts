import { Request, Response } from 'express';
import db from '../config/db';

export const createEmployee = async (req: Request, res: Response) => {
    try {
        const employee = await db.Employee.create(req.body);
        res.status(201).json(employee);
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ error: err.message });
    }
};

export const getAllEmployees = async (req: Request, res: Response) => {
    try {
        const employees = await db.Employee.findAll();
        res.status(200).json(employees);
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ error: err.message });
    }
};

export const getEmployeeById = async (req: Request, res: Response) => {
    try {
        const employee = await db.Employee.findByPk(req.params.id);
        if (!employee) return res.status(404).json({ error: 'Employee not found' });
        res.status(200).json(employee);
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ error: err.message });
    }
};

export const updateEmployee = async (req: Request, res: Response) => {
    try {
        const employee = await db.Employee.findByPk(req.params.id);
        if (!employee) return res.status(404).json({ error: 'Employee not found' });

        await employee.update(req.body);
        res.status(200).json(employee);
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ error: err.message });
    }
};

export const deleteEmployee = async (req: Request, res: Response) => {
    try {
        const employee = await db.Employee.findByPk(req.params.id);
        if (!employee) return res.status(404).json({ error: 'Employee not found' });

        await employee.destroy();
        res.status(204).json();
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ error: err.message });
    }
};
