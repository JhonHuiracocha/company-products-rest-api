import express from "express";
import morgan from "morgan";
import productsRoute from "./routes/products.routes";

const app = express();

app.set("port", process.env.PORT);

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/products", productsRoute);

export default app;
