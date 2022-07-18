import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  let data;
  try {
    data = await fetch("https://vtopcc.vit.ac.in/vtop/vtopLogin", {
      method: "POST",
      Host: "vtopcc.vit.ac.in",
      Origin: "https://vtopcc.vit.ac.in",
      Referer: "https://vtopcc.vit.ac.in/vtop/initialProcess",
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-origin",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36",
    });
  } catch (error) {
    data = error;
  }
  console.log("TYPE OF DATA : ", typeof data);
  console.log(data);

  // data = String(data);
  res.status(200).send(data).end();
});

app.listen(1337, () => {
  console.log("running on port 1337");
});
