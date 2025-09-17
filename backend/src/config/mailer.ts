import { Transporter } from 'nodemailer'
import { env } from './env'
import nodemailer from 'nodemailer'
import { logger } from './logger'
import * as pug from 'pug'
import { htmlToText } from 'html-to-text'

export class Mailer {
  private transporter: Transporter
  private from: string

  constructor(from: string) {
    this.from = from
    this.transporter = this.newTransporter()
  }

  private newTransporter() {
    if (env.isDev) {
      return nodemailer.createTransport({
        host: env.MAIL_TRAP_HOST,
        port: env.MAIL_TRAP_PORT,
        auth: {
          user: env.MAIL_TRAP_USER,
          pass: env.MAIL_TRAP_PASSWORD
        }
      })
    } else {
      return nodemailer.createTransport({
        host: 'smtp.sendgrid.net',
        port: 587,
        auth: {
          user: 'apikey',
          pass: env.SENDGRID_API_KEY
        }
      })
    }
  }

  public verifyTransporter() {
    this.transporter.verify((error) => {
      if (error) {
        logger.error(error, 'Mailer connection error:')
      } else {
        logger.info('NodeMailer is ready for sending emails.')
      }
    })
  }

  async send(
    to: string,
    userName: string,
    subject: string,
    templateName: string,
    link: string
  ) {
    const html = pug.renderFile(
      `${__dirname}/../templates/${templateName}.pug`,
      {
        firstName: userName,
        url: link,
        subject
      }
    )
    const mailOptions = {
      from: this.from,
      to,
      subject,
      html,
      text: env.isDev ? htmlToText(html) : undefined
    }

    await this.transporter.sendMail(mailOptions)
  }
  async sendVerification(to: string, userName: string, link: string) {
    await this.send(to, userName, 'Verify your account', 'verification', link)
  }
  async sendWelcome(to: string, userName: string, link: string) {
    await this.send(to, userName, 'Welcome to the Natours!', 'welcome', link)
  }
  async sendPasswordReset(to: string, userName: string, link: string) {
    await this.send(
      to,
      userName,
      'Your password reset token (valid for only 10 minutes)',
      'resetPassword',
      link
    )
  }
}
