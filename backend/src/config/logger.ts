import pino from 'pino'

export const logger = pino({
  transport: {
    target: 'pino-pretty', // Use only in development
    options: {
      colorize: true,
      translateTime: 'SYS:standard',
      ignore: 'pid,hostname'
    }
  }
})
