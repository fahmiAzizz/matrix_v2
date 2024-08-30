import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import db from '../config/db';

// Extend Request interface to include user
declare module 'express-serve-static-core' {
    interface Request {
        user?: any;
    }
}

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Ambil token dari cookies
        const token = req.cookies.token;

        // Jika tidak ada token, kirim status 401 Unauthorized
        if (!token) {
            return res.status(401).json({ message: 'Access denied. No token provided.' });
        }

        // Verifikasi token
        jwt.verify(token, process.env.JWT_SECRET || '403836y48354348f', async (err: any, decoded: any) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid or expired token.' });
            }

            const payload = decoded as JwtPayload;

            // Cari user berdasarkan id yang ada dalam payload token
            const user = await db.User.findOne({
                where: { id: payload.userId, token },
                include: [{
                    model: db.Employee,
                    as: 'employee'
                }]
            });

            // Jika user tidak ditemukan atau token tidak cocok, kirim status 401 Unauthorized
            if (!user) {
                return res.status(401).json({ message: 'User not found or token does not match.' });
            }

            // Simpan informasi user ke dalam request untuk digunakan di route berikutnya
            req.user = {
                id: user.id,
                username: user.username,
                role: user.employee.role,
            };

            // Lanjutkan ke middleware atau route handler berikutnya
            next();
        });
    } catch (error) {
        const err = error as Error;
        return res.status(500).json({ message: 'An error occurred while verifying the token', error: err.message });
    }
};
