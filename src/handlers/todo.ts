import  express ,{Request,Response} from "express";
import { Todo,TodoListStore } from "../models/todo";

const store = new TodoListStore();

const index= async (req:Request,res:Response)=>{
    try {
        const todolist = await store.index();
        console.log(`✅ getting all items ${JSON.stringify(todolist)}`)
        res.json(todolist) 
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const show = async (req: Request, res: Response) => {
    try {
        const todo = await store.show(parseInt(req.params.id))
        console.log(`✅ getting item ${JSON.stringify(todo)}`)
        res.json(todo)
    } catch (error) {
        res.status(400).send(error.message);
    }
 }

const create = async (req: Request, res: Response) => {
    try {
        const todo: Todo = {
            task: req.body.task,
            description: req.body.description,
            is_done: false
        };
        const newTodo = await store.create(todo)
        console.log(`✅ creating item ${JSON.stringify(newTodo)}`)
        res.json(newTodo)
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const destroy = async (req: Request, res: Response) => {
    try {
        const deleted = await store.delete(parseInt(req.body.id))
        console.log(`✅ deleting item`)
        res.json(deleted)
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const todolist_routes = (app:express.Application):void=>{
    app.get('/todolists',index);
    app.get('/todolists/:id',show);
    app.post('/todolists',create);
    app.delete('/todolists', destroy)
}

export default todolist_routes