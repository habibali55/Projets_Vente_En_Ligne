import express from 'express';
import dotenv from 'dotenv';
import './models/index.js'
import userRoutes from './routes/userRoutes.js';
import paiementRoutes from './routes/paiementRoutes.js';
import clientRoutes from './routes/clientsRoutes.js';
import produitsRoutes from './routes/produitsRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import cors from "cors"
import generateToken from './jwtUtils.js';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from './models/user.js';

const app = express();
app.use(cors())


dotenv.config();
const PORT = process.env.PORT || 7000;
// / Middleware for JWT Token Validation
export const validateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1]; // Bearer <token>

        jwt.verify(token, 'parLunette', (err, payload) => {
            if (err) {
                return res.status(403).json({
                    success: false,
                    message: 'Invalid token',
                });
            } else {
                req.user = payload;
                next();
            }
        });
    } else {
        res.status(401).json({
            success: false,
            message: 'Token is not provided',
        });
    }
};
app.use(bodyParser.json());
app.use(express.json());


app.post('/signup', async (req, res) => {
    const { name, email, password, telephone, role } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'Email is already taken',
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            name,
            email,
            password: hashedPassword,
            telephone,
            role, // Rôle attribué
        });

        await user.save();
        const token = generateToken(user);

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
});

// Login Route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Rechercher l'utilisateur par email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password',
            });
        }

        // Comparer le mot de passe
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            // Générer le token JWT
            const token = generateToken(user);

            res.json({
                success: true,
                message: 'Authentification successful!',
                token: token,
            });
        } else {
            res.status(401).json({
                success: false,
                message: 'Invalid email or password',
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
});

app.put('/updateme/:id', validateToken, async(req, res)=> {
   const {id}= req.params
   const userData = req.body;
   try {
    const user = await User.findById(id)
    if(!user){
      return  res.status(404).json({
            message:'user not fond',
        })
    }
   const {password,...updatedata}= userData
   if(updatedata.email){
    const existeUser = await User.findOne({email:updatedata.email,id:{$ne:id}})
    if(existeUser){
        return res.status(400).json({
            message:'email is alredy taken'
        })
    }
   } 

 await User.findByIdAndUpdate(id, updatedata,{new:true})
if(password){
    const hashedPassword= await bcrypt.hash(password,10)
    await User.findByIdAndUpdate(id,{password:hashedPassword })

}
const updatedUser = await User.findById(id)
const token = generateToken(updatedUser)
res.json({
    message:'profile updated',
    token:token
})

   } catch (error) {
    console.log(error)
    res.status(500).json({
        message:'server error'
    })
   }
})


// Protected Route
app.get('/me', validateToken, (req, res) => {
    res.json({
        success: true,
        message: 'Welcome to the protected route!',
        user: req.user,
    });
});


app.use('/users', userRoutes);
app.use('/paiement', paiementRoutes);
app.use('/client', clientRoutes);
app.use('/produits', produitsRoutes);
app.use('/admin', adminRoutes);


app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})