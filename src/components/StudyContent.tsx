import { FC } from 'react';
import { Paper, Typography, Button, Box } from '@mui/material';
import { VolumeUp } from '@mui/icons-material';
import { Section, StudyProgress } from '../types';
import { sections } from '../data/sections';
import { useTextToSpeech } from '../hooks/useTextToSpeech';

interface StudyContentProps {
  progress: StudyProgress;
  setProgress: (progress: StudyProgress) => void;
  onComplete: () => void;
}

export const StudyContent: FC<StudyContentProps> = ({ progress, setProgress, onComplete }) => {
  const { speak } = useTextToSpeech();
  const currentSection = sections[progress.currentSection - 1];

  const handleNext = () => {
    if (progress.currentSection < sections.length) {
      setProgress({
        ...progress,
        currentSection: progress.currentSection + 1
      });
    } else {
      onComplete();
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, m: 2 }}>
      <Typography variant="h5" gutterBottom>
        {currentSection.title}
      </Typography>
      <Typography paragraph>
        {currentSection.content}
        <Button 
          startIcon={<VolumeUp />}
          onClick={() => speak(currentSection.content)}
          sx={{ mx: 1 }}
        >
          הקרא
        </Button>
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Button 
          variant="contained" 
          color="primary"
          onClick={handleNext}
        >
          {progress.currentSection < sections.length ? 'המשך' : 'התחל מבחן'}
        </Button>
      </Box>
    </Paper>
  );
}; 