const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const songRoutes = require('./routes/songs.js'); 

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/songs', songRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Songs API!');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
