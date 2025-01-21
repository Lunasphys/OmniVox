<script setup>
import {ref} from 'vue';
import useSpeechProcessor from '../composables/useSpeechProcessor.js';

const inputField = ref('');
const result = ref('');
const isListening = ref(false);

const {recognizeSpeech, synthesizeSpeech} = useSpeechProcessor();

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
    if (lowerCommand.includes('weather')) {
      const cityMatch = command.match(/weather (?:in|at|for)? (.+)/i);
      if (cityMatch) {
        const res = await fetchWithErrorHandling(`http://localhost:3000/api/weather?city=${cityMatch[1]}`);
        response = res.message || 'Weather data unavailable.';
      } else {
        response = 'Please specify a city for weather information.';
      }
    } else if (lowerCommand.includes('spotify')) {
      const musicMatch = command.match(/(?:search|play|find) (.+) on spotify/i);
      if (musicMatch) {
        const searchQuery = encodeURIComponent(musicMatch[1]);
        const spotifyUrl = `https://open.spotify.com/search/${searchQuery}`;
        window.location.href = spotifyUrl; // Redirige directement l'utilisateur vers Spotify
      } else {
        response = 'Please specify what to search on Spotify.';
      }
    } else if (lowerCommand.includes('youtube')) {
      const videoMatch = command.match(/(?:search|play|find) (.+) on youtube/i);
      if (videoMatch) {
        const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(videoMatch[1])}`;
        window.location.href = searchUrl; // Redirige directement l'utilisateur
      } else {
        response = 'Please specify what to search on YouTube.';
      }
    } else if (lowerCommand.includes('email') || lowerCommand.includes('send mail')) {
      // Correspondance pour l'email
      const emailMatch = command.match(/send (?:email|mail) to (.+) (?:with subject|about) (.+) (?:saying|with message) (.+)/i);
      if (emailMatch) {
        const to = emailMatch[1];
        const subject = emailMatch[2];
        const message = emailMatch[3];

        // Appel à l'API backend pour envoyer l'email
        const res = await fetchWithErrorHandling(`http://localhost:3000/api/email`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({to, subject, message}),
        });

        response = res.message || `Email sent to ${to}.`;
      } else {
        response = 'Please specify recipient, subject, and message for the email.';
      }
    } else {
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


const fetchWithErrorHandling = async (url) => {
  try {
    console.log(`Sending request to: ${url}`); // Débogage

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`HTTP Error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    console.log('Response from backend:', data); // Débogage
    return data;
  } catch (error) {
    console.error('Fetch error:', error); // Débogage
    throw error;
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
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
  100% {
    opacity: 1;
  }
}
</style>
