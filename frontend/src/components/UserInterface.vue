<script setup>
import { ref } from 'vue';
import useSpeechProcessor from '../composables/useSpeechProcessor.js';

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
        window.location.href = spotifyUrl;
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
      const emailMatch = command.match(/send (?:email|mail) to (.+) (?:with subject|about) (.+) (?:saying|with message) (.+)/i);

      if (emailMatch) {
        const to = emailMatch[1]
            .trim()
            .replace(/\s+/g, ' ')
            .replace(/\sat\s/gi, '@')
            .replace(/\sdot\s/gi, '.');
        const subject = emailMatch[2].trim();
        const message = emailMatch[3].trim();

        // Appel à l'API backend pour envoyer l'email
        const res = await fetchWithErrorHandling(`http://localhost:3000/api/email`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ to, subject, message }),
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

const fetchWithErrorHandling = async (url, options = {}) => {
  try {
    console.log(`Sending request to: ${url}`, options); // Débogage

    const res = await fetch(url, options);
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
  <link href="https://fonts.googleapis.com/css2?family=Lora:wght@400;600&family=Roboto:wght@400;500&display=swap" rel="stylesheet">

  <div class="voice-assistant">
    <h1>OMNIVOX</h1>

    <div class="commands-section">
      <h2>Available Commands:</h2>
      <ul>
        <li><strong>Weather:</strong> "What's the weather in <em>city</em>?"</li>
        <li><strong>Spotify:</strong> "Search <em>song/artist</em> on Spotify."</li>
        <li><strong>YouTube:</strong> "Search <em>video/topic</em> on YouTube."</li>
        <li><strong>Email:</strong> "Send email to <em>recipient</em> with subject <em>subject</em> saying <em>message</em>."</li>
      </ul>
    </div>

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
        {{ isListening ? '🎙 Listening...' : '🎤 Start Listening' }}
      </button>
    </div>

    <!-- Section pour afficher les réponses -->
    <div class="result-section" v-if="result">
      <h3>Response:</h3>
      <p>{{ result }}</p>
    </div>
  </div>
</template>


<style scoped>
.commands-section {
  margin-top: 2rem;
  padding: 1.5rem;
  background-color: var(--result-bg);
  color: var(--result-text);
  border-radius: 6px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
}

.commands-section h2 {
  font-family: var(--font-title);
  font-size: 1.8rem;
  color: var(--accent-color);
  margin-bottom: 1rem;
}

.commands-section ul {
  list-style-type: none;
  padding: 0;
}

.commands-section li {
  font-size: 1rem;
  margin-bottom: 0.8rem;
  line-height: 1.5;
}

.commands-section li strong {
  color: var(--accent-color);
}

.commands-section li em {
  font-style: italic;
  color: var(--text-color);
}
</style>





