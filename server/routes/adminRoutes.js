import express from 'express';
import { createAdmin, deleteAdmin, getAdminById, getALLAdmin } from '../controllers/adminControllers.js';


const router = express.Router()

router.get('/getAdmins', getALLAdmin);
router.get('/getAdmin/:id', getAdminById);
router.post('/addAdmin', createAdmin);
router.delete('/deleteAdmins/:id', deleteAdmin);

export default router;