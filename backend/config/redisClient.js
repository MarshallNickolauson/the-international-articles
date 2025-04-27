import Redis from 'redis';

const redisClient = Redis.createClient({
    url: 'redis://redis:6379',
});

redisClient.on('connect', () => console.log('Redis Client Connected'));
redisClient.on('ready', () => console.log('Redis Client Ready'));
redisClient.on('error', (err) => console.error('Redis Client Error', err));

await redisClient.connect();

export default redisClient;