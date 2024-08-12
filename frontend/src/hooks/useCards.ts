import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

interface Card {
    "question" : string;
    "answer" : string;
    "id" : string;
}

export const useCards = () => {
    const [loading,setLoading] = useState(true);
    const [card,setCards] = useState<Card[]>([]);

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/card/bulk`,{
            headers : {
                Authorization :`Bearer ${localStorage.getItem("token")}` 
            }
        })
        .then(response => {
            setCards(response.data.cards)
            setLoading(false);
        })
    },[])

    return {
        loading,
        card
    }
}
