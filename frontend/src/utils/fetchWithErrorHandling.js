/**
 * Sends a fetch request to the specified URL and handles potential errors.
 * Logs the request details and errors, if any, to the console.
 *
 * @param {string} url - The URL to which the fetch request is sent.
 * @param {object} [options={}] - Optional fetch configuration such as method, headers, and body.
 * @return {Promise<object>} The JSON-parsed response from the server.
 * @throws {Error} If the response status is not ok or if there is a network error.
 */
export default async function fetchWithErrorHandling(url, options = {}) {
    try {
        console.log(`Sending request to: ${url}`, options);
        const res = await fetch(url, options);
        if (!res.ok) {
            throw new Error(`HTTP Error: ${res.status} ${res.statusText}`);
        }
        return await res.json();
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}
