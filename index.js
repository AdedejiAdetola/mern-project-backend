import dotenv from 'dotenv';
import mongoose from 'mongoose'; 
dotenv.config();

import express from 'express'; //const express = require(express)
import bodyParser from 'body-parser';
import cors from 'cors';



import postRoutes from './routes/posts.js';


const app = express() //initializing app

app.use(bodyParser.json({ limit: "30mb", extended: true })) //limit, as images will be passed to our app
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true })) //setting up bodyparser to send requests
app.use(cors());


app.use('/posts', postRoutes);

//connect to databse 
const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true }) //returns a promise
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((err) => console.log(err.message));

// mongoose.set('useFindAndModify', false);