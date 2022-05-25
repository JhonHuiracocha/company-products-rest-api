import "dotenv/config";
import "./database";
import express from "express";

const app = express();

app.set("port", process.env.PORT);

export default app;
