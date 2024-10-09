import { envs } from '../envs';

export const redisConfig = {
  host: envs.redisHost || 'localhost',
  port: envs.redisPort || 6379,
};
