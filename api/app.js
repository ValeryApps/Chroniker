const express = require("express");
require("dotenv").config();
const { readdirSync } = require("fs");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const fileUpload = require("express-fileupload");
const app = express();
app.use(express.json());
app.use(cors()); 
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

readdirSync("./routes").map((r) => app.use("/", require("./routes/" + r)));
app.get("/", (req, res) => {
  res.send({ data: "Welcome to our new facebook clone" });
});
mongoose
  .connect(process.env.URI)
  .then(() => console.log("Successfully connected to database"))
  .catch((err) => console.log("Connection failed:", err.message));

const port = process.env.PORT;
app.listen(port, () => console.log("Server is running on port: ", port));
