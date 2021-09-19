import { QuestionModel } from "../../models/question.model";
//@ts-ignore
import converter from "number-to-words";
import { EventEmitter } from 'events';

export class NumberQuiz extends EventEmitter {
    question: QuestionModel | undefined;
    score: number

    constructor() {
        super();
        this.question = undefined
        this.score = 0
    }

    generateQuestion = () => {
        const question: QuestionModel = {
            question: "",
            answers: []
        }

        const number = Math.floor(Math.random() * 100) + 1;
        question.question = converter.toWords(number).toUpperCase();
        // generate possible wrong answers
        for (let i = 0; i < 3; i++) {
            const answer = Math.floor(Math.random() * 100) + 1;
            if (number !== answer) {
                question.answers.push({
                    id: answer.toString(),
                    answer: answer.toString(),
                    correct: false
                })
            }
        }
        // generate correct answer
        question.answers.push({
            id: number.toString(),
            answer: number.toString(),
            correct: true
        })

        question.answers = this.reshuffleAnswers(question);
        this.question = question;
        this.emit("question", question);
    }

    private reshuffleAnswers = (question: QuestionModel) => {
        const answers = question.answers.slice();
        const shuffledAnswers = [];
        while (answers.length > 0) {
            const index = Math.floor(Math.random() * answers.length);
            shuffledAnswers.push(answers[index]);
            answers.splice(index, 1);
        }
        return shuffledAnswers;
    }

    submitAnswer = (answerId: string) => {
        if (!this.question) return false;
        const answer = this.question.answers.find(answer => answerId === answer.id);
        if (answer?.correct) {
            this.updateScore(1);
            return true;
        }
        this.updateScore(-1);
        return false;
    }

    private updateScore = (deltaChangeInScore: number) => {
        this.score += deltaChangeInScore;
        this.emit("score", this.score);
    }
}