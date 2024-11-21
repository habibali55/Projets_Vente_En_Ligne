import nodemailer from 'nodemailer';

// Configurer le transporteur
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'elhabibali82@gmail.com', // Votre adresse Gmail
    pass: 'xyrf zgda vlkq fvjc', // Mot de passe d'application
  },
});

// Fonction pour envoyer un email
export const envoyerEmail = async (options) => {
  try {
    await transporter.sendMail(options);
    console.log('Email envoyé avec succès');
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email :', error);
  }
};
