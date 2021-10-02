import { EventEmitter } from 'events';
import { QuestionModel } from '../../models/question.model';
import { IQuiz } from './IQuiz';

export class TableQuiz extends EventEmitter implements IQuiz {
    question: QuestionModel | undefined;
    score: number
    table: { count: number, position: number };
    constructor() {
        super();
        this.question = undefined;
        this.table = { count: 2, position: 1 };
        this.score = 0;
    }
    generateQuestion(): void {
        const question: QuestionModel = {
            question: {
                text: '',
                speech: ''
            },
            answers: []
        }
        question.question = {
            text: `${this.table.count} X ${this.table.position}`,
            speech: `${this.table.count} ${this.table.position} j`
        }
        let i = this.table.position - 1;
        while (question.answers.length <= 3) {
            const product = this.table.count * i;
            question.answers.push({
                id: `${product}`,
                answer: `${product}`,
                correct: product === this.table.count * this.table.position
            });
            i++;
        }
        question.answers = this.reshuffleAnswers(question);
        this.question = question;
        this.emit('question', question);

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

    submitAnswer(answerId: string): boolean {
        if (!this.question) return false;
        const answer = this.question.answers.find(answer => answerId === answer.id);
        if (answer?.correct) {
            this.updateScore(1);
            if (this.table.position === 9) {
                this.table.count++;
                this.table.position = 1;
            } else {
                this.table.position++;
            }

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