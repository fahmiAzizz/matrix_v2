import { Request, Response } from 'express';
import db from '../config/db'; // Pastikan db telah diatur dengan benar
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { where } from 'sequelize';

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        const user = await db.User.findOne({
            where: { username },
            include: [{
                model: db.Employee,
                as: 'employee'
            }]
        });

        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        if (!user.employee || user.employee.role !== 'Admin') {
            return res.status(403).json({ message: 'Access denied. Admins only.' });
        }

        const token = jwt.sign(
            { userId: user.id, role: user.employee.role },
            process.env.JWT_SECRET || '403836y48354348f',
            { expiresIn: '1h' }
        );

        await user.update({ token });

        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });

        return res.status(200).json({ token });
    } catch (error) {
        const err = error as Error;
        return res.status(500).json({ message: 'An error occurred during login', error: err.message });
    }
};


export const logout = async (req: Request, res: Response) => {
    try {
        const token = req.cookies.token;
        if (!token) return res.sendStatus(204);
        const user = await db.User.findOne({
            where: {
                token: token
            }
        })
        if (!user) return res.sendStatus(204);
        const UserId = user.id;
        await db.User.update({ token: null }, {
            where: {
                id: UserId
            }
        })
        return res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        const err = error as Error;
        return res.status(500).json({ message: 'An error occurred during logout', error: err.message });
    }
};
