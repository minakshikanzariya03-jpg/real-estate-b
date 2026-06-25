const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {

    const { email, password } = req.body;

    const result = await pool.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
    );

    if (result.rows.length === 0) {
        return res.status(401).json({
            success: false,
            message: 'Invalid Credentials'
        });
    }

    const user = result.rows[0];

    // Password check here

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