export type QuestionModel = {
    question: string,
    answers: {
        id: string
        answer: string,
        correct: boolean
    }[]
}