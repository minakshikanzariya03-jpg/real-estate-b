const redis = require('redis');

const redisClient = redis.createClient(
    6379,
    '127.0.0.1'
);

redisClient.on('connect', () => {
    console.log('✅ Redis Connected');
});

redisClient.on('error', (err) => {
    console.log('❌ Redis Error:', err);
});

module.exports = redisClient;