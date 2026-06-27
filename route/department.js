const express = require('express');
const router = express.Router();
const jwt = require('../middleware/jwtauth');
const pool = require('../db');
const redisClient = require('../config/redis');

router.post('/addDepartment', jwt, async (req, res) => {
    
    const { department_name, department_code } = req.body;

    await pool.query(
        'INSERT INTO department (department_name, department_code) VALUES ($1,$2)',
        [department_name, department_code]
    );

    redisClient.del('departments');

    res.json({
        success: true,
        message: 'Department Added'
    });

});

router.get('/departments', async (req, res) => {

    const cacheKey = 'departments';

    redisClient.get(cacheKey, async (err, cache) => {

        if (cache) {
            console.log('✅ Data From Redis');
            return res.json(JSON.parse(cache));
        }

        console.log('🔥 Data From PostgreSQL');

        const result = await pool.query(
            'SELECT id, department_name, department_code FROM department'
        );

        redisClient.setex(
            cacheKey,
            60,
            JSON.stringify(result.rows)
        );

        res.json(result.rows);

    });

});

module.exports = router;