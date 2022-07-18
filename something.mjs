import express from "express";
import cors from "cors";
import { Scrapper } from "./vtop.mjs";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  // res.send("Hello World!");
});

app.post("/api/login", async (req, res) => {
  // res.status(200).send("Login API").end();
  const scrapper = await new Scrapper();
  await scrapper.initiate();
  let data = await scrapper.startInstance();
  res.status(200).json(data).end();
});

app.listen(1337, () => {
  console.log("listening on port 1337");
});
