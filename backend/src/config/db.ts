import mongoose from 'mongoose'
import { logger } from './logger'
import { env } from './env'

// Connect to atlas db
//const DB_URL = `mongodb+srv://${env.DB_USERNAME}:${env.DB_PASSWORD}@cluster0.pzqkti5.mongodb.net/natours-DB?retryWrites=true&w=majority&appName=Cluster0`

//Connect to local db
export const connectDB = async () => {
  try {
    await mongoose.connect(env.LOCAL_DB_URL)
    logger.info('Connected to MongoDB successfully.')
  } catch (error) {
    logger.error({ error }, 'Failed to connect to MongoDB.')
    process.exit(1) // Exit the process with failure
  }
}
