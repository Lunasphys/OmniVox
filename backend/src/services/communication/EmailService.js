import emailjs from '@emailjs/browser';

class EmailService {
    constructor() {
        this.publicKey = process.env.EMAILJS_PUBLIC_KEY;
        this.serviceId = process.env.EMAILJS_SERVICE_ID;
        this.templateId = process.env.EMAILJS_TEMPLATE_ID;
    }

    async sendEmail(to, subject, message) {
        try {
            await emailjs.send(
                this.serviceId,
                this.templateId,
                {
                    to_email: to,
                    subject: subject,
                    message: message,
                },
                this.publicKey
            );
            return `Email envoyé à ${to}`;
        } catch (error) {
            console.error('Email error:', error);
            throw new Error('Could not send email');
        }
    }
}

export default EmailService;
