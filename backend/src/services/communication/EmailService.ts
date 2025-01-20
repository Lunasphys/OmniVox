import emailjs from '@emailjs/browser';

export class EmailService {
  private publicKey: string = 'YOUR_EMAILJS_PUBLIC_KEY';
  private serviceId: string = 'YOUR_EMAILJS_SERVICE_ID';
  private templateId: string = 'YOUR_EMAILJS_TEMPLATE_ID';

  async sendEmail(to: string, subject: string, message: string): Promise<string> {
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