import { QuestionModel } from "../../models/question.model";

import { useCallback, useEffect, useState } from "react";
import styles from './question.module.scss';
import { AnswerList } from "./components/AnswerList/AnswerList.component";
import { generateQuestion } from "../../services/generateQuestion";
import { useSpeech } from "../../context/Speech";
import { Score } from "./components/Score/Score.component";

type RecordType = { right: number, wrong: number }

export function QuestionView() {
    const [{ question, answers }, setQuestion] = useState<QuestionModel>(generateQuestion());
    const [record, setRecord] = useState<RecordType>({ right: 0, wrong: 0 });
    const [isDisabled, setIsDisabled] = useState(false);
    const speak = useSpeech();
    useEffect(() => {
        setQuestion(generateQuestion());
    }, [])

    // make new question and enable selection button
    const handleNewQuestion = () => {
        setQuestion(generateQuestion());
        setIsDisabled(false);
    }

    const handleAnswerClick = useCallback((answerId: number) => {
        const answer = answers[answerId];
        setIsDisabled(true);
        if (answer.correct) {
            speak({ text: `Correct!` });
            setRecord(prevRecord => ({ ...prevRecord, right: prevRecord.right + 1 }));
        } else {
            speak({ text: `Wrong!` });
            setRecord(prevRecord => ({ ...prevRecord, wrong: prevRecord.wrong + 1 }));
        }
        setTimeout(handleNewQuestion, 1000);
    }, [answers, speak])

    return <div className={styles.question_container}>

        <Score score={record.right - record.wrong} />

        <h1 onClick={() => {
            speak({ text: question });
        }}>
            {question}
        </h1>
        <AnswerList disabled={isDisabled} answers={answers.map(({ answer }) => answer)} onAnswerClick={handleAnswerClick} />

    </div>;
}