const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;
const DB_CONNECTION = process.env.DB_CONNECTION;


mongoose.connect(DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
}).then(() => {
  console.log('Connected to DB');
}).catch(err => {
  console.error('Failed to connect to DB', err);
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);


const orderRoutes = require('./routes/order');
app.use('/api', orderRoutes);
