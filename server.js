const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const PORT = process.env.PORT || 8080;

const videoRouter = require("./routes/videos");

app.use("/api", videoRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
