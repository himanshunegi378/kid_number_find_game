import { QuestionModel } from "../../models/question.model";
//@ts-ignore
import { useSpeechSynthesis } from 'react-speech-kit';
//@ts-ignore
import converter from "number-to-words";
import { useEffect, useState } from "react";


const reshuffleAnswers = (question: QuestionModel) => {
    const answers = question.answers.slice();
    const shuffledAnswers = [];
    while (answers.length > 0) {
        const index = Math.floor(Math.random() * answers.length);
        shuffledAnswers.push(answers[index]);
        answers.splice(index, 1);
    }
    return shuffledAnswers;
}

const generateQuestion = (): QuestionModel => {
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




export function QuestionView() {
    const [{ question, answers }, setQuestion] = useState<QuestionModel>(generateQuestion());
    const { speak, cancel, speaking, supported } = useSpeechSynthesis();
    useEffect(() => {
        setQuestion(generateQuestion());
    }, [])

    const handleNewQuestion = () => {
        setQuestion(generateQuestion());
    }

    const handleSpeak = (text: string) => {
        if (!supported) {
            return;
        }
        if (speaking) {
            cancel();
        }
        speak({ text });
    };

    const handleAnswerClick = (isCorrect: boolean) => {
        if (isCorrect) {
            handleSpeak(`Correct!`);
        } else {
            handleSpeak(`Wrong!`);
        }
    }
    return <div>
        <button onClick={handleNewQuestion}>New Question</button>
        <h1>
            {question}
            <button onClick={() => {
                handleSpeak(question);
            }} >Speak</button>
        </h1>
        <ul>
            {answers.map(({ answer, correct }, index) => <li key={index} onClick={() => { handleAnswerClick(correct) }}>{answer}</li>)}
        </ul>
    </div>;
}