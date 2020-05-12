import express from "express";
import { rootHandler } from "./handlers";

const app = express();
const port = process.env.PORT || "8080";

app.get("/", rootHandler);

app.listen(port, (err) => {
  if (err) return console.error(err);
  return console.log(`Server is listening on ${port}`);
});
