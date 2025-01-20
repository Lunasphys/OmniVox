export interface User {
  id: number;
  username: string;
  email: string;
  created_at: Date;
}

export interface CommandHistory {
  id: number;
  user_id: number;
  command_text: string;
  command_type: 'weather' | 'music' | 'video' | 'email' | 'phone';
  response_text: string;
  created_at: Date;
}

export interface UserPreference {
  id: number;
  user_id: number;
  preference_key: string;
  preference_value: string;
  updated_at: Date;
}

export interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
}