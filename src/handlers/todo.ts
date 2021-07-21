import  express ,{Request,Response} from "express";
import { Todo,TodoListStore } from "../models/todo";

const store = new TodoListStore();

const index= async (req:Request,res:Response)=>{
    try {
        const todolist = await store.index();
        // console.log(`✅ getting all items ${JSON.stringify(todolist)}`)
        res.json(todolist) 
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const show = async (req: Request, res: Response) => {
    try {
        const todo = await store.show(parseInt(req.params.id))
        // console.log(`✅ getting item ${JSON.stringify(todo)}`)
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
        // console.log(`✅ creating item ${JSON.stringify(newTodo)}`)
        res.json(newTodo)
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const edit = async (req: express.Request, res: express.Response) => {
    try {
        const todo: Todo = {
            task: req.body.task,
            description: req.body.description,
            is_done: req.body.is_done
        };

        const updatedTodo = await store.update(parseInt(req.params.id), todo);
        // console.log(`✅ updating item ${JSON.stringify(updatedTodo)}`)
        res.send(updatedTodo);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const destroy = async (req: Request, res: Response) => {
    try {
        const deleted = await store.delete(parseInt(req.params.id))
        // console.log(`✅ deleting item ${JSON.stringify(deleted)}`)
        res.json(deleted)
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const todolist_routes = (app:express.Application):void=>{
    app.get('/todolists',index);
    app.get('/todolists/:id',show);
    app.post('/todolists',create);
    app.put("/todolists/:id", edit);
    app.delete('/todolists/:id', destroy);
}

export default todolist_routes