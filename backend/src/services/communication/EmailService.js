import fetch from 'node-fetch';

export default class EmailService {
    constructor() {
        this.publicKey = process.env.VITE_EMAILJS_PUBLIC_KEY;
        this.serviceId = process.env.VITE_EMAILJS_SERVICE_ID;
        this.templateId = process.env.VITE_EMAILJS_TEMPLATE_ID;
        this.apiEndpoint = 'https://api.emailjs.com/api/v1.0/email/send';
    }

    /**
     * Sends an email using the configured email service.
     *
     * @param {string} to - The recipient's email address.
     * @param {string} subject - The subject line of the email.
     * @param {string} message - The content of the email message.
     * @return {Promise<string>} A promise that resolves with a success message if the email is sent successfully.
     * @throws {Error} Throws an error if the email cannot be sent or if an API error occurs.
     */
    async sendEmail(to, subject, message) {
        try {
            console.log('Preparing to send email:', { to, subject, message });

            const templateParams = {
                service_id: this.serviceId,
                template_id: this.templateId,
                user_id: this.publicKey,
                template_params: {
                    to_email: to,
                    subject: subject,
                    message: message,
                },
            };

            console.log('Template Parameters:', JSON.stringify(templateParams, null, 2));

            const response = await fetch(this.apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(templateParams),
            });

            const textResponse = await response.text();
            console.log('Raw API Response:', textResponse);

            if (response.ok && textResponse === 'OK') {
                console.log('Email sent successfully.');
                return `Email sent to ${to}`;
            }

            console.error('Error response from EmailJS:', textResponse);
            throw new Error(`Failed to send email: ${textResponse}`);
        } catch (error) {
            console.error('Error in EmailService:', error);
            throw new Error('Could not send email');
        }
    }
}
