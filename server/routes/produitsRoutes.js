import express from 'express';
import {  createProduit, deleteProduit, getALLProduit, getProduitById, updateProduit } from '../controllers/produitsController.js';




const router = express.Router()

router.get('/getProduit', getALLProduit);
router.get('/getProduit/:id', getProduitById);
router.post('/addProduit', createProduit);
router.put('/EditProduit/:id', updateProduit);
router.delete('/deleteProduit/:id', deleteProduit);

export default router;