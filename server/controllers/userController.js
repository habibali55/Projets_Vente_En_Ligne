import User from '../models/user.js';


export const getALLUsers = async (request, response) => {
    try {
        const users = await User.find();
        response.status(200).json(users);
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
}

export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
          return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }
        res.json(user);
      } catch (error) {
        console.error('Erreur lors de la récupération de l\'utilisateur :', error);
        res.status(500).json({ error: 'Erreur serveur lors de la récupération de l\'utilisateur' });
      }
    
}
export const modifierUser = async (req, res) => {
    const { id } = req.params;
    const {name, email, password,  telephone, avatar } = req.body;
  
    try {
      const updatedUser = await User.findByIdAndUpdate(id, {
        name,
        email,
        password,
        telephone,
        avatar,
      }, { new: true });
  
      if (!updatedUser) {
        return res.status(404).json({ error: 'Utilisateur non trouvé' });
      }
  
      res.json(updatedUser);
    } catch (error) {
      console.error('Erreur lors de la modification de l\'utilisateur :', error);
      res.status(500).json({ message: 'Erreur serveur lors de la modification de l\'utilisateur' });
    }
  };
  
  
export const createUser = async (req, res) => {
    try {
        // Récupérer les données de la requête
        const { password, ...otherDetails } = req.body;

        // Hacher le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Créer un nouvel utilisateur avec le mot de passe haché
        const user = new User({ ...otherDetails, password: hashedPassword });

        // Sauvegarder l'utilisateur dans la base de données
        const savedUser = await user.save();

        // Répondre avec l'utilisateur sauvegardé
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {

            return res.status(404).json({ error: 'user not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
