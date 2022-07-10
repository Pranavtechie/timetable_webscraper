import express from "express";
import cors from "cors";
import { Scrapper } from "./vtop.mjs";

const app = express();
const scrapper = await new Scrapper();
await scrapper.initiate();

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  res.send("Hello World!");
  let data = await scrapper.startInstance();
  console.log(data);
});

app.post("/api/login", (req, res) => {
  res.status(200).send("Login API").end();
});

app.listen(1337, () => {
  console.log("listening on port 1337");
});
