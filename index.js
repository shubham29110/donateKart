const express = require("express");
const bodyParser = require("body-parser");
const user = require("./routes/user");


const app = express();

// PORT
const PORT = process.env.PORT || 4000;

// Middleware
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ message: "API Working" });
});

app.use("/", user);


app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});
