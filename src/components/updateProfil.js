import axios from "axios"


export const updateProfil = async (body, id) => {
  try {
    const token = localStorage.getItem('token');
    const res = await axios.put(`http://localhost:9000/updateme/${id}`, body, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });

    // Mettez à jour le token dans le localStorage
    localStorage.setItem('token', res.data.token);
    
    // Retourner les données de l'utilisateur mises à jour après la réponse
    return res.data; 
  } catch (error) {
    console.log(error);
    throw new Error('Failed to update profile');
  }
};

