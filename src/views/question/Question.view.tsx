import { QuestionModel } from "../../models/question.model";
//@ts-ignore
import { useSpeechSynthesis } from 'react-speech-kit';
//@ts-ignore
import converter from "number-to-words";
import { useCallback, useEffect, useState } from "react";
import styles from './question.module.scss';
import { AnswerList } from "./components/AnswerList/AnswerList.component";


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
    const [isDisabled, setIsDisabled] = useState(false);
    const { speak, cancel, speaking, supported } = useSpeechSynthesis();
    useEffect(() => {
        setQuestion(generateQuestion());
    }, [])

    const handleNewQuestion = () => {
        setQuestion(generateQuestion());
        setIsDisabled(false);
    }

    const handleSpeak = useCallback((text: string) => {
        if (!supported) {
            return;
        }
        if (speaking) {
            cancel();
        }
        speak({ text });
    }, [cancel, speak, speaking, supported]);

    const handleAnswerClick = useCallback((answerId: number) => {
        const answer = answers[answerId];
        setIsDisabled(true);
        if (answer.correct) {
            handleSpeak(`Correct!`);
        } else {
            handleSpeak(`Wrong!`);
        }
        setTimeout(handleNewQuestion, 1000);
    }, [answers, handleSpeak])
    return <div className={styles.question_container}>
        <h1 onClick={() => {
            handleSpeak(question);
        }}>
            {question}
        </h1>
        <AnswerList disabled={isDisabled} answers={answers.map(({ answer }) => answer)} onAnswerClick={handleAnswerClick} />

    </div>;
}