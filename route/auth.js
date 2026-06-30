const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const pool = require('../db');

router.post('/login', async (req, res) => {
    console.log('minaki',req.body)
    const { email, password } = req.body;

    const result = await pool.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
    );
        console.log('result',result)

    if (result.rows.length === 0) {
        return res.status(401).json({
            success: false,
            message: 'Invalid Credentials'
        });
    }   

    const user = result.rows[0];

    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '1h'
        }
    );

    res.json({
        success: true,
        token
    });
});

module.exports = router;