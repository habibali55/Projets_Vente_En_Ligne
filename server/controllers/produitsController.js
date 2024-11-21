import Produit from '../models/produits.js';


export const getALLProduit = async (request, response) => {
    try {
        const produits = await Produit.find();
        response.status(200).json(produits);
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
}

export const getProduitById = async (req, res) => {
    try {
        const { id } = req.params
        const produits = await Produit.findById(id);
        if (!produits) {
            return res.status(404).json({ error: 'produits not found' });
        }
        res.status(200).json(produits);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const createProduit = async (req, res) => {
    try {
        const produits = new Produit(req.body);
        const savedPrestataire = await produits.save();
        res.status(201).json(savedPrestataire);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export const updateProduit = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedPrestataire = await Produit.findByIdAndUpdate(id, req.body);
        if (!updatedPrestataire) {
            return res.status(404).json({ error: 'Prestataire not found' });
        }
        res.status(200).json(updatedPrestataire);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const deleteProduit = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduit = await Produit.findByIdAndDelete(id);
        if (!deletedProduit) {
            return res.status(404).json({ error: 'Produit non trouvé' });
        }
        // Envoi d'une réponse après suppression réussie
        res.status(200).json({ message: 'Produit supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
