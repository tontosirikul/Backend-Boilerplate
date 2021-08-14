import express, { Request, Response } from "express";
import verifyAuthToken from "../middleware/verifyAuthToken";
import { Order, OrderStore } from "../models/order";

const store = new OrderStore();

const index = async (req: Request, res: Response) => {
  try {
    const Orders = await store.index();
    res.json(Orders);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const Orders = await store.show(parseInt(req.params.id));
    res.json(Orders);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const create = async (req: Request, res: Response) => {
  const Order: Order = {
    status: req.body.status,
    user_id: parseInt(req.body.user_id),
  };
  try {
    const newOrder = await store.create(Order);
    res.json(newOrder);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const update = async (req: express.Request, res: express.Response) => {
  try {
    const Order: Order = {
      status: req.body.status,
      user_id: parseInt(req.body.user_id),
    };

    const updatedOrder = await store.update(parseInt(req.params.id), Order);
    res.send(updatedOrder);
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

const addProduct = async (req: Request, res: Response) => {
  const orderId: string = req.params.id;
  const productId: string = req.body.productId;
  const quantity: number = parseInt(req.body.quantity);

  try {
    const addedProduct = await store.addProduct(quantity, orderId, productId);
    res.json(addedProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const orders_routes = (app: express.Application): void => {
  app.get("/orders", index);
  app.get("/orders/:id", show);
  app.post("/orders", verifyAuthToken, create);
  app.put("/orders/:id", verifyAuthToken, update);
  app.delete("/orders/:id", verifyAuthToken, destroy);
  app.post("/orders/:id/products", addProduct);
};

export default orders_routes;
