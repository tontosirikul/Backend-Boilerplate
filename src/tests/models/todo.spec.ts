import { TodoListStore } from "../../models/todo";

const store = new TodoListStore();

describe("Todo Model", () => {
  it("should have an index method", () => {
    expect(store.index).toBeDefined();
  });

  it("should have a show method", () => {
    expect(store.index).toBeDefined();
  });

  it("should have a create method", () => {
    expect(store.index).toBeDefined();
  });

  it("should have a update method", () => {
    expect(store.index).toBeDefined();
  });

  it("should have a delete method", () => {
    expect(store.index).toBeDefined();
  });

  it("create method should add a todo", async () => {
    const result = await store.create({
      task: "Workout",
      description: "Workout for 45 mins",
      is_done: false,
    });
    expect(result).toEqual({
      id: 1,
      task: "Workout",
      description: "Workout for 45 mins",
      is_done: false,
    });
  });

  it("index method should return a list of todos", async () => {
    const result = await store.index();
    expect(result).toEqual([
      {
        id: 1,
        task: "Workout",
        description: "Workout for 45 mins",
        is_done: false,
      },
    ]);
  });

  it("show method should return the correct todo", async () => {
    const result = await store.show(1);
    expect(result).toEqual({
      id: 1,
      task: "Workout",
      description: "Workout for 45 mins",
      is_done: false,
    });
  });

  it("delete method should remove the todo", async () => {
    store.delete(1);
    const result = await store.index();

    expect(result).toEqual([]);
  });
});
