import axios from 'axios';

class DatabaseService {
  constructor() {
    this.apiUrl = 'http://localhost:3000/api';
  }

  async addUser(username, email) {
    try {
      const response = await axios.post(`${this.apiUrl}/users`, { username, email });
      return response.data.insertId;
    } catch (error) {
      console.error('Failed to add user:', error);
      throw new Error('Could not add user');
    }
  }

  async getUsers() {
    try {
      const response = await axios.get(`${this.apiUrl}/users`);
      return response.data; // Retourne les données des utilisateurs
    } catch (error) {
      console.error('Failed to fetch users:', error);
      throw new Error('Could not fetch users');
    }
  }

  async logCommand(userId, commandText, commandType, responseText) {
    try {
      await axios.post(`${this.apiUrl}/commands`, {
        userId,
        commandText,
        commandType,
        responseText,
      });
    } catch (error) {
      console.error('Failed to log command:', error);
      throw new Error('Could not log command');
    }
  }

  async getCommandHistory(userId) {
    try {
      const response = await axios.get(`${this.apiUrl}/commands`, { params: { userId } });
      return response.data; // Retourne l'historique des commandes
    } catch (error) {
      console.error('Failed to fetch command history:', error);
      throw new Error('Could not fetch command history');
    }
  }

  async setUserPreference(userId, key, value) {
    try {
      await axios.post(`${this.apiUrl}/preferences`, {
        userId,
        key,
        value,
      });
    } catch (error) {
      console.error('Failed to set user preference:', error);
      throw new Error('Could not set user preference');
    }
  }

  async getUserPreference(userId, key) {
    try {
      const response = await axios.get(`${this.apiUrl}/preferences`, { params: { userId, key } });
      return response.data?.value || null;
    } catch (error) {
      console.error('Failed to fetch user preference:', error);
      throw new Error('Could not fetch user preference');
    }
  }
}

export default DatabaseService;
