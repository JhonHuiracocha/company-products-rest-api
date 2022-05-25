import cors from "cors";
import morgan from "morgan";
import express from "express";
import usersRoutes from "./routes/users.routes";
import productsRoutes from "./routes/products.routes";

const app = express();

app.set("port", process.env.PORT);

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/products", productsRoutes);

export default app;
