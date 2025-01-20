class PhoneService {
  makePhoneCall(phoneNumber) {
    try {
      // Normalize phone number
      const normalizedNumber = phoneNumber.replace(/\s+/g, '');

      // Check if the number is valid
      if (!/^\+?[\d-]+$/.test(normalizedNumber)) {
        throw new Error('Invalid phone number format');
      }

      // Simuler l'appel dans un environnement serveur (si nécessaire)
      console.log(`Initiating call to: tel:${normalizedNumber}`);  // Log côté serveur

      return `Appel en cours vers ${phoneNumber}`;
    } catch (error) {
      console.error('Phone call error:', error);
      throw new Error('Could not initiate phone call');
    }
  }
}

module.exports = { PhoneService };