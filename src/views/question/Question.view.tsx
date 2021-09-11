import { QuestionModel } from "../../models/question.model";
//@ts-ignore
import { useSpeechSynthesis } from 'react-speech-kit';
import { useCallback, useEffect, useState } from "react";
import styles from './question.module.scss';
import { AnswerList } from "./components/AnswerList/AnswerList.component";
import { generateQuestion } from "../../services/generateQuestion";

type RecordType = { right: number, wrong: number }

export function QuestionView() {
    const [{ question, answers }, setQuestion] = useState<QuestionModel>(generateQuestion());
    const [record, setRecord] = useState<RecordType>({ right: 0, wrong: 0 });
    const [isDisabled, setIsDisabled] = useState(false);
    const { speak, cancel, speaking, supported } = useSpeechSynthesis();
    useEffect(() => {
        setQuestion(generateQuestion());
    }, [])

    // make new question and enable selection button
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
            setRecord(prevRecord => ({ ...prevRecord, right: prevRecord.right + 1 }));
        } else {
            handleSpeak(`Wrong!`);
            setRecord(prevRecord => ({ ...prevRecord, wrong: prevRecord.wrong + 1 }));
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