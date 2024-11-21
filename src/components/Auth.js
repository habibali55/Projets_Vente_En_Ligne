import axios from 'axios';

const auth = async (email, password) => {
    try {
        const response = await axios.post('http://localhost:9000/login', { email, password });
        const { token } = response.data;

        // Stocker le token JWT dans le localStorage
        localStorage.setItem('token', token);


        // Optionnel : rediriger l'utilisateur vers une page protégée
        window.location.href = '/';
    } catch (error) {
        console.error('Login failed:', error.response.data.message);
        alert('Login failed. Please check your credentials.');
    }
};

export default auth;



