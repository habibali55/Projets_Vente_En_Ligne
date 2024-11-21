import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const EditProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate(); // Initialisation du hook useNavigate
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
        telephone: '',
        avatar: ''
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:9000/users/getuser/${id}`);
                const { name, email, password, telephone, avatar } = response.data;
                setUserData({
                    name: name || '',
                    email: email || '',
                    password: password || '',
                    telephone: telephone || '',
                    avatar: avatar || '',
                });
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:9000/users/updateUser/${id}`, userData);
            navigate(-1); // Utilisation correcte de navigate
        } catch (error) {
            console.error('Error updating user data:', error);
        }
    };

    return (
        <div className="container-fluid d-flex align-items-center justify-content-center" style={{ height: "100vh" }}>
            <div className="row">
                <div className="col">
                    <Form onSubmit={handleSubmit} className="container mt-4 border rounded p-4" style={{ backgroundColor: '#87CEEB', maxWidth: '400px' }}>
                        <h2 className="text-center font-weight-bold mb-3">Modification in your Profile</h2>
                        <Form.Group controlId="name">
                            <div className="form-group">
                                <Form.Label className="font-weight-bold">Name:</Form.Label>
                                <Form.Control
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    value={userData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </Form.Group>

                        <Form.Group controlId="email">
                            <div className="form-group">
                                <Form.Label className="font-weight-bold">Email:</Form.Label>
                                <Form.Control
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    value={userData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </Form.Group>
                        <Form.Group controlId="password">
                            <div className="form-group">
                                <Form.Label className="font-weight-bold">Password:</Form.Label>
                                <Form.Control
                                    type="text"
                                    className="form-control"
                                    name="password"
                                    value={userData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </Form.Group>
                        <Form.Group controlId="telephone">
                            <div className="form-group">
                                <Form.Label className="font-weight-bold">Telephone:</Form.Label>
                                <Form.Control
                                    type="number"
                                    className="form-control"
                                    name="telephone"
                                    value={userData.telephone}
                                    onChange={handleChange}
                                />
                            </div>
                        </Form.Group>
                        <Form.Group controlId="avatar">
                            <div className="form-group">
                                <Form.Label className="font-weight-bold">Avatar:</Form.Label>
                                <Form.Control
                                    type="text"
                                    className="form-control"
                                    name="avatar"
                                    value={userData.avatar}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </Form.Group>
                        <div className="d-flex justify-content-center mt-3">
                            <Button variant="primary" type="submit">Save</Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;
