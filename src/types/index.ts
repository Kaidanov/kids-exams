export interface Section {
    id: number;
    title: string;
    content: string;
}

export interface Question {
    id: number;
    question: string;
    hint: string;
    options: {
        text: string;
        isCorrect: boolean;
    }[];
}

export interface StudyProgress {
    currentSection: number;
    currentQuestion: number;
    successes: number;
    failures: number;
} 