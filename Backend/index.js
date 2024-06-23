const express = require("express");
const cors = require("cors");
const app = express();
const { createTodo, updateTodo } = require("./types");
const { todo } = require("./schema");

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

const port = 3000;

app.post("/todo", async (req, res, next) => {
  const validTodo = createTodo.safeParse(req.body);

  if (!validTodo.success) {
    res.status(411).json({
      msg: "Please send valid inputs",
    });
    return;
  }

  try {
    const uploadTodo = await todo.create({
      title: req.body.title,
      description: req.body.description,
    });

    // console.log(updateTodo, "update to log part");

    if (uploadTodo) {
      res.status(200).json({
        msg: "added todo",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({
      msg: "Database is down please try after sometime",
    });
  }
});

app.get("/todo", async (req, res, next) => {
  try {
    const getAllTodos = await todo.find({});
    res.status(200).send(getAllTodos);
  } catch (err) {
    console.error(err);
    res.status(400).json({
      msg: "Could not get the data",
    });
  }
});

app.put("/completed", async (req, res, next) => {
  const validUpdateTodo = updateTodo.safeParse(req.body);

  if (!validUpdateTodo.success) {
    res.status(411).json({
      msg: "Please send valid inputs",
    });
    return;
  }

  try {
    await todo.findOneAndUpdate(
      {
        _id: req.body.id,
      },
      {
        completed: true,
      }
    );
    res.json({
      msg: "Todo marked as completed",
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      msg: "Could not get the data",
    });
  }
});

app.listen(port, () => {
  console.log(`App is listening on ${port}`);
});
