import { useState } from "react"
import ReactCardFlip from "react-card-flip"
import "./index.css"
import axios from "axios"
import { BACKEND_URL } from "../../config"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"



export const CreateCard = ()=>{
    const [isFlipped,setIsFlipped] = useState(false)
    function flipCard(){
        setIsFlipped(!isFlipped)
    }
    const navigate = useNavigate()

    const [question,setQuestion] = useState("");
    const [answer,setAnswer] = useState("");

    async function createCard(){
        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/card`,{question,answer},{
                headers:{
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                }
            })
            const cardId = response.data.id;
            navigate('/cards')
        } catch(e){
            //alert user 
            toast.error("Oops ! Something went wrong")
        }
    }

    return (
        <div className="flex w-full h-screen justify-center items-center flex-col">
            <ReactCardFlip flipDirection="vertical" isFlipped = {isFlipped}>
                <div className="card flex justify-center items-center flex-col gap-10">
                    <h1 className="text-3xl">Question</h1>
                    <input type="text" placeholder="Enter question" className="text-black border-2 py-2 px-4 rounded-lg border-white bg-slate-200" onChange={(e)=>{
                        setQuestion(e.target.value)
                    }}/>
                    <button onClick={flipCard} className="border border-white px-10 py-2 rounded-lg bg-red-700 text-xl font-semibold">Flip</button>
                </div>
                <div className="card card-back flex justify-center items-center flex-col gap-10">
                    <h1 className="text-3xl">Answer</h1>
                    <input type="text" placeholder="Enter answer" className="text-black border-2 py-2 px-4 rounded-lg border-white bg-slate-200" onChange={(e)=>{
                        setAnswer(e.target.value)
                    }}/>
                    <button onClick={flipCard} className="border border-white px-10 py-2 rounded-lg bg-red-700 text-xl font-semibold">Flip</button>
                </div>
            </ReactCardFlip>
            <div className="mt-7">
                <button className="px-10 py-2 rounded-lg bg-blue-600 border-2 border-blue-950 text-lg text-white" onClick={createCard}>Create</button>
            </div>
        </div>
    )
}