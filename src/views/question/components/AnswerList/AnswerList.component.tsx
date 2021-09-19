import { Fragment } from "react"
import styles from './answerList.module.scss'

type AnswerListProps = {
    answers: { id: string, answer: string }[];
    disabled?: boolean;
    onAnswerClick: (answer: string) => void;
}

export function AnswerList({ answers, disabled = false, onAnswerClick }: AnswerListProps) {
    const handleAnswerClick = (answer: string) => {
        if (!disabled) {
            onAnswerClick(answer)
        }
    }
    return <Fragment>
        <ul className={`${styles.answer_list} ${disabled && styles.answer_list__disabled}`}>
            {answers.map(({id,answer}, index) => <li key={index} className={styles.answer_item} onClick={() => { handleAnswerClick(id) }}>{answer}</li>)}
        </ul>
    </Fragment>
}