import supertest from "supertest";
import app from "../index";

const request = supertest(app);

describe("Endpoint responses testing (Home)", () => {
  it("home endpoint should be fine", async () => {
    const response = await request.get("/");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Home");
  });
  it("the api of no route should be told", async () => {
    const response = await request.get("/test");
    expect(response.status).toBe(200);
    expect(response.text).toBe("No route");
  });
});
