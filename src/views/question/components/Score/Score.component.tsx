export function Score({ score, onClick = () => { } }: { score: number, onClick?: (text: string) => void }) {
    return <div style={{
        "fontSize": `xx-large`,
        "fontWeight": 500
    }}
        onClick={() => {
            onClick(score.toString());
        }}
    >
        Score : <i>{score}</i>
    </div>
}