import express from 'express';
import { createPaiement, deletePaiement, getALLPaiement, getPaiementById } from '../controllers/paiementController.js';


const router = express.Router()

router.get('/getPaiement', getALLPaiement);
router.get('/getPaiement/:id', getPaiementById);
router.post('/addPaiement', createPaiement);
router.delete('/deletePaiement/:id', deletePaiement);

export default router;