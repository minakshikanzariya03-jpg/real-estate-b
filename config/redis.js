const redis = require('redis');

let redisClient = null;

if (process.env.REDIS_URL) {
    redisClient = redis.createClient(process.env.REDIS_URL);

    redisClient.on('connect', () => {
        console.log('✅ Redis Connected');
    });

    redisClient.on('error', (err) => {
        console.log('❌ Redis Error:', err);
    });
} else {
    console.log('⚠️ REDIS_URL not found. Redis disabled.');
}

module.exports = redisClient;