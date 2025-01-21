<script setup>
import { ref } from 'vue';
import { handleWeatherCommand } from '../handlers/weatherHandler.js';
import { handleSpotifyCommand } from '../handlers/spotifyHandler.js';
import { handleYouTubeCommand } from '../handlers/youtubeHandler.js';
import { handleEmailCommand } from '../handlers/emailHandler.js';
import { handleDefaultCommand } from '../handlers/defaultHandler.js';
import useSpeechProcessor from '../composables/useSpeechProcessor.js';

const inputField = ref('');
const result = ref('');
const isListening = ref(false);

const { recognizeSpeech, synthesizeSpeech } = useSpeechProcessor();

/**
 * An asynchronous function responsible for initiating speech recognition, processing the recognized text,
 * and setting appropriate values based on the result of the operation.
 * It updates the state indicating whether the application is currently listening for voice input.
 *
 * Workflow:
 * 1. Activates listening state to indicate the system is listening for speech.
 * 2. Uses a speech recognition function to capture and convert spoken words into text.
 * 3. Sets the recognized text into an input field.
 * 4. Processes commands based on the recognized speech using a command-processing function.
 * 5. Handles errors encountered during speech recognition and sets a default error message in case of failure.
 * 6. Ensures that the listening state is deactivated after completing all operations.
 *
 * Error Handling:
 * Logs an error message to the console if speech recognition fails,
 * and sets a fallback message indicating failure to understand the speech input.
 */
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

// Gestion des commandes vocales
/**
 * Asynchronously processes a given command and determines its response based on the command's content.
 * The function is capable of handling commands related to weather, Spotify, YouTube, email,
 * or providing a default response for unrecognized commands.
 *
 * @async
 * @param {string} command - The user-provided command string to be processed.
 * @returns {Promise<void>} A promise that resolves when the command processing is complete,
 * with the result stored in the appropriate output variable.
 * @throws Will handle any errors that occur during the processing of the command
 * and set the output variable with an error message.
 */
const processCommand = async (command) => {
  const lowerCommand = command.toLowerCase();
  let response = '';

  try {
    if (lowerCommand.includes('weather')) {
      response = await handleWeatherCommand(command);
    } else if (lowerCommand.includes('spotify')) {
      response = handleSpotifyCommand(command);
    } else if (lowerCommand.includes('youtube')) {
      response = handleYouTubeCommand(command);
    } else if (lowerCommand.includes('email') || lowerCommand.includes('send mail')) {
      response = await handleEmailCommand(command);
    } else {
      response = handleDefaultCommand(command);
    }
    result.value = response;
  } catch (error) {
    console.error('Command processing error:', error);
    result.value = 'Sorry, there was an error processing your request.';
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





