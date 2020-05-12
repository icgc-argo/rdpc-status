import express from "express";
import { rootHandler, celHandler } from "./handlers";

const app = express();
const port = process.env.PORT || "8080";

app.get("/", rootHandler);
app.get("/cel", celHandler);

app.listen(port, (err) => {
  if (err) return console.error(err);
  return console.log(`Server is listening on ${port}`);
});
