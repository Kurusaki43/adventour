import { HttpStatusCode } from '@constants/httpsStatusCode'

export class AppError extends Error {
  public status: string
  public isOperational: boolean
  public statusCode: HttpStatusCode
  constructor(message: string, codeStatus: HttpStatusCode) {
    super(message)
    this.status = `${codeStatus}`.startsWith('4') ? 'Fail' : 'Error'
    this.isOperational = true
    this.statusCode = codeStatus
    Error.captureStackTrace(this, this.constructor)
  }
}
