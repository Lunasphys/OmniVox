import fetchWithErrorHandling from '../utils/fetchWithErrorHandling.js';

/**
 * Asynchronous function to handle email commands parsed from input strings.
 * Extracts recipient email address, subject, and message from the command
 * and sends an email via an API request.
 *
 * @param {string} command - The command string containing email recipient, subject, and message.
 * @returns {Promise<string>} Resolves to a success message upon successful email sending or
 * an error message if the command fails to meet the required format or an API error occurs.
 */
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
