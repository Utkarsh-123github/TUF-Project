import { SignupInput } from "@utkarsh_tiwari/flashcard-common"
import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../config"
import { toast } from "react-toastify"

export const Auth = ({ type }:{type: "signup" | "signin"})=>{
    const navigate = useNavigate();
    const [userInputs,setuserInputs] = useState<SignupInput>({
        name : "",
        email : "",
        password : ""
    })

    async function sendRequest(){
        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,userInputs)
            const jwt = response.data;
            localStorage.setItem("token",jwt)
            navigate("/cards")

        } catch(e){
            // alert user here that request failed
            toast.error(`${type === "signin" ? "Authentication Failed !" : "Sign Up Failed"}`)
        }
    }

    return <div className="h-screen flex justify-center">
        <div className="flex justify-center flex-col">
            <div className="text-center mb-4">
                <h1 className="text-4xl font-bold">Create an account</h1>
                <h3 className="text-gray-600">{type === "signin" ? "Don't have an account ?" : "Already have an account ?"}<Link to={type === "signin" ? "/signup" : "/signin"} className="underline pl-1">{type === "signin" ? "Sign Up" : "Login"}</Link></h3>
            </div>
            {type === "signup" ? <div>
                <h4 className="text-lg font-semibold mb-2">Username</h4>
                <input type="text" placeholder="Enter your username" className="border rounded-md px-1 py-2 mb-2 w-full outline-none" onChange={(e)=>{
                    setuserInputs({
                        ...userInputs,
                        name: e.target.value
                    })
                }}/>
            </div> : null}
            
            <div>
                <h4 className="text-lg font-semibold mb-2">Email</h4>
                <input type="text" placeholder="Enter your email" className="border rounded-md px-1 py-2 mb-2 w-full outline-none" onChange={(e)=>{
                    setuserInputs({
                        ...userInputs,
                        email: e.target.value
                    })
                }}/>
            </div>
            <div>
                <h4 className="text-lg font-semibold mb-2">Password</h4>
                <input type="password" placeholder="Enter your password" className="border rounded-md px-1 py-2 mb-2 w-full outline-none" onChange={(e)=>{
                    setuserInputs({
                        ...userInputs,
                        password: e.target.value
                    })
                }}/>
            </div>
            <div>
                <button onClick={sendRequest} className="border rounded-md w-full text-center bg-black text-white py-2 mt-2">{type === "signup" ? "Sign Up" : "Sign In"}</button>
            </div>
        </div>
        

    </div>
}