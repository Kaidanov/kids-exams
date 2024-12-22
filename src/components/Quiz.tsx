import { FC, useState } from 'react';
import { 
  Paper, 
  Typography, 
  Button, 
  Radio, 
  RadioGroup, 
  FormControlLabel, 
  Box,
  Alert
} from '@mui/material';
import { VolumeUp } from '@mui/icons-material';
import { Question, StudyProgress } from '../types';
import { questions } from '../data/questions';
import { useTextToSpeech } from '../hooks/useTextToSpeech';

interface QuizProps {
  progress: StudyProgress;
  setProgress: (progress: StudyProgress) => void;
}

export const Quiz: FC<QuizProps> = ({ progress, setProgress }) => {
  const { speak } = useTextToSpeech();
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  
  const currentQuestion = questions[progress.currentQuestion];

  const handleAnswer = (isCorrect: boolean) => {
    setProgress({
      ...progress,
      successes: progress.successes + (isCorrect ? 1 : 0),
      failures: progress.failures + (isCorrect ? 0 : 1)
    });

    setFeedback(isCorrect ? 'נכון! כל הכבוד! 🎉' : 'לא נכון. נסה שוב! 🤔');

    if (isCorrect) {
      setTimeout(() => {
        setProgress({
          ...progress,
          currentQuestion: progress.currentQuestion + 1
        });
        setFeedback(null);
        setShowHint(false);
      }, 1500);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, m: 2 }}>
      <Typography variant="h6" gutterBottom>
        {currentQuestion.question}
        <Button 
          startIcon={<VolumeUp />}
          onClick={() => speak(currentQuestion.question)}
          sx={{ mx: 1 }}
        >
          הקרא
        </Button>
      </Typography>

      <Button 
        variant="outlined" 
        onClick={() => setShowHint(true)}
        sx={{ my: 2 }}
      >
        רמז
      </Button>

      {showHint && (
        <Typography color="text.secondary" sx={{ my: 2 }}>
          {currentQuestion.hint}
        </Typography>
      )}

      <RadioGroup>
        {currentQuestion.options.map((option, index) => (
          <FormControlLabel
            key={index}
            value={index}
            control={<Radio />}
            label={option.text}
            onChange={() => handleAnswer(option.isCorrect)}
          />
        ))}
      </RadioGroup>

      {feedback && (
        <Alert 
          severity={feedback.includes('נכון') ? 'success' : 'error'}
          sx={{ mt: 2 }}
        >
          {feedback}
        </Alert>
      )}

      <Box sx={{ mt: 2 }}>
        <Typography>
          שאלה {progress.currentQuestion + 1} מתוך {questions.length}
        </Typography>
      </Box>
    </Paper>
  );
}; 