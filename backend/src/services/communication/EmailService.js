import emailjs from '@emailjs/browser';

class EmailService {
    constructor() {
        this.publicKey = 'YOUR_EMAILJS_PUBLIC_KEY';
        this.serviceId = 'YOUR_EMAILJS_SERVICE_ID';
        this.templateId = 'YOUR_EMAILJS_TEMPLATE_ID';
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
                {
                    publicKey: this.publicKey,
                }
            );
            return `Email envoyé à ${to}`;
        } catch (error) {
            console.error('Email error:', error);
            throw new Error('Could not send email');
        }
    }
}

export default EmailService;
