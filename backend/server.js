const express = require('express');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 8000;
const MONGO_URL = process.env.MONGO_URL
require("dotenv").config();



const app = express();


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

mongoose.connect(process.env.MONGO_URL, {
   
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});
