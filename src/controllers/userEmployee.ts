import { Request, Response } from 'express';
import db from '../config/db';
import bcrypt from 'bcrypt';


export const createUserAndEmployee = async (req: Request, res: Response) => {
    const { first_name, last_name, nik, gender, role, phone_number, address, date_of_birth } = req.body;

    const transaction = await db.sequelize.transaction();
    const username = nik;
    const password = first_name + nik.substring(0, 6);

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await db.User.create({
            username,
            password: hashedPassword,
        }, { transaction });

        const newEmployee = await db.Employee.create({
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

        await transaction.commit();

        return res.status(201).json({
            message: 'User and Employee created successfully',
            user: newUser,
            employee: newEmployee,
        });
    } catch (error) {
        const err = error as Error;
        await transaction.rollback();

        return res.status(500).json({
            message: 'An error occurred while creating User and Employee',
            error: err.message,
        });
    }
}

export const updateUserAndEmployee = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { first_name, last_name, nik, gender, role, phone_number, address, date_of_birth } = req.body;

    const transaction = await db.sequelize.transaction();

    try {
        const user = await db.User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        await db.Employee.update({
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

        await transaction.commit();

        return res.status(200).json({ message: 'User and Employee updated successfully' });
    } catch (error) {
        const err = error as Error;
        await transaction.rollback();

        return res.status(500).json({
            message: 'An error occurred while updating User and Employee',
            error: err.message,
        });
    }
};

export const deleteUserAndEmployee = async (req: Request, res: Response) => {
    const { userId } = req.params;

    const transaction = await db.sequelize.transaction();

    try {
        const user = await db.User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await db.Employee.destroy({
            where: { user_id: userId },
            transaction,
        });

        await db.User.destroy({
            where: { id: userId },
            transaction,
        });

        await transaction.commit();

        return res.status(200).json({ message: 'User and Employee deleted successfully' });
    } catch (error) {
        const err = error as Error;
        await transaction.rollback();

        return res.status(500).json({
            message: 'An error occurred while deleting User and Employee',
            error: err.message,
        });
    }
};

