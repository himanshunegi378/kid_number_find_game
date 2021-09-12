import { useSpeech } from "../../../../context/Speech"

export function Score({ score }: { score: number }) {
    const speak = useSpeech()
    return <div style={{
        "fontSize": `xx-large`,
        "fontWeight": 500
    }}>
        Score : <i onClick={() => {
            speak({ text: score.toString() })
        }} >{score}</i>
    </div>
}