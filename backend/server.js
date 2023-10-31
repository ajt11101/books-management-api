const express = require("express");
const { createServer } = require("http");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const bookRoutes = require("./routes/bookRoutes");
const cors = require("cors");
dotenv.config();
connectDB();
const PORT=process.env.PORT;
const app = express();
app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/book", bookRoutes);

app.listen(PORT, console.log("Server listening on port 5000"));
