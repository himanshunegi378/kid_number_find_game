export interface IQuiz {
    generateQuestion(): void;
    submitAnswer(answerdId: string): boolean;
}