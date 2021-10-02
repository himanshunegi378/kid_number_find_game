export type QuestionModel = {
    question: {
        text: string,
        speech: string
    },
    answers: {
        id: string
        answer: string,
        correct: boolean
    }[]
}