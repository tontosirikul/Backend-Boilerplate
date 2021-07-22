/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import client from "../database";

export type Todo = {
  id?: number;
  task: string;
  description: string;
  is_done: boolean;
};

export class TodoListStore {
  async index(): Promise<Todo[]> {
    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql = "SELECT * FROM todolist";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot get todolist ${error}`);
    }
  }
  async show(id: number): Promise<Todo> {
    try {
      const sql = "SELECT * FROM todolist WHERE id=($1)";
      // @ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find todo ${id}. Error: ${err}`);
    }
  }
  async create(b: Todo): Promise<Todo> {
    try {
      const sql =
        "INSERT INTO todolist (task, description, is_done) VALUES($1, $2, $3) RETURNING *";
      // @ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [b.task, b.description, b.is_done]);

      const todo = result.rows[0];

      conn.release();
      return todo;
    } catch (err) {
      throw new Error(`Could not add new todo ${b.task}. Error: ${err}`);
    }
  }

  async update(id: number, b: Todo): Promise<Todo> {
    try {
      const sql =
        "UPDATE todolist SET task = $1, description = $2 , is_done = $3 WHERE id=($4) RETURNING *";
      // @ts-ignore
      const conn = await client.connect();
      const result = await conn.query(sql, [
        b.task,
        b.description,
        b.is_done,
        id,
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not update todo ${b.task}. Error: ${err}`);
    }
  }

  async delete(id: number): Promise<Todo> {
    try {
      const sql = "DELETE FROM todolist WHERE id=($1) RETURNING *";
      // @ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      // const todo = result.command.concat(" "+result.rowCount+" rows");
      conn.release();
      const todo = result.rows[0];

      return todo;
    } catch (err) {
      throw new Error(`Could not delete todo ${id}. Error: ${err}`);
    }
  }
}
