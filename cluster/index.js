import express from "express";
import { loop } from "./loop.js";

const app = express();

app.get("/", loop);

app.listen(4000, () => console.log("Server running on port 4000"));
