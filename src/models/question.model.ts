export type QuestionModel = {
    question: string,
    answers : {
        answer: string,
        correct: boolean
    }[]
}