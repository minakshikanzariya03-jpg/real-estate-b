require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Home route
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Real Estate Backend is Running 🚀'
    });
});

// Import routes
const departmentRoutes = require('./route/department');
const authRoutes = require('./route/auth'); // Change to your auth route file

// Use routes
app.use('/api', departmentRoutes);
app.use('/api', authRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});