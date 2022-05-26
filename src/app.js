import cors from "cors";
import morgan from "morgan";
import express from "express";

import pkg from "../package.json";

import * as routes from "./routes/index.routes";

import { createRoles, createAdmin } from "./libs/initialSetup";

const app = express();

createRoles();
createAdmin();

// Settings
app.set("pkg", pkg);
app.set("port", process.env.PORT || 4000);

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Welcome Routes
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to my Products API",
    name: app.get("pkg").name,
    version: app.get("pkg").version,
    description: app.get("pkg").description,
    author: app.get("pkg").author,
  });
});

app.use("/api/v1/auth", routes.authRoutes);
app.use("/api/v1/users", routes.usersRoutes);
app.use("/api/v1/products", routes.productsRoutes);

export default app;
