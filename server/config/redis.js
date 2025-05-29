import { createClient } from 'redis';
import dotenv from 'dotenv';
dotenv.config();

const redisClient = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379'
});

redisClient.on('connect', () => console.log('Redis connected!'));
redisClient.on('error', (err) => console.error('Redis Client Error', err));

if (!redisClient.isReady) {
    redisClient.connect().catch(console.error);
}

export default redisClient; 