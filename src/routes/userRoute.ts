import { Router } from 'express';
import { createUser, getAllUsers, getUserById, updateUser, deleteUser } from '../controllers/userController';
import { verifyToken } from '../middleware/authMiddleware';
const router = Router();

router.post('/', createUser);
router.get('/', verifyToken, getAllUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
