/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import client from "../database";

export type Order_product_list = {
  id?: number;
  status: string;
  user_id: number;
};

export class Order_product_listStore {
  async index(): Promise<Order_product_list[]> {
    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql = "SELECT * FROM order_product_lists";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot get Order_product_list ${error}`);
    }
  }
  async show(id: number): Promise<Order_product_list> {
    try {
      const sql = "SELECT * FROM Order_product_lists WHERE id=($1)";
      // @ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find Order_product_list ${id}. Error: ${err}`);
    }
  }
  async create(b: Order_product_list): Promise<Order_product_list> {
    try {
      const sql =
        "INSERT INTO Order_product_list (status, user_id) VALUES($1, $2) RETURNING *";
      // @ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [b.status, b.user_id]);

      const Order_product_list = result.rows[0];

      conn.release();
      return Order_product_list;
    } catch (err) {
      throw new Error(
        `Could not add new Order_product_list ${b.id}. Error: ${err}`
      );
    }
  }

  async update(id: number, b: Order_product_list): Promise<Order_product_list> {
    try {
      const sql =
        "UPDATE Order_product_list SET status = $1, user_id = $2 WHERE id=($3) RETURNING *";
      // @ts-ignore
      const conn = await client.connect();
      const result = await conn.query(sql, [b.status, b.user_id, id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not update todo ${b.id}. Error: ${err}`);
    }
  }

  async delete(id: number): Promise<Order_product_list> {
    try {
      const sql = "DELETE FROM Order_product_lists WHERE id=($1) RETURNING *";
      // @ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      // const todo = result.command.concat(" "+result.rowCount+" rows");
      conn.release();
      const todo = result.rows[0];

      return todo;
    } catch (err) {
      throw new Error(
        `Could not delete Order_product_list ${id}. Error: ${err}`
      );
    }
  }
}
