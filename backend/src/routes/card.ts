import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { createCardInput, signupInput } from "@utkarsh_tiwari/flashcard-common";
import { Hono } from "hono";
import { verify } from "hono/jwt";


export const cardRouter = new Hono<{
    Bindings:{
        DATABASE_URL : string;
        JWT_SECRET : string;
    },
    Variables : {
        userId : string;
    }
}>();

cardRouter.use('/*',async (c,next)=>{
    // extract the user id and pass it down to the route handler
    const authHeader = c.req.header("authorization")||""
    const token = authHeader?.split(' ')[1];
    try{
        const user =await verify(token,c.env.JWT_SECRET);
        if(user){
            c.set("jwtPayload",user.id)
            await next();
        } 
        else{
            c.status(403);
            return c.json({
                message: "You are not logged in !!"
            })
        }
    } catch(e){
        c.status(403);
        return c.json({
            message: "You are not logged in !!"
        })
    }
    
})

// ---------- route to insert card content

cardRouter.post('/',async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const body = await c.req.json();
    const {success} = createCardInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({message :"Wrong inputs"})
    }
    const authorId = c.get('jwtPayload')
    const card = await prisma.card.create({
        data:{
            question:body.question,
            answer:body.answer,
            authorId: authorId
        }
    })
    return c.json({
        id: card.id
    })
})

// ----------- route to update card content

cardRouter.put('/',async (c)=>{
    const body = await c.req.json();
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const card = await prisma.card.update({
        where:{
            id: body.id
        },
        data : {
            question:body.question,
            answer : body.answer
        }
    })
    return c.json({
        id:card.id
    })
})

//------- Get all the cards

cardRouter.get('/bulk',async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const cards = await prisma.card.findMany();
    return c.json({
        cards
    })
})

//------------route to display the card of logged in user

cardRouter.get('/:id',async (c)=>{
    const id = c.req.param("id")
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate())

    try{
        const card = await prisma.card.findFirst({
            where : {
                id:id
            }
        })
        return c.json({
            card
        })
    }
    catch(e){
        c.status(411);
        return c.json({error : "Card with given id is not found !"})
    }
    
})




