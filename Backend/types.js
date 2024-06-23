const zod = require("zod");

const createTodo = zod.object({
  title: zod.string().min(1, { message: "Title is required" }),
  description: zod.string().optional(),
});

const updateTodo = zod.object({
  id: zod.string().min(1, { message: "ID is required" }),
});

module.exports = {
  createTodo: createTodo,
  updateTodo: updateTodo,
};
