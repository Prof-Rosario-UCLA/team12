import redisClient from '../config/redis.js';

const DEFAULT_EXPIRATION = 3600;

export const getCache = async (key) => {
    if (!redisClient) return null;
    try {
        const data = await redisClient.get(key);
        return data ? JSON.parse(data) : null;
    } catch (err) {
        return null;
    }
};

export const setCache = async (key, value, expiration = DEFAULT_EXPIRATION) => {
    if (!redisClient) return;
    try {
        await redisClient.setEx(key, expiration, JSON.stringify(value));
    } catch (err) {}
};

export const deleteCache = async (key) => {
    if (!redisClient) return;
    try {
        await redisClient.del(key);
    } catch (err) {}
};

export const deleteCacheByPattern = async (pattern) => {
    if (!redisClient) return;
    try {
        let cursor = 0;
        do {
            const reply = await redisClient.scan(cursor, { MATCH: pattern, COUNT: 100 });
            cursor = reply.cursor;
            const keys = reply.keys;
            if (keys.length > 0) {
                await redisClient.del(keys);
            }
        } while (cursor !== 0);
    } catch (err) {}
}; 