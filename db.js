// const { Pool } = require('pg');

// const pool = new Pool({
//     host: '192.168.0.99',
//     port: 5432,
//     user: 'postgres',
//     password: 'redhat6',
//     database: '23_jun_2026_demo'
// });

// pool.connect()
//     .then(() => console.log('PostgreSQL Connected'))
//     .catch(err => console.error('Database Error:', err));

// module.exports = pool;
require('dotenv').config();

const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

pool.connect()
  .then(() => console.log("Neon PostgreSQL Connected"))
  .catch(err => console.error("Database Error:", err));

module.exports = pool;