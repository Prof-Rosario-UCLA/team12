import redisClient from '../config/redis.js';

const DEFAULT_EXPIRATION = 3600;

export const getCache = async (key) => {
    try {
        const data = await redisClient.get(key);
        return data ? JSON.parse(data) : null;
    } catch (err) {
        console.error(`Error getting cache for key ${key}:`, err);
        return null;
    }
};

export const setCache = async (key, value, expiration = DEFAULT_EXPIRATION) => {
    try {
        await redisClient.setEx(key, expiration, JSON.stringify(value));
    } catch (err) {
        console.error(`Error setting cache for key ${key}:`, err);
    }
};

export const deleteCache = async (key) => {
    try {
        await redisClient.del(key);
    } catch (err) {
        console.error(`Error deleting cache for key ${key}:`, err);
    }
};

export const deleteCacheByPattern = async (pattern) => {
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
    } catch (err) {
        console.error(`Error deleting cache for pattern ${pattern}:`, err);
    }
}; 