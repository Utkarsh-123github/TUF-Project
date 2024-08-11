import {z} from "zod"

export const signupInput = z.object({
    email : z.string().email(),
    password : z.string().min(5),
    name : z.string()
})

export const signinInput = z.object({
    email : z.string().email(),
    password : z.string().min(5),
})

export const createCardInput = z.object({
    question : z.string(),
    answer : z.string()
})

export const updateCardInput = z.object({
    question : z.string(),
    answer : z.string(),
    id : z.string()
})

export type SignupInput = z.infer<typeof signupInput>
export type SigninInput = z.infer<typeof signinInput>
export type CreateCardInput = z.infer<typeof createCardInput>
export type UpdateCardInput = z.infer<typeof updateCardInput>

