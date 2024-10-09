import 'dotenv/config';
import * as joi from 'joi';

interface EnvConfig {
  FE_URL: string;
  MYSQL_PORT: number;
  MYSQL_USERNAME: string;
  MYSQL_DB_NAME: string;
  MYSQL_PASSWORD: string;
  MYSQL_HOST: string;
  JWT_SECRET: string;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  GOOGLE_CALLBACK_URL: string;
  REDIS_HOST: string;
  REDIS_PORT: number;
}

const envVarsSchema = joi
  .object({
    FE_URL: joi.string().required(),
    MYSQL_DB_NAME: joi.string().required(),
    MYSQL_USERNAME: joi.string().required(),
    MYSQL_PASSWORD: joi.string().required(),
    MYSQL_PORT: joi.number().required(),
    MYSQL_HOST: joi.string().required(),
    JWT_SECRET: joi.string().required(),
    GOOGLE_CLIENT_ID: joi.string().required(),
    GOOGLE_CLIENT_SECRET: joi.string().required(),
    GOOGLE_CALLBACK_URL: joi.string().required(),
    REDIS_HOST: joi.string().required(),
    REDIS_PORT: joi.number().required(),
  })
  .unknown(true);

const { error, value } = envVarsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvConfig = value;

export const envs = {
  feUrl: envVars.FE_URL,
  database: envVars.MYSQL_DB_NAME,
  user: envVars.MYSQL_USERNAME,
  password: envVars.MYSQL_PASSWORD,
  dbport: envVars.MYSQL_PORT,
  host: envVars.MYSQL_HOST,
  jwtSecret: envVars.JWT_SECRET,
  googleClientId: envVars.GOOGLE_CLIENT_ID,
  googleClientSecret: envVars.GOOGLE_CLIENT_SECRET,
  googleCallbackUrl: envVars.GOOGLE_CALLBACK_URL,
  redisHost: envVars.REDIS_HOST,
  redisPort: envVars.REDIS_PORT,
};
