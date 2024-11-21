import express from 'express';
import { createUser, deleteUser, getALLUsers, getUserById, modifierUser } from '../controllers/userController.js';


const router = express.Router()

router.get('/getusers', getALLUsers);
router.get('/getuser/:id', getUserById);
router.post('/getuser', createUser);
router.put('/updateUser/:id', modifierUser);
router.delete('/deleteUser/:id', deleteUser);

export default router;