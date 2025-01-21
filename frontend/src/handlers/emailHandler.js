import fetchWithErrorHandling from '../utils/fetchWithErrorHandling.js';

export const handleEmailCommand = async (command) => {
    const emailMatch = command.match(/send (?:email|mail) to (.+) (?:with subject|about) (.+) (?:saying|with message) (.+)/i);
    if (emailMatch) {
        const to = emailMatch[1]
            .trim()
            .replace(/\s+/g, ' ')
            .replace(/\sat\s/gi, '@')
            .replace(/\sdot\s/gi, '.');
        const subject = emailMatch[2].trim();
        const message = emailMatch[3].trim();

        const res = await fetchWithErrorHandling(`http://localhost:3000/api/email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ to, subject, message }),
        });

        return res.message || `Email sent to ${to}.`;
    }
    return 'Please specify recipient, subject, and message for the email.';
};
