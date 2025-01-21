export default function useSpeechProcessor() {
  const isSupported = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;

  /**
   * Recognizes speech input from the user's microphone and resolves to the transcribed text.
   *
   * This function uses the Web Speech API's `SpeechRecognition` or `webkitSpeechRecognition`
   * interface to capture and process spoken words. If speech recognition is not supported
   * in the current browser, the promise will be rejected with an appropriate error message.
   *
   * The recognition process is configured to use English (`en-US`) as the language,
   * operates in non-continuous mode, and produces final results only (no interim results).
   *
   * @function recognizeSpeech
   * @returns {Promise<string>} A promise that resolves to a string containing the transcribed text.
   *                            The promise is rejected with an error message if speech recognition
   *                            is not supported or an error occurs during the recognition process.
   */
  const recognizeSpeech = () => {
    return new Promise((resolve, reject) => {
      if (!isSupported) {
        reject('Speech recognition is not supported in this browser');
        return;
      }

      // @ts-ignore - WebkitSpeechRecognition
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();

      recognition.lang = 'en-US';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onresult = (event) => {
        const text = event.results[0][0].transcript;
        resolve(text);
      };

      recognition.onerror = (event) => {
        reject(event.error);
      };

      recognition.start();
    });
  };

  /**
   * Synthesizes speech for the given text using the Web Speech API.
   *
   * This function creates a speech synthesis utterance for the provided text
   * and plays the speech using the browser's built-in speech synthesis. The
   * function returns a promise that resolves when the speech synthesis is
   * completed successfully or rejects if an error occurs.
   *
   * @param {string} text - The text to be spoken by the speech synthesis engine.
   * @returns {Promise<void>} A promise that resolves when the speech synthesis finishes successfully or rejects on error.
   */
  const synthesizeSpeech = (text) => {
    // return new Promise((resolve, reject) => {
    //   const utterance = new SpeechSynthesisUtterance(text);
    //   utterance.onend = () => resolve();
    //   utterance.onerror = (event) => reject(event);
    //   window.speechSynthesis.speak(utterance);
    // });
    return Promise.resolve(); // Elle m'a saoulé à parler
  };

  return {
    recognizeSpeech,
    synthesizeSpeech,
    isSupported,
  };
}
