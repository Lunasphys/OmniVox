export class PhoneService {
  makePhoneCall(phoneNumber: string): string {
    try {
      // Normalize phone number
      const normalizedNumber = phoneNumber.replace(/\s+/g, '');
      
      // Check if the number is valid
      if (!/^\+?[\d-]+$/.test(normalizedNumber)) {
        throw new Error('Invalid phone number format');
      }

      // Use tel: protocol to initiate phone call
      window.location.href = `tel:${normalizedNumber}`;
      return `Appel en cours vers ${phoneNumber}`;
    } catch (error) {
      console.error('Phone call error:', error);
      throw new Error('Could not initiate phone call');
    }
  }
}