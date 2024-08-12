import ReactCardFlip from "react-card-flip"
import "./index.css"
import { useState } from "react"

interface Card {
    "question" : string;
    "answer" : string;
    "id" : string;
}
export const FlipCard = ({
    question,
    answer,
    id
}:Card)=>{
    const [isFlipped,setIsFlipped] = useState(false)
    function flipCard(){
        setIsFlipped(!isFlipped)
    }

    return (
        <div className="flex w-full h-full justify-center items-center">
            <ReactCardFlip flipDirection="vertical" isFlipped = {isFlipped}>
                <div className="card flex justify-center items-center px-4" onClick={flipCard}>
                    <h1 className="text-2xl">{question}</h1>
                </div>
                <div className="card card-back flex justify-center items-center text-xl px-4" onClick={flipCard}>
                    <p className="text-wrap w-fit">{answer}</p>
                </div>
            </ReactCardFlip>
        </div>
    )
}