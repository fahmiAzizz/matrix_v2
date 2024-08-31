import { Router } from 'express';
import { createEmployee, getAllEmployees, getEmployeeById, updateEmployee, deleteEmployee } from '../controllers/employeeController';
import { createUserAndEmployee, deleteUserAndEmployee, updateUserAndEmployee } from '../controllers/userEmployee';
import { verifyToken } from '../middleware/authMiddleware';


const router = Router();

router.post('/', createEmployee);
router.post('/userEmployee', createUserAndEmployee);
router.patch('/userEmployee/:id', updateUserAndEmployee);
router.delete('/userEmployee/:id', deleteUserAndEmployee);
router.get('/', getAllEmployees);
router.get('/:id', getEmployeeById);
router.patch('/:id', updateEmployee);
router.delete('/:id', deleteEmployee);

export default router;
