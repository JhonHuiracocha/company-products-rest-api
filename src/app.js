import cors from "cors";
import morgan from "morgan";
import express from "express";

import authRoutes from "./routes/auth.routes";
import usersRoutes from "./routes/users.routes";
import productsRoutes from "./routes/products.routes";

import { createRoles, createAdmin } from "./libs/initialSetup";

const app = express();

createRoles();
createAdmin();

app.set("port", process.env.PORT);

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/products", productsRoutes);

export default app;
