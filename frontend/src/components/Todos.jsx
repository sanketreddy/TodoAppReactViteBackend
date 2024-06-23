/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
function Todos({ todos }) {
  async function markTodoAsDone(e, id) {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/completed", {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          id: id,
        }),
      });

      // console.log(response);

      if (!response.ok) {
        throw new Error("Failed to mark todo as completed");
      }
    } catch (e) {
      console.error("Unable to mark todo as completed");
    }
  }

  return (
    <div>
      {todos.map((todo) => {
        return (
          <div key={todo._id}>
            <h1>{todo.title}</h1>
            <h2>{todo.description}</h2>
            <button type="submit" onClick={(e) => markTodoAsDone(e, todo._id)}>
              {todo.completed === true ? "Completed" : "Mark as Complete"}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Todos;
