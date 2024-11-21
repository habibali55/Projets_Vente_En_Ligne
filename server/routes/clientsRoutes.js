import express from 'express';
import { createClient, deleteClient, getALLClient, getClientById } from '../controllers/clientsControllers.js';


const router = express.Router()

router.get('/getClient', getALLClient);
router.get('/getClient/:id', getClientById);
router.post('/addClient', createClient);
router.delete('/deleteClient/:id', deleteClient);

export default router;