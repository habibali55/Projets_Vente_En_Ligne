import jwt from 'jsonwebtoken';

const generateToken = (user) => {
    const secretKey = 'parLunette'; 
    const options = {
      expiresIn: '1h',
    };
  
    const token = jwt.sign({user}, secretKey, options);
    return token;
  };
  
  export default generateToken
