import { Router } from 'express';
import { createEmployee, getAllEmployees, getEmployeeById, updateEmployee, deleteEmployee } from '../controllers/employeeController';
import { createUserAndEmployee, deleteUserAndEmployee, updateUserAndEmployee } from '../controllers/userEmployee';
import { verifyToken } from '../middleware/authMiddleware';


const router = Router();

router.post('/', createEmployee);
router.post('/userEmployee', verifyToken, createUserAndEmployee);
router.patch('/userEmployee/:id', verifyToken, updateUserAndEmployee);
router.delete('/userEmployee/:id', verifyToken, deleteUserAndEmployee);
router.get('/', getAllEmployees);
router.get('/:id', getEmployeeById);
router.put('/:id', updateEmployee);
router.delete('/:id', deleteEmployee);

export default router;
