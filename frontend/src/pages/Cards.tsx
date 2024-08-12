import { Link } from "react-router-dom";
import { FlipCard } from "../components/flipcardComponent/FlipCard";
import { useCards } from "../hooks/useCards";
import { Skeleton } from "../components/Skeleton";


export const Cards = ()=> {
    const {loading,card} = useCards();
    if(loading){
        return <div className="w-screen h-screen flex flex-col justify-center items-center">
            <div><Skeleton/></div>
            <div><Skeleton/></div>
            <div><Skeleton/></div>
        </div>
    }
    
    return (
       
        <div className="bg-slate-300">
            <div className=" py-5 px-4">
                <div className=" md:border-b-8 md:border-slate-500 pb-2 flex justify-center flex-col md:flex-row md:justify-between gap-6 md:gap-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-nowrap border-b-4 border-slate-600 pb-1 md:border-none">Take U Forward</h1>
                    <div className="flex justify-between items-center gap-4 border-b-2 border-slate-400 pb-1 md:border-none">
                        <button className="border-2 border-slate-500 text-white outline-none bg-blue-500 px-3 py-1 md:px-5 md:py-2 rounded-lg font-semibold">My Cards</button>
                        <button className="border-2 border-blue-500 text-blue-500 outline-none bg-white px-3 py-1 md:px-5 md:py-2 rounded-lg font-semibold"><Link to={"./create"}>Create Card</Link></button>
                    </div>
                </div>
                <div className="mt-5">
                    <h2 className="text-2xl font-semibold ">Some Learning Cards</h2>
                </div>

            </div>
            <div className="py-9">
                <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-5 md:grid-cols-2 sm:grid-cols-1">
                    {card.map(c=> <FlipCard question={c.question} answer={c.answer} id={c.id}/>)}
                </div>
            </div>
            
            
        </div>
    );
}