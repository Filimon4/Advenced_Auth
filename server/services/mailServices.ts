import nodemailer from "nodemailer";

class MailServices {
    transporter: any;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
        });
    }

    async sendActivationMail(to: string, link: string) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: `Activation of account${process.env.API_URL}`,
            text: "",
            html: `
                <div>
                    <h1>For activation follow the link</h1>
                    <a href="${link}">${link}</a>
                </div>
                `,
        });
    }
}

export default MailServices;
