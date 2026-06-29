const express = require('express');
const router = express.Router();
const jwt = require('../middleware/jwtauth');
const pool = require('../db');
// const redisClient = require('../config/redis');

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
  try {
    const result = await pool.query(`
      SELECT id, department_name, department_code
      FROM department
      ORDER BY department_name ASC
    `);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching departments:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch departments',
      error: error.message
    });
  }
});



module.exports = router;