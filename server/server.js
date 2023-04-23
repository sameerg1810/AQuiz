import express from "express";
import cors from "cors";
import { config } from "dotenv";
import router from "./router/route.js";
import connect from "./database/conn.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("", router);
config();

// middlewares
// Define your database connection function here, e.g. mongoose.connect() or sequelize.authenticate()

const port = process.env.PORT || 4000;

connect()
  .then(() => {
    try {
      app.listen(port, () => {
        console.log(`listening to the port ${port}`);
      });
    } catch (err) {
      console.log("cannot connect with the server", err);
    }
  })
  .catch((err) => {
    console.log("failed to connect with the database", err);
  });
