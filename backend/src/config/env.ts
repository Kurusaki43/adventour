import { cleanEnv, str, port, url, makeValidator } from 'envalid'
import dotenv from 'dotenv'
import ms from 'ms'

// Load .env into process.env BEFORE using envalid
dotenv.config()

export type MsDuration = ms.StringValue

export const msDuration = makeValidator<MsDuration>((input) => {
  if (!/^\d+(ms|s|m|h|d|w|y)$/.test(input)) {
    throw new Error(
      `Invalid duration format: "${input}". Must be like '7d', '5m', etc.`
    )
  }
  return input as MsDuration
})
// Validate environment variables using envalid
export const env = cleanEnv(process.env, {
  PORT: port({ default: 3000 }),
  LOCAL_DB_URL: url(),
  DB_USERNAME: str(),
  DB_PASSWORD: str(),
  JWT_SECRET: str(),
  NODE_ENV: str({ choices: ['development', 'production', 'test'] }),
  ACCESS_TOKEN_SECRET: str(),
  ACCESS_TOKEN_EXPIRES_IN: msDuration(),
  REFRESH_TOKEN_SECRET: str(),
  REFRESH_TOKEN_EXPIRES_IN: msDuration(),
  FRONT_END_HOST_URL: str(),
  // MAIL Service CONFIGURATION
  MAIL_TRAP_PORT: port({ default: 2525 }),
  MAIL_TRAP_HOST: str({ default: 'sandbox.smtp.mailtrap.io' }),
  MAIL_TRAP_USER: str(),
  MAIL_TRAP_PASSWORD: str(),
  SENDGRID_API_KEY: str(),
  SENDGRID_FROM_EMAIL: str(),
  GOOGLE_CLIENT_ID: str(),
  GOOGLE_CLIENT_SECRET: str(),
  STRIPE_SECRET_KEY: str(),
  WEB_HOOK_SECRET: str()
})
