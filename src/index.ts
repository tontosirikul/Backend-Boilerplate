import express from "express";
import cors from "cors";
import routes from "./routes/api";
const app = express();

const port = 3000;

app.use(cors());

app.use("/api", routes);

app.get("/", (req: express.Request, res: express.Response): void => {
  res.send("Home");
});

app.get("*", (req: express.Request, res: express.Response): void => {
  res.send("No route");
});

app.listen(port, (): void => {
  console.log(`server started at localhost:${port}`);
});

export default app;
