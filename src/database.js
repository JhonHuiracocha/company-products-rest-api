import mongoose from "mongoose";

const start = async () => {
  await mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((res) => {
      console.log("Connected to Products API Database - Initial Connection");
    })
    .catch((err) => {
      console.log(
        "Initial Products API Database connection error occured",
        err
      );
    });
};

start();
