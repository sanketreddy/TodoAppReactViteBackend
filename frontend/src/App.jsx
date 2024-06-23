import { useEffect, useState } from "react";
import "./App.css";
import CreateTodo from "./components/CreateTodo";
import Todos from "./components/Todos";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function getTodo() {
      const result = await fetch("http://localhost:3000/todo");
      const actualTodo = await result.json();
      setTodos(actualTodo);
    }

    getTodo();
  }, []);

  return (
    <div>
      <h1>Add Your Todos here: </h1>
      <CreateTodo />
      <Todos todos={todos} />
    </div>
  );
}

export default App;
