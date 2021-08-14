import supertest from "supertest";
import app from "../../index";
import { User } from "../../models/user";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const request = supertest(app);

describe("🏁 testing endpoint (User)", () => {
  const mockUser: User = {
    username: "TosBoy",
    password: "17",
  };
  const mockUser_2: User = {
    username: "TosGirl",
    password: "17",
  };
  const mockUser_3: User = {
    username: "TosKid",
    password: "17",
  };
  let token: string;
  it("should create mockUser", async () => {
    const response = await request.post("/users").send(mockUser_2).expect(200);
    token = response.body.userwithtoken;
    const granted = jwt.verify(
      token,
      process.env.TOKEN_SECRET as jwt.Secret
    ) as JwtPayload;
    expect(granted.user.username).toEqual("TosGirl");
  });
  it("should get all user", async () => {
    const response = await request.get("/users").expect(200);
    expect(response.body.length).toEqual(2);
  });
  it("should acknowledge mockUser", async () => {
    const response = await request
      .post("/users/auth")
      .send(mockUser)
      .expect(200);
    token = response.body.userwithtoken;
    const granted = jwt.verify(
      token,
      process.env.TOKEN_SECRET as jwt.Secret
    ) as JwtPayload;
    expect(granted.user.username).toEqual("TosBoy");
  });
  it("should not acknowledge mockUser_3", async () => {
    const response = await request.post("/users/auth").send(mockUser_3);
    expect(response.status).toBe(401);
  });
  it("should get mockUser_2 with id 3 and username", async () => {
    const response = await request.get("/users/2");
    expect(response.body.id).toEqual(2);
    expect(response.body.username).toEqual("TosBoy");
  });
  it("should edit mockUser_2 to be mockUser_3", async () => {
    const response = await request
      .put("/users/2")
      .send(mockUser_3)
      .set("Authorization", "bearer " + token);
    expect(response.body.id).toEqual(2);
    expect(response.body.username).toEqual("TosKid");
  });
  it("should delete mockUser_2", async () => {
    const response = await request
      .delete("/users/2")
      .set("Authorization", "bearer " + token);
    expect(response.body.id).toEqual(2);
    expect(response.body.username).toEqual("TosKid");
  });
  afterAll(async () => {
    await request
      .delete("/users/2")
      .send(mockUser)
      .set("Authorization", "bearer " + token);
  });
});
