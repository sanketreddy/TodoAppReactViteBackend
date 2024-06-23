const mongoose = require("mongoose");
require("dotenv").config();

const mongoConnectUrl = process.env.MONGO_URI;

async function main() {
  await mongoose.connect(mongoConnectUrl);
}

main().catch((err) => console.log(err));

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const todo = mongoose.model("Todo", todoSchema);

module.exports = {
  todo,
};
