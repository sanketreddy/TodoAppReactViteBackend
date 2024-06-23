import { useState } from "react";

function CreateTodo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  async function addTodoToDb(e) {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/todo", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          description: description,
        }),
      });

      // console.log(response);

      if (!response.ok) {
        throw new Error("Failed to create todo");
      }
    } catch (e) {
      console.error("Unable to post data");
    }
  }

  function getTodoTitle(e) {
    setTitle(e.target.value);
  }

  function getTodoDescription(e) {
    setDescription(e.target.value);
  }

  return (
    <div>
      <input
        style={{ padding: 10, margin: 10 }}
        type="text"
        value={title}
        placeholder="Enter your title"
        onChange={(e) => getTodoTitle(e)}
      />
      <br />

      <input
        style={{ padding: 10, margin: 10 }}
        type="text"
        value={description}
        placeholder="Enter your description"
        onChange={(e) => getTodoDescription(e)}
      />
      <br />

      <button
        type="submit"
        style={{ padding: 10, margin: 10 }}
        onClick={(e) => addTodoToDb(e)}
      >
        Create Todo
      </button>
    </div>
  );
}

export default CreateTodo;
