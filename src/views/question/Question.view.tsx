import { QuestionModel } from "../../models/question.model";

import { useCallback, useEffect, useState } from "react";
import styles from './question.module.scss';
import { AnswerList } from "./components/AnswerList/AnswerList.component";
import { useSpeech } from "../../context/Speech";
import { Score } from "./components/Score/Score.component";
import { useHistory } from "react-router-dom";


export function QuestionView({ quizObject: obj }: { quizObject: any }) {
    const [{ question, answers }, setQuestion] = useState<QuestionModel>({ question: 'na', answers: [] });
    const [quizObject, setQuizObject] = useState<any>();
    const [score, setScore] = useState(0);
    const [isDisabled, setIsDisabled] = useState(false);
    const speak = useSpeech();
    const history = useHistory();
    useEffect(() => {
        if (!obj) {
            history.push('/')
            return;
        }
        setQuizObject(new obj());
    }, [history, obj])


    useEffect(() => {
        if (!quizObject) return;
        const onNewQuestion = (newQuestion: QuestionModel) => {
            setQuestion(newQuestion);
            setIsDisabled(false);
        }

        const onScoreChange = (score: number) => {
            setScore(score);
        }

        quizObject.on('question', onNewQuestion)
        quizObject.on('score', onScoreChange)
        quizObject.generateQuestion();
        return () => {
            quizObject.removeListener('question', onNewQuestion)
            quizObject.removeListener('score', onScoreChange)
        }

    }, [quizObject]);

    const handleAnswerClick = useCallback((answerId: string) => {
        const isCorrect: boolean = quizObject.submitAnswer(answerId);
        setIsDisabled(true);
        if (isCorrect) {
            speak({ text: `Correct!` });
        } else {
            speak({ text: `Wrong!` });
        }
        setTimeout(() => {
            quizObject.generateQuestion();
        }, 1000);
    }, [quizObject, speak])

    return <div className={styles.question_container}>

        <Score score={score} onClick={(score: string) => {
            speak({ text: score });
        }} />

        <h1 onClick={() => {
            speak({ text: question });
        }}>
            {question}
        </h1>
        <AnswerList disabled={isDisabled} answers={answers.map(({ correct, ...answer }) => answer)} onAnswerClick={handleAnswerClick} />

    </div>;
}