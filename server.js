import express from 'express'
import bcrypt from 'bcrypt-nodejs'
import cors from 'cors';
import knex from 'knex';
import { handleRegister } from './controllers/register.js';
import { handleSignin } from './controllers/signin.js';
import { handleProfileGet } from './controllers/profile.js';
import { handleClarifai } from './controllers/clarifai.js';
import { handleImage } from './controllers/image.js';



const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        port: 5432,
        user: 'postgres',
        password: 'postgres',
        database: 'smart-brain',
    },
});
const app = express();

// app.use(express.urlencoded({ extended: false }));
//body parser to json
app.use(cors());
app.use(express.json());

// Homepage
app.get('/', (req, res) => {
    res.send('success');
});

// Signin - POST - Logging in user
app.post('/signin', handleSignin(db, bcrypt));

// Register - POST - adding user
app.post('/register', handleRegister(db, bcrypt))

//Profile/id - GET - show users info if it matches the params
//This isnt going to be useful going to home, because once we sign in we have our user info
//this will be useful to grab the profile, and perhaps update our name and email in the future.
app.get('/profile/:id', handleProfileGet(db))


// Image - Put - increment entries
app.put('/image', handleImage(db))

//Clarifai - API for image detection
app.post('/clarifai', handleClarifai)

//Port Listener
app.listen(3000, () => {
    console.log('app is running on port 3000')
})

/* 
/ --> res This is working
/signin -->  POST = success / fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT - user, counter. 


*/