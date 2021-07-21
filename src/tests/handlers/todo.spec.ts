import supertest from "supertest";
import app from "../../index";
import { Todo } from "../../models/todo";

const request = supertest(app);

describe("🏁 testing todolists endpoint (Todolists)", () => {
  const workout: Todo = {
    task: "workout",
    description: "for 45 mins",
    is_done: false,
  };

  const workout_done: Todo = {
    task: "workout",
    description: "for 45 mins",
    is_done: true,
  };

  it("should create workout task", async () => {
    const response = await request.post("/todolists").send(workout).expect(200);
    expect(response.body.task).toEqual("workout");
  });

  it("should get all tasks", async () => {
    const response = await request.get("/todolists").expect(200);
    expect(response.body[0]).toEqual({
      id: 1,
      task: "workout",
      description: "for 45 mins",
      is_done: false,
    });
  });

  it("should get task workout with id 1", async () => {
    const response = await request.get("/todolists/1").expect(200);
    expect(response.body.id).toEqual(1);
    expect(response.body.task).toEqual("workout");
  });

  it("should update task workout to be done", async () => {
    const response = await request
      .put("/todolists/1")
      .send(workout_done)
      .expect(200);
    expect(response.body.id).toEqual(1);
    expect(response.body.is_done).toEqual(true);
  });

  it("should delete task workout with id 1", async () => {
    const response = await request.delete("/todolists/1").expect(200);
    expect(response.body.id).toEqual(1);
    expect(response.body.task).toEqual("workout");
  });
});
