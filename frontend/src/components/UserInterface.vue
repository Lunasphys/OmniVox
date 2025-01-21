<script setup>
import { ref } from 'vue';
import useSpeechProcessor from '../composables/useSpeechProcessor.js';

import externalService from '../../../backend/src/services/ServiceFactory.js';
const inputField = ref('');
const result = ref('');
const isListening = ref(false);

const { recognizeSpeech, synthesizeSpeech } = useSpeechProcessor();

const captureVoice = async () => {
  isListening.value = true;
  try {
    const text = await recognizeSpeech();
    inputField.value = text;
    await processCommand(text);
  } catch (error) {
    console.error('Speech recognition error:', error);
    result.value = 'Sorry, I could not understand that.';
  } finally {
    isListening.value = false;
  }
};

const processCommand = async (command) => {
  const lowerCommand = command.toLowerCase();
  let response = '';

  try {
    // Weather commands
    if (lowerCommand.includes('weather')) {
      const cityMatch = command.match(/weather (?:in|at|for)? (.+)/i);
      if (cityMatch) {
        response = await externalService.getWeather(cityMatch[1]);
      } else {
        response = 'Please specify a city for weather information.';
      }
    }
    // Music commands
    else if (lowerCommand.includes('play') && lowerCommand.includes('spotify')) {
      const songMatch = command.match(/play (.+) on spotify/i);
      if (songMatch) {
        response = await externalService.searchSpotify(songMatch[1]);
      } else {
        response = 'Please specify a song to play on Spotify.';
      }
    }
    // YouTube commands
    else if (lowerCommand.includes('youtube')) {
      const videoMatch = command.match(/(?:search|play|find) (.+) on youtube/i);
      if (videoMatch) {
        response = await externalService.searchYouTube(videoMatch[1]);
      } else {
        response = 'Please specify what to search on YouTube.';
      }
    }
    // Email commands
    else if (lowerCommand.includes('email') || lowerCommand.includes('send mail')) {
      const emailMatch = command.match(/send (?:email|mail) to (.+) (?:with subject|about) (.+) (?:saying|with message) (.+)/i);
      if (emailMatch) {
        response = await externalService.sendEmail(emailMatch[1], emailMatch[2], emailMatch[3]);
      } else {
        response = 'Please specify recipient, subject, and message for the email.';
      }
    }
    // Phone call commands
    else if (lowerCommand.includes('call')) {
      const phoneMatch = command.match(/call (\+?[\d\s-]+)/);
      if (phoneMatch) {
        response = externalService.makePhoneCall(phoneMatch[1]);
      } else {
        response = 'Please specify a phone number to call.';
      }
    }
    // Default greeting
    else if (lowerCommand.includes('hello') || lowerCommand.includes('hi')) {
      response = 'Hello! How can I help you today?';
    }
    // Unknown command
    else {
      response = 'I heard you say: ' + command + '. Try asking about weather, playing music, searching YouTube, sending emails, or making calls.';
    }

    result.value = response;
    await synthesizeSpeech(response);
  } catch (error) {
    console.error('Command processing error:', error);
    result.value = 'Sorry, there was an error processing your request.';
    await synthesizeSpeech(result.value);
  }
};
</script>

<template>
  <div class="voice-assistant">
    <h1>Voice Assistant</h1>

    <div class="input-section">
      <input
          v-model="inputField"
          type="text"
          placeholder="Your command will appear here..."
          readonly
      />
      <button
          @click="captureVoice"
          :class="{ 'listening': isListening }"
      >
        {{ isListening ? 'Listening...' : 'Start Listening' }}
      </button>
    </div>

    <div class="result-section" v-if="result">
      <h3>Response:</h3>
      <p>{{ result }}</p>
    </div>
  </div>
</template>

<style scoped>
.voice-assistant {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
}

.input-section {
  display: flex;
  gap: 1rem;
  margin: 2rem 0;
}

input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 0.5rem 1rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #45a049;
}

button.listening {
  background-color: #ff4444;
  animation: pulse 1.5s infinite;
}

.result-section {
  margin-top: 2rem;
  padding: 1rem;
  background-color: #f5f5f5;
  border-radius: 4px;
}

.help-section {
  margin-top: 2rem;
  padding: 1rem;
  background-color: #f5f5f5;
  border-radius: 4px;
}

.help-section ul {
  list-style-type: none;
  padding: 0;
}

.help-section li {
  margin: 0.5rem 0;
  padding: 0.5rem;
  background-color: white;
  border-radius: 4px;
}

@keyframes pulse {
  0% { opacity: 1; }
  50% { opacity: 0.7; }
  100% { opacity: 1; }
}
</style>
