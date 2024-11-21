import Paiment from '../models/paiementenligne.js';
import { envoyerEmail } from '../emailService.js'; 

export const getALLPaiement = async (request, response) => {
    try {
        const paiements = await Paiment.find();
        response.status(200).json(paiements);
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
}

export const getPaiementById = async (req, res) => {
    try {
        const { id } = req.params
        const paiement = await Paiment.findById(id);
        if (!paiement) {
            return res.status(404).json({ error: 'paiement not found' });
        }
        res.status(200).json(paiement);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}



export const createPaiement = async (req, res) => {
  try {
    const paiement = new Paiment(req.body);
    const savedPaiement = await paiement.save();

    // Préparer l'email pour le client
    const emailClient = {
      from: 'youremail@gmail.com',
      to: savedPaiement.email, // Email du client (présent dans req.body.email)
      subject: 'Confirmation de votre paiement',
      text: `Bonjour ${savedPaiement.name},\n\nNous avons bien reçu votre paiement de ${savedPaiement.montant} DT.\nMerci pour votre confiance.\n\nCordialement,\nVotre équipe.`,
    };

    // Préparer l'email pour l'admin
    const emailAdmin = {
      from: 'youremail@gmail.com',
      to: 'elhabibali82@gmail.com', // Email de l'administrateur
      subject: 'Nouvelle transaction de paiement',
      text: `Une nouvelle transaction a été effectuée :\n\nNom du client : ${savedPaiement.name}\nEmail : ${savedPaiement.email}\nMontant : ${savedPaiement.montant} DT\n\nConsultez le panneau d'administration pour plus de détails.`,
    };

    // Envoyer les emails
    await envoyerEmail(emailClient);
    await envoyerEmail(emailAdmin);

    res.status(201).json(savedPaiement); // Répondre au client avec le paiement enregistré
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const deletePaiement = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedPaiement = await Paiment.findByIdAndDelete(id);
        if (!deletedPaiement) {

            return res.status(404).json({ error: 'paiement not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
