import { useCallback } from 'react';

export const useTextToSpeech = () => {
  const speak = useCallback((text: string) => {
    if (!window.speechSynthesis) {
      console.error('הדפדפן לא תומך בהקראה');
      return;
    }

    // עצירת הקראה קודמת
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'he-IL';
    utterance.rate = 0.9;
    utterance.pitch = 1;

    // בחירת קול בעברית אם קיים
    const voices = window.speechSynthesis.getVoices();
    const hebrewVoice = voices.find(voice => voice.lang.includes('he'));
    if (hebrewVoice) {
      utterance.voice = hebrewVoice;
    }

    window.speechSynthesis.speak(utterance);
  }, []);

  return { speak };
}; 