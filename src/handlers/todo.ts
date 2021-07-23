import express, { Request, Response } from "express";
import verifyAuthToken from "../middleware/verifyAuthToken";
import { Todo, TodoListStore } from "../models/todo";

const store = new TodoListStore();

const index = async (req: Request, res: Response) => {
  try {
    const todolist = await store.index();
    res.json(todolist);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const todo = await store.show(parseInt(req.params.id));
    res.json(todo);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const create = async (req: Request, res: Response) => {
  const todo: Todo = {
    task: req.body.task,
    description: req.body.description,
    is_done: false,
  };
  try {
    const newTodo = await store.create(todo);
    res.json(newTodo);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const update = async (req: express.Request, res: express.Response) => {
  try {
    const todo: Todo = {
      task: req.body.task,
      description: req.body.description,
      is_done: req.body.is_done,
    };

    const updatedTodo = await store.update(parseInt(req.params.id), todo);
    res.send(updatedTodo);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const deleted = await store.delete(parseInt(req.params.id));
    res.json(deleted);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const todolist_routes = (app: express.Application): void => {
  app.get("/todolists", index);
  app.get("/todolists/:id", show);
  app.post("/todolists", verifyAuthToken, create);
  app.put("/todolists/:id", verifyAuthToken, update);
  app.delete("/todolists/:id", verifyAuthToken, destroy);
};

export default todolist_routes;
