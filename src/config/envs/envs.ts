import 'dotenv/config';
import * as joi from 'joi';

interface EnvConfig {
  APP_NAME: string;
  APP_URL: string;
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
  MAIL_ENCRYPTION: string;
  MAIL_FROM_ADDRESS: string;
  MAIL_HOST: string;
  MAIL_MAILER: string;
  MAIL_PASSWORD: string;
  MAIL_PORT: number;
  MAIL_USERNAME: string;
  BCRYPT_SALT_ROUND: number;
  PORT: number;
  OTP_SIZE: number;
  OTP_TIMEOUT: number;
  OTP_TIME_LIMIT: number;
  OTP_LIMIT: number;
}

const envVarsSchema = joi
  .object({
    APP_NAME: joi.string().required(),
    APP_URL: joi.string().required(),
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
    MAIL_ENCRYPTION: joi.string().required(),
    MAIL_FROM_ADDRESS: joi.string().required(),
    MAIL_HOST: joi.string().required(),
    MAIL_MAILER: joi.string().required(),
    MAIL_PASSWORD: joi.string().required(),
    MAIL_PORT: joi.number().required(),
    MAIL_USERNAME: joi.string().required(),
    BCRYPT_SALT_ROUND: joi.number().required(),
    PORT: joi.number().required(),
    OTP_SIZE: joi.number().required(),
    OTP_TIMEOUT: joi.number().required(),
    OTP_TIME_LIMIT: joi.number().required(),
    OTP_LIMIT: joi.number().required(),
  })
  .unknown(true);

const { error, value } = envVarsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvConfig = value;

export const envs = {
  appName: envVars.APP_NAME,
  appUrl: envVars.APP_URL,
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
  mailEncryption: envVars.MAIL_ENCRYPTION,
  mailFromAddress: envVars.MAIL_FROM_ADDRESS,
  mailHost: envVars.MAIL_HOST,
  mailer: envVars.MAIL_MAILER,
  mailPassword: envVars.MAIL_PASSWORD,
  mailPort: envVars.MAIL_PORT,
  mailUsername: envVars.MAIL_USERNAME,
  bcryptSaltRound: envVars.BCRYPT_SALT_ROUND,
  port: envVars.PORT,
  otpSize: envVars.OTP_SIZE,
  otpTimeout: envVars.OTP_TIMEOUT,
  otpTimeLimit: envVars.OTP_TIME_LIMIT,
  otpLimit: envVars.OTP_LIMIT,
};
