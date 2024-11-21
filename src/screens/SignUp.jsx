import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import lunettes from '../assets/logo.jpg';
import 'aos/dist/aos.css';
import AOS from "aos";
import axios from 'axios';

function SignUp() {
  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    telephone: '',
  });

  const [errors, setErrors] = useState({});
  const [validated, setValidated] = useState(false);

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    setFormData({
      ...formData,
      [id]: files ? files[0] : value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      setValidated(true);
      try {
        const response = await axios.post('http://localhost:9000/signup', formData);
        localStorage.setItem('token', response.data.token);
        alert('Inscription réussie !');
        // Redirigez vers une autre page ou mettez à jour l'état de l'application
      } catch (error) {
        console.error(error);
        alert('Erreur lors de l’inscription');
      }
    } else {
      setValidated(false);
      setErrors(newErrors);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Nom complet est requis';
    if (!formData.email) newErrors.email = 'Email est requis';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email n\'est pas valide';
    if (!formData.password) newErrors.password = 'Mot de passe est requis';
    else if (formData.password.length < 6) newErrors.password = 'Mot de passe doit contenir au moins 6 caractères';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Confirmation de mot de passe est requise';
    else if (formData.confirmPassword !== formData.password) newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    if (!formData.telephone) newErrors.telephone = 'Numéro de téléphone est requis';
    return newErrors;
  };

  return (
    <Container className="my-5 gradient-form">
      <Row>
        <Col md={6} className="mb-5" style={{ 
          backgroundImage: `url(${lunettes})`,
          backgroundSize: 'cover',
          marginTop: '100px',
          maxWidth: "550px",
          minHeight: "600px",
        }} data-aos='fade-right'>
        </Col>
        
        <Col style={{ marginTop: '100px' }} data-aos='fade-left'>
          <div className="d-flex flex-column ms-5 me-5">
            <div className="text-center">
              <h4 className="mb-5 pb-1">Créer un compte</h4>
            </div>
            <Form noValidate validated={validated} onSubmit={handleSubmit} className='py-5 px-4'>
              <Row>
                <Col>
                  <Form.Group className="mb-4" controlId="name">
                    <Form.Label>Nom complet</Form.Label>
                    <Form.Control 
                      type="text" 
                      value={formData.name}
                      onChange={handleChange}
                      isInvalid={!!errors.name}
                      style={{ color: 'black' }} 
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.name}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>  
              </Row>
              <Form.Group className="mb-4" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control 
                  type="email" 
                  value={formData.email}
                  onChange={handleChange}
                  isInvalid={!!errors.email}
                  style={{ color: "black" }}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-4" controlId="telephone">
                <Form.Label>Téléphone</Form.Label>
                <Form.Control 
                  type="number" 
                  value={formData.telephone}
                  onChange={handleChange}
                  isInvalid={!!errors.telephone}
                  style={{ color: 'black' }}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.telephone}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-4" controlId="password">
                <Form.Label>Mot de passe</Form.Label>
                <Form.Control 
                  type="password" 
                  value={formData.password}
                  onChange={handleChange}
                  isInvalid={!!errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-4" controlId="confirmPassword">
                <Form.Label>Confirmer mot de passe</Form.Label>
                <Form.Control 
                  type="password" 
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  isInvalid={!!errors.confirmPassword}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.confirmPassword}
                </Form.Control.Feedback>
              </Form.Group>
              <div className="text-center pt-1 mb-5 pb-1">
                <Button className="mb-4 w-100" style={{ backgroundColor: '#737373', color: 'white' }} type="submit">Enregistrer</Button>
              </div>
            </Form>
            {validated && (
              <Alert variant="success">
                Inscription réussie!
              </Alert>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default SignUp;
