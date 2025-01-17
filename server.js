import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";

//initialize or reset object
const app = express();

//middleware
dotenv.config();
app.use(express.json());

//get method
app.get("/", (req, res) => {
  res.status(200).send({
    message: "Success fully getting data",
  });
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`server is running at ${port}`);
});
