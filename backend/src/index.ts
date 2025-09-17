import { app, mailer } from './app'
import { env } from '@config/env'
import { connectDB } from '@config/db'
import { logger } from '@config/logger'

const server = app.listen(env.PORT, '127.0.0.1', async () => {
  logger.info(`Server running on port ${env.PORT}.`)
  await connectDB()
  mailer.verifyTransporter()
})

process.on('unhandledRejection', (err) => {
  logger.error(`Unhandled Rejection: ${err}`)
  server.close(() => {
    process.exit(1)
  })
})

process.on('uncaughtException', (err) => {
  logger.error(`Uncaught Exception: ${err}`)
  process.exit(1)
})
