import { Fragment } from "react"
import styles from './answerList.module.scss'

type AnswerListProps = {
    answers: string[];
    disabled?: boolean;
    onAnswerClick: (answer: number) => void;
}

export function AnswerList({ answers, disabled = false, onAnswerClick }: AnswerListProps) {
    const handleAnswerClick = (answer: number) => {
        if (!disabled) {
            onAnswerClick(answer)
        }
    }
    return <Fragment>
        <ul className={`${styles.answer_list} ${disabled && styles.answer_list__disabled}`}>
            {answers.map((answer, index) => <li key={index} className={styles.answer_item} onClick={() => { handleAnswerClick(index) }}>{answer}</li>)}
        </ul>
    </Fragment>
}