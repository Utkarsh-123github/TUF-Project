import { Auth } from "../components/Auth"
import { Tuf } from "../components/Tuf"

export const Signin = ()=>{
    return <div>
        <div className="w-full flex flex-col-reverse lg:flex-row ">
            <div className="w-full lg:w-1/2">
                <Auth type="signin"/>
            </div>
            <div className="w-full lg:w-1/2">
                <Tuf/>
            </div>
        </div>
    </div>
}