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
