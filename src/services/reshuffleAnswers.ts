import { QuestionModel } from "../models/question.model";

export const reshuffleAnswers = (question: QuestionModel) => {
    const answers = question.answers.slice();
    const shuffledAnswers = [];
    while (answers.length > 0) {
        const index = Math.floor(Math.random() * answers.length);
        shuffledAnswers.push(answers[index]);
        answers.splice(index, 1);
    }
    return shuffledAnswers;
}