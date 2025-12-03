import express from "express";
import dotenv from "dotenv";
import { db_connect } from "./config/db.js";
import { configModel } from "./model/Configuration.model.js";
import cors from "cors";
dotenv.config();

db_connect();

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT"],
  })
);

//get all data

app.get("/api/configurations/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await configModel.findOne({ configurationId: id });

    console.log(response);

    return res.json({ success: false, response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

app.put("/api/configurations/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { remark } = req.body;

    if (!remark || typeof remark !== "string") {
      return res.status(400).json({ error: "Valid remark, field is required" });
    }

    const config = await configModel.findOneAndUpdate(
      { configurationId: id },
      { remark },
      { new: true }
    );

    if (!config) {
      return res.status(404).json({ error: "configration not found" });
    }

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// app.post("/seed", async (req, res) => {
//   const response = await configModel.create({
//     configurationId: "qwertyuiop",
//     data: [
//       ["bank1", "bank2", "bank3"],
//       ["bank4", "bank5", "bank6"],
//       ["bank7", "bank8", "bank9"],
//     ],
//   });
//   console.log(response);

//   res.send("Seeded");
// });

app.get("/", (req, res) => {
  res.send("api is running......");
});
app.listen(8080, () => {
  console.log("Port:- 8080");
});
