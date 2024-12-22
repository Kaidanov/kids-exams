import { useState } from 'react';
import { ThemeProvider, createTheme, RTL } from '@mui/material';
import { StudyContent } from './components/StudyContent';
import { Quiz } from './components/Quiz';
import { StudyProgress } from './types';

const theme = createTheme({
  direction: 'rtl',
  typography: {
    fontFamily: 'Arial, sans-serif',
  },
});

function App() {
  const [progress, setProgress] = useState<StudyProgress>({
    currentSection: 1,
    currentQuestion: 0,
    successes: 0,
    failures: 0,
  });

  const [isQuizMode, setIsQuizMode] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <RTL>
        <div dir="rtl">
          <h1>לימוד נצרות לכיתה ז'</h1>
          {!isQuizMode ? (
            <StudyContent 
              progress={progress}
              setProgress={setProgress}
              onComplete={() => setIsQuizMode(true)}
            />
          ) : (
            <Quiz 
              progress={progress}
              setProgress={setProgress}
            />
          )}
        </div>
      </RTL>
    </ThemeProvider>
  );
}

export default App; 