import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProfilDetaille = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:9000/users/getusers');
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);



  return (
    <div>
         <div className="container-fluid d-flex align-items-center justify-content-center " style={{ height: "100vh" }}>
        <div className="row">
           <div className="col">
      <h2 className="text-center font-weight-bold mb-5">your Profile</h2>
      <div className='text-center'>
          {userData && userData.map(user => (
            <div key={user._id} className="mb-5 bg-info" style={{ border: '5px solid #ccc', padding: '20px', borderRadius: '10px' }}>
              <p><strong>Nom complete:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Password:</strong> {user.password}</p>
              <p><strong>Télèphone:</strong> {user.telephone}</p>
              <p><strong>Avatar:</strong> {user.avatar}</p>
              <Link to={`/Profile/EditProfil/${user._id}`}><Button variant="warning" size='md'>Edit</Button></Link>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
    </div>
    
  );
};

export default ProfilDetaille;

