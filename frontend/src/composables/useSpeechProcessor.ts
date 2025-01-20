
export function useSpeechProcessor() {
  const isSupported = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
  
  const recognizeSpeech = (): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (!isSupported) {
        reject('Speech recognition is not supported in this browser');
        return;
      }

      // @ts-ignore - WebkitSpeechRecognition is not in the types
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.lang = 'en-US';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onresult = (event: any) => {
        const text = event.results[0][0].transcript;
        resolve(text);
      };

      recognition.onerror = (event: any) => {
        reject(event.error);
      };

      recognition.start();
    });
  };

  const synthesizeSpeech = (text: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => resolve();
      utterance.onerror = (event) => reject(event);
      window.speechSynthesis.speak(utterance);
    });
  };

  return {
    recognizeSpeech,
    synthesizeSpeech,
    isSupported
  };
}