import nodemailer from "nodemailer";
import { envs } from "../../config/env.plugin";

interface MailOptions {
    to: string;
    subject: string;
    body: string;
}

export class EmailService {
    private transporter = nodemailer.createTransport({
        service: envs.MAIL_SERVICE,
        auth: {
            user: envs.MAIL_USER,
            pass: envs.MAIL_SECRET_KEY
        }
    });
    
    async sendMail({ to, subject, body }: MailOptions) {
        try {
            await this.transporter.sendMail({
                from: envs.MAIL_USER,
                to,
                subject,
                html: body
            });
        } catch (error) {
            console.error(error);
        }
    }
}