const nodemailer = require('nodemailer')

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTPHOST,
            port: process.env.SMTPPORT,
            secure: false,
            auth: {
                user: process.env.SMTPUSER,
                pass: process.env.SMTPPASSWORD
            }
        })
    }

    async sendActivationMail(to, link) {
        await this.transporter.sendMail({
            from: process.env.SMTPUSER,
            to,
            subject: `Email Activation via ${process.env.APIURL}`,
            text: '',
            html:
            `
            <div>
                <h1>For activation follow the link</h1>
                <a href="${link}">${link}</a>
            </div>
            `
        })
    }
}

module.exports = new MailService()