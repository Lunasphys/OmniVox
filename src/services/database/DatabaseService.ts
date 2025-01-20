import axios from 'axios';

export class DatabaseService {
  private apiUrl = 'http://localhost:3000/api';

  async addUser(username: string, email: string): Promise<number> {
    try {
      const response = await axios.post(`${this.apiUrl}/users`, { username, email });
      return response.data.insertId;
    } catch (error) {
      console.error('Failed to add user:', error);
      throw new Error('Could not add user');
    }
  }

  async getUsers(): Promise<any[]> {
    try {
      const response = await axios.get(`${this.apiUrl}/users`);
      return response.data; // Retourne les données des utilisateurs
    } catch (error) {
      console.error('Failed to fetch users:', error);
      throw new Error('Could not fetch users');
    }
  }

  async logCommand(
      userId: number,
      commandText: string,
      commandType: 'weather' | 'music' | 'video' | 'email' | 'phone',
      responseText: string
  ): Promise<void> {
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

  async getCommandHistory(userId: number): Promise<any[]> {
    try {
      const response = await axios.get(`${this.apiUrl}/commands`, { params: { userId } });
      return response.data; // Retourne l'historique des commandes
    } catch (error) {
      console.error('Failed to fetch command history:', error);
      throw new Error('Could not fetch command history');
    }
  }

  async setUserPreference(userId: number, key: string, value: string): Promise<void> {
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

  async getUserPreference(userId: number, key: string): Promise<string | null> {
    try {
      const response = await axios.get(`${this.apiUrl}/preferences`, { params: { userId, key } });
      return response.data?.value || null;
    } catch (error) {
      console.error('Failed to fetch user preference:', error);
      throw new Error('Could not fetch user preference');
    }
  }
}
