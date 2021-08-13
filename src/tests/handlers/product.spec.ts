import supertest from "supertest";
import app from "../../index";
import { Product } from "../../models/product";
const request = supertest(app);

describe("🏁 testing endpoint (Products)", () => {
  const milk: Product = {
    name: "milk",
    price: 20,
  };

  const expensive_milk: Product = {
    name: "milk",
    price: 30,
  };
  let token: string;
  beforeAll(async () => {
    const response = await request.post("/users").send({
      username: "TosBoy",
      password: "17",
    });
    token = response.body.userwithtoken;
  });
  it("should create milk product", async () => {
    const response = await request
      .post("/products")
      .send(milk)
      .set("Authorization", "bearer " + token)
      .expect(200);
    expect(response.body.name).toEqual("milk");
  });

  it("should get all products", async () => {
    const response = await request.get("/products").expect(200);
    expect(response.body[0]).toEqual({
      id: 1,
      name: "milk",
      price: 20,
    });
  });

  it("should get milk product with id 1", async () => {
    const response = await request.get("/products/1").expect(200);
    expect(response.body.id).toEqual(1);
    expect(response.body.name).toEqual("milk");
  });

  it("should update milk to be expensive milk", async () => {
    const response = await request
      .put("/products/1")
      .send(expensive_milk)
      .set("Authorization", "bearer " + token)
      .expect(200);
    expect(response.body.id).toEqual(1);
    expect(response.body.price).toEqual(30);
  });

  it("should delete task workout with id 1", async () => {
    const response = await request
      .delete("/products/1")
      .set("Authorization", "bearer " + token)
      .expect(200);
    expect(response.body.id).toEqual(1);
    expect(response.body.name).toEqual("milk");
  });
  afterAll(async () => {
    await request
      .delete("/users/1")
      .send({
        username: "TosBoy",
        password: "17",
      })
      .set("Authorization", "bearer " + token);
  });
});
