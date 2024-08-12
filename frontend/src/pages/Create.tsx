import { CreateCard } from "../components/createFlipcard/CreateCard"
import { LeftBar } from "../components/createFlipcard/LeftBar"

export const Create = ()=>{
    return (
        <div>
        <div className="w-full flex flex-col lg:flex-row ">
            <div className="w-full lg:w-1/2">
                <LeftBar/>
            </div>
            <div className="w-full lg:w-1/2">
                <CreateCard/>
            </div>
        </div>
    </div>
    )
}