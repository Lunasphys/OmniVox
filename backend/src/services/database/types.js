/**
 * @typedef {Object} User
 * @property {number} id
 * @property {string} username
 * @property {string} email
 * @property {Date} created_at
 */

/**
 * @typedef {Object} CommandHistory
 * @property {number} id
 * @property {number} user_id
 * @property {string} command_text
 * @property {'weather' | 'music' | 'video' | 'email' | 'phone'} command_type
 * @property {string} response_text
 * @property {Date} created_at
 */

/**
 * @typedef {Object} UserPreference
 * @property {number} id
 * @property {number} user_id
 * @property {string} preference_key
 * @property {string} preference_value
 * @property {Date} updated_at
 */

/**
 * @typedef {Object} WeatherData
 * @property {string} location
 * @property {number} temperature
 * @property {string} condition
 */
