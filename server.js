require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./index");
const DB = process.env.DATABASE_URL;
mongoose.connect(DB).then(() => {
  console.log("Connect Database Successfuly🚀");
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}`);
});
