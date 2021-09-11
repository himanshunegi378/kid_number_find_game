import { QuestionModel } from "../models/question.model";
//@ts-ignore
import converter from "number-to-words";
import { reshuffleAnswers } from "./reshuffleAnswers";

export const generateQuestion = (): QuestionModel => {
    const question: QuestionModel = {
        question: "",
        answers: []
    }

    const number = Math.floor(Math.random() * 100) + 1;
    question.question = converter.toWords(number).toUpperCase();

    for (let i = 0; i < 3; i++) {
        const answer = Math.floor(Math.random() * 100) + 1;
        if (number !== answer) {
            question.answers.push({
                answer: answer.toString(),
                correct: false
            })
        }
    }
    question.answers.push({
        answer: number.toString(),
        correct: true
    })

    question.answers = reshuffleAnswers(question);

    return question;
}
