import  express ,{Request,Response} from "express";
import cors from "cors";
import routes from "./routes/api";
import todolist_routes from "./handlers/todo";
const app = express();

const port = 3000;

app.use(express.json());
app.use(cors());

app.use("/api", routes);

app.get("/", (req: Request, res: Response): void => {
  res.send("Home");
});
todolist_routes(app);
app.get("*", (req: Request, res: Response): void => {
  res.send("No route");
});

app.listen(port, (): void => {
  console.log(`server started at localhost:${port}`);
});



export default app;
