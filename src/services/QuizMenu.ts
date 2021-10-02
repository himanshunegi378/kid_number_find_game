import { NumberQuiz } from "./quiz/NumberQuiz";
import { TableQuiz } from "./quiz/TableQuiz";

export const quizMenu = [
    {
        id: '1',
        name: 'Number Quiz',
        description: 'A quiz where you have to choose the correct number.',
        quizObject: NumberQuiz,
    },
    {
        id: '2',
        name: 'Table Quiz',
        description: 'A quiz where you have to choose the Table answer.',
        quizObject: TableQuiz,
    }
]