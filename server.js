import express from "express";
import morgan from "morgan";

//initialize or reset object
const app = express();
const port = process.env.PORT;

//middleware
app.use(express.json());

//get method
app.get("/", (req, res) => {
  res.status(200).send({
    message: "Success fully getting data",
  });
});

app.listen(port, () => {
  console.log(`server is running at ${port}`);
});
